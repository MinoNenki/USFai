import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase-admin';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminSupportPage() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) redirect('/dashboard');

  const { data: messages } = await supabaseAdmin.from('support_messages').select('*').order('created_at', { ascending: false }).limit(100);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <h1 className="mb-8 text-4xl font-black">Zgłoszenia supportu</h1>
      <div className="space-y-4">
        {(messages || []).map((item) => (
          <div key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-white">{item.subject}</div>
                <div className="mt-1 text-sm text-slate-400">{item.email}</div>
                {item.name && <div className="text-sm text-slate-500">{item.name}</div>}
              </div>
              <StatusBadge label={item.status} tone={item.status === 'new' ? 'amber' : item.status === 'in_progress' ? 'cyan' : 'emerald'} />
            </div>
            <p className="mb-4 whitespace-pre-wrap text-slate-200">{item.message}</p>
            <div className="mb-4 text-xs text-slate-500">{new Date(item.created_at).toLocaleString('pl-PL')}</div>
            <div className="flex flex-wrap gap-3">
              {['new', 'in_progress', 'closed'].map((status) => (
                <form key={status} action="/api/admin/support/update" method="post">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="status" value={status} />
                  <button className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300/40">
                    {status === 'new' ? 'Nowe' : status === 'in_progress' ? 'W toku' : 'Zamknij'}
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
