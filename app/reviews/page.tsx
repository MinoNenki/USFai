import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function ReviewsPage({ searchParams }: { searchParams?: { sent?: string; error?: string } }) {
  const params = searchParams || {};
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(24);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <div className="mb-10 max-w-3xl">
        <div className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200">Opinie klientów</div>
        <h1 className="text-5xl font-black tracking-tight">Zaufanie buduje sprzedaż i lepszy start produktu</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">Ta sekcja pokazuje zaakceptowane opinie klientów oraz umożliwia dodanie własnej recenzji która trafia do moderacji w panelu admina.</p>
      </div>

      {(params.sent || params.error) && (
        <div className={`mb-8 rounded-2xl border p-4 ${params.sent ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-rose-300/30 bg-rose-300/10 text-rose-200'}`}>
          {params.sent ? 'Dziękujemy Twoja opinia została dodana do moderacji' : 'Uzupełnij pola formularza poprawnie'}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {(reviews || []).map((item) => (
            <div key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <div className="mb-4 text-cyan-200">{'★'.repeat(item.rating)}</div>
              <p className="text-lg leading-8 text-slate-200">{item.content}</p>
              <div className="mt-6 font-semibold text-white">{item.name}</div>
              {item.company_or_role && <div className="text-sm text-slate-400">{item.company_or_role}</div>}
            </div>
          ))}
        </div>

        <form action="/api/reviews/create" method="post" className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
          <h2 className="mb-6 text-2xl font-bold">Dodaj opinię</h2>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Imię lub marka</label>
            <input name="name" defaultValue={user?.email?.split('@')[0] ?? ''} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Anna albo Studio Growth" required />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-slate-300">Rola lub firma</label>
            <input name="companyOrRole" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="właścicielka sklepu" />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-slate-300">Ocena</label>
            <select name="rating" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-slate-300">Treść opinii</label>
            <textarea name="content" rows={7} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none" placeholder="Napisz naturalną opinię klienta" required />
          </div>
          <button className="mt-6 rounded-2xl bg-cyan-300 px-6 py-3 font-semibold text-slate-950">Wyślij opinię</button>
        </form>
      </div>
    </main>
  );
}
