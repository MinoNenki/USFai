import { createSupabaseServerClient } from '@/lib/supabase-server';
import StatusBadge from '@/components/StatusBadge';

export default async function SupportPage({ searchParams }: { searchParams?: { sent?: string; error?: string } }) {
  const params = searchParams || {};
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let tickets: Array<{ id: string; subject: string; status: string; created_at: string }> = [];
  if (user) {
    const { data } = await supabase
      .from('support_messages')
      .select('id, subject, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    tickets = data || [];
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200">Support</div>
          <h1 className="text-5xl font-black tracking-tight">Profesjonalne wsparcie dla klientów USFai</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Zgłaszaj pytania techniczne błędy płatności problemy z analizą lub prośby o rozwój funkcji. Formularz działa od razu z Supabase i trafia do panelu admina.</p>

          {(params.sent || params.error) && (
            <div className={`mt-6 rounded-2xl border p-4 ${params.sent ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-rose-300/30 bg-rose-300/10 text-rose-200'}`}>
              {params.sent ? 'Wiadomość została wysłana do supportu' : 'Uzupełnij wymagane pola lub spróbuj ponownie'}
            </div>
          )}

          <form action="/api/support/create" method="post" className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Imię lub nazwa</label>
                <input name="name" defaultValue={user?.email?.split('@')[0] ?? ''} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Jan albo Moja Marka" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Adres e mail</label>
                <input name="email" type="email" defaultValue={user?.email ?? ''} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="kontakt@firma.pl" required />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm text-slate-300">Temat</label>
              <input name="subject" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Problem z płatnością Stripe" required />
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm text-slate-300">Wiadomość</label>
              <textarea name="message" rows={8} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Opisz dokładnie problem albo pytanie" required />
            </div>
            <button className="mt-6 rounded-2xl bg-cyan-300 px-6 py-3 font-semibold text-slate-950">Wyślij do supportu</button>
          </form>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
          <h2 className="mb-6 text-2xl font-bold">Twoje ostatnie zgłoszenia</h2>
          <div className="space-y-4">
            {tickets.length ? tickets.map((ticket) => (
              <div key={ticket.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{ticket.subject}</div>
                  <StatusBadge
                    label={ticket.status === 'new' ? 'nowe' : ticket.status === 'in_progress' ? 'w toku' : 'zamknięte'}
                    tone={ticket.status === 'new' ? 'amber' : ticket.status === 'in_progress' ? 'cyan' : 'emerald'}
                  />
                </div>
                <div className="text-sm text-slate-400">{new Date(ticket.created_at).toLocaleString('pl-PL')}</div>
              </div>
            )) : (
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300">Brak zgłoszeń. Możesz wysłać pierwszą wiadomość od razu.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
