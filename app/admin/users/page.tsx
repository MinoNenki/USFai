import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase-admin';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminUsersPage() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) redirect('/dashboard');

  const { data: users } = await supabaseAdmin
    .from('profiles')
    .select('id, email, full_name, company_name, plan_key, credits_balance, role, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <h1 className="mb-8 text-4xl font-black">Użytkownicy i role</h1>
      <div className="space-y-4">
        {(users || []).map((item) => (
          <div key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-white">{item.full_name || item.email}</div>
                <div className="text-sm text-slate-400">{item.email}</div>
                {item.company_name && <div className="text-sm text-slate-500">{item.company_name}</div>}
              </div>
              <div className="flex gap-2">
                <StatusBadge label={item.plan_key} tone="cyan" />
                <StatusBadge label={item.role} tone={item.role === 'admin' ? 'amber' : 'slate'} />
              </div>
            </div>
            <div className="mb-4 text-sm text-slate-300">Kredyty {item.credits_balance} • konto od {new Date(item.created_at).toLocaleDateString('pl-PL')}</div>
            <div className="flex flex-wrap gap-3">
              {['user', 'admin'].map((role) => (
                <form key={role} action="/api/admin/users/update" method="post">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="role" value={role} />
                  <button className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300/40">
                    Ustaw {role}
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
