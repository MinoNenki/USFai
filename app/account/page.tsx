import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import StatusBadge from '@/components/StatusBadge';

export default async function AccountPage({ searchParams }: { searchParams?: { saved?: string; error?: string } }) {
  const params = searchParams || {};
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-white">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200">Konto użytkownika</div>
          <h1 className="text-4xl font-black">Profil i ustawienia klienta</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Uzupełnij dane firmy lub osoby prywatnej aby konto było gotowe do faktur wsparcia i dalszego skalowania.</p>
        </div>
        <StatusBadge label={profile?.role === 'admin' ? 'admin' : 'user'} tone={profile?.role === 'admin' ? 'amber' : 'cyan'} />
      </div>

      {(params.saved || params.error) && (
        <div className={`mb-6 rounded-2xl border p-4 ${params.saved ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-rose-300/30 bg-rose-300/10 text-rose-200'}`}>
          {params.saved ? 'Dane zapisane poprawnie' : 'Nie udało się zapisać danych'}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form action="/api/profile/update" method="post" className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <h2 className="mb-6 text-2xl font-bold">Dane profilu</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Imię i nazwisko</label>
              <input name="fullName" defaultValue={profile?.full_name ?? ''} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Jan Kowalski" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Firma lub marka</label>
              <input name="companyName" defaultValue={profile?.company_name ?? ''} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Moja marka ecommerce" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Adres e mail</label>
              <input value={profile?.email ?? user.email ?? ''} disabled className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-400 outline-none" />
            </div>
          </div>
          <button className="mt-6 rounded-2xl bg-cyan-300 px-6 py-3 font-semibold text-slate-950">Zapisz profil</button>
        </form>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
          <h2 className="mb-6 text-2xl font-bold">Status konta</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Plan</div>
              <div className="mt-2 text-xl font-bold text-white">{profile?.plan_key ?? 'free'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Kredyty</div>
              <div className="mt-2 text-xl font-bold text-white">{profile?.credits_balance ?? 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Miesięczny limit</div>
              <div className="mt-2 text-xl font-bold text-white">{profile?.monthly_analysis_limit ?? 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Onboarding</div>
              <div className="mt-2 text-xl font-bold text-white">{profile?.onboarding_completed ? 'gotowe' : 'do uzupełnienia'}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
