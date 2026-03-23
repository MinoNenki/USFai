import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase-admin';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminReviewsPage() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) redirect('/dashboard');

  const { data: reviews } = await supabaseAdmin.from('reviews').select('*').order('created_at', { ascending: false }).limit(100);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <h1 className="mb-8 text-4xl font-black">Moderacja opinii</h1>
      <div className="space-y-4">
        {(reviews || []).map((item) => (
          <div key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-white">{item.name}</div>
                {item.company_or_role && <div className="text-sm text-slate-400">{item.company_or_role}</div>}
              </div>
              <StatusBadge label={item.status} tone={item.status === 'approved' ? 'emerald' : item.status === 'rejected' ? 'rose' : 'amber'} />
            </div>
            <div className="mb-4 text-cyan-200">{'★'.repeat(item.rating)}</div>
            <p className="mb-5 text-slate-200">{item.content}</p>
            <div className="flex flex-wrap gap-3">
              {['approved', 'pending', 'rejected'].map((status) => (
                <form key={status} action="/api/admin/reviews/update" method="post">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="status" value={status} />
                  <button className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300/40">
                    {status === 'approved' ? 'Akceptuj' : status === 'pending' ? 'Ustaw oczekuje' : 'Odrzuć'}
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
