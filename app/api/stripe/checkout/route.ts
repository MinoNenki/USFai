import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/lib/plans';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Brak autoryzacji.' }, { status: 401 });
  }

  const { planKey } = await req.json();
  const plan = PLANS[planKey as keyof typeof PLANS];
  if (!plan || !plan.stripePriceEnv) {
    return NextResponse.json({ error: 'Nieprawidłowy plan.' }, { status: 400 });
  }

  const priceId = process.env[plan.stripePriceEnv];
  if (!priceId) {
    return NextResponse.json({ error: 'Brak price ID w env.' }, { status: 500 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?success=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    metadata: {
      user_id: user.id,
      plan_key: plan.key,
    },
  });

  return NextResponse.json({ url: session.url });
}
