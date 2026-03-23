import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function AdminPage() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) redirect('/dashboard');

  const [profilesCount, reviewsPending, supportNew, analysesCount] = await Promise.all([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabaseAdmin.from('support_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin.from('analyses').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200">Panel admina</div>
          <h1 className="text-5xl font-black tracking-tight">Zarządzanie produktem klientami i zgłoszeniami</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Ten panel pozwala od razu moderować opinie obsługiwać support i kontrolować użytkowników bez późniejszego dorabiania podstawowych funkcji.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Użytkownicy', String(profilesCount.count ?? 0)],
          ['Analizy', String(analysesCount.count ?? 0)],
          ['Opinie do moderacji', String(reviewsPending.count ?? 0)],
          ['Nowe zgłoszenia', String(supportNew.count ?? 0)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
            <div className="mt-3 text-4xl font-black">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          { href: '/admin/users', title: 'Użytkownicy', text: 'Podgląd kont planów i ról w systemie' },
          { href: '/admin/reviews', title: 'Opinie', text: 'Akceptacja lub odrzucanie opinii klientów' },
          { href: '/admin/support', title: 'Support', text: 'Obsługa nowych zgłoszeń i aktualizacja statusów' },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 transition hover:border-cyan-300/40 hover:bg-slate-900">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Moduł</div>
            <h2 className="mt-3 text-3xl font-bold">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
