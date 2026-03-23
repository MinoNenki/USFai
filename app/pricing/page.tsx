import PricingCards from '@/components/PricingCards';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { SITE } from '@/lib/site';

export default async function PricingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-white">
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
          Cennik {SITE.name}
        </div>
        <h1 className="text-5xl font-black tracking-tight">Wybierz plan dopasowany do skali wzrostu.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Free pozwala sprawdzić jakość raportu. Starter wspiera mniejsze sklepy i freelancerów. Growth i Business są ustawione pod regularną pracę z ofertami reklamami stronami sprzedażowymi i obsługą klientów.
        </p>
      </div>
      <PricingCards isAuthenticated={Boolean(user)} />
    </main>
  );
}
