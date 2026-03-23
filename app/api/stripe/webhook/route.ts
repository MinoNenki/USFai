import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getPlanByStripePriceId, PLANS, type PlanKey } from '@/lib/plans';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export const runtime = 'nodejs';

async function saveBillingEvent(
  userId: string | null,
  stripeEventId: string,
  eventType: string,
  payload: unknown
) {
  await supabaseAdmin.from('billing_events').upsert(
    {
      user_id: userId,
      stripe_event_id: stripeEventId,
      event_type: eventType,
      payload,
    },
    { onConflict: 'stripe_event_id' }
  );
}

async function syncProfileFromPlan(params: {
  userId: string;
  planKey: PlanKey;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}) {
  const plan = PLANS[params.planKey];

  await supabaseAdmin
    .from('profiles')
    .update({
      plan_key: params.planKey,
      stripe_customer_id: params.stripeCustomerId ?? undefined,
      stripe_subscription_id: params.stripeSubscriptionId ?? undefined,
      credits_balance: plan.monthlyCredits,
      monthly_analysis_limit: plan.monthlyAnalyses,
      analyses_used_this_month: 0,
    })
    .eq('id', params.userId);
}

async function findPlanKeyFromInvoice(invoice: Stripe.Invoice): Promise<PlanKey | null> {
  const invoiceAny = invoice as any;
  const firstLine = invoiceAny.lines?.data?.[0] ?? null;
  const priceId = firstLine?.pricing?.price_details?.price ?? firstLine?.price?.id ?? null;
  return getPlanByStripePriceId(priceId);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id ?? null;
    const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null;
    const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : null;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
    const priceId = lineItems.data[0]?.price?.id;
    const planKey = getPlanByStripePriceId(priceId);

    if (userId && planKey) {
      await syncProfileFromPlan({
        userId,
        planKey,
        stripeCustomerId,
        stripeSubscriptionId,
      });
    }

    await saveBillingEvent(userId, event.id, event.type, event);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    const invoiceAny = invoice as any;
    const subscriptionId =
      invoiceAny.parent?.subscription_details?.subscription ??
      (typeof invoiceAny.subscription === 'string' ? invoiceAny.subscription : null);

    const planKey = await findPlanKeyFromInvoice(invoice);

    if (subscriptionId && planKey) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id, stripe_customer_id')
        .eq('stripe_subscription_id', subscriptionId)
        .maybeSingle();

      if (profile?.id) {
        await syncProfileFromPlan({
          userId: profile.id,
          planKey,
          stripeCustomerId: profile.stripe_customer_id,
          stripeSubscriptionId: subscriptionId,
        });

        await saveBillingEvent(profile.id, event.id, event.type, event);
      }
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const priceId = subscription.items.data[0]?.price?.id ?? null;
    const planKey = getPlanByStripePriceId(priceId);

    if (planKey) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_subscription_id', subscription.id)
        .maybeSingle();

      if (profile?.id) {
        await syncProfileFromPlan({
          userId: profile.id,
          planKey,
          stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : null,
          stripeSubscriptionId: subscription.id,
        });

        await saveBillingEvent(profile.id, event.id, event.type, event);
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_subscription_id', subscription.id)
      .maybeSingle();

    if (profile?.id) {
      await supabaseAdmin
        .from('profiles')
        .update({
          plan_key: 'free',
          monthly_analysis_limit: 1,
          credits_balance: 1,
          analyses_used_this_month: 0,
          stripe_subscription_id: null,
        })
        .eq('id', profile.id);

      await saveBillingEvent(profile.id, event.id, event.type, event);
    }
  }

  return NextResponse.json({ received: true });
}
