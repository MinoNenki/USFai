import Link from 'next/link';
import PricingCards from '@/components/PricingCards';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { SITE } from '@/lib/site';

const businessBenefits = [
  'Szybsze poprawianie opisów produktów ofert i landing page',
  'Mniej kosztownych błędów w reklamach i komunikacji sprzedażowej',
  'Powtarzalny proces dla zespołu marketingu sprzedaży i ecommerce',
  'Lepsza gotowość do skalowania sklepu usług i kampanii online',
];

const personalBenefits = [
  'Lepsze portfolio ofert i opisów dla freelancerów',
  'Pomoc w starcie własnego sklepu lub marki osobistej',
  'Szybkie analizy bez potrzeby kupowania drogiego audytu',
  'Czytelne rekomendacje gotowe do wdrożenia krok po kroku',
];

const testimonials = [
  { quote: 'realnie pomogło nam poprawić karty produktu i reklamy wynik sprzedazy ruszył po kilku dniach', author: 'Marta ecommerce manager' },
  { quote: 'używam codziennie przy ofertach dla klientów oszczedza czas i daje sensowny punkt startu', author: 'Kamil freelancer performance' },
  { quote: 'na start marki online bardzo pomocne bo wreszcie wiem co poprawić najpierw a nie wszystko naraz', author: 'Aneta właścicielka sklepu' },
];

const steps = [
  'Zakładasz konto i wybierasz plan dopasowany do skali pracy',
  'Wklejasz opis produktu ofertę reklamę albo treść strony',
  'USFai generuje raport z problemami szansami i planem działań',
  'Wynik zapisuje się w panelu użytkownika i jest gotowy do dalszej pracy',
];

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="overflow-hidden text-white">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_18%),linear-gradient(180deg,#020617_0%,#020617_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
              Profesjonalny AI SaaS do analizy ecommerce ofert sprzedaży i treści online
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              {SITE.name} pomaga szybciej sprzedawać i lepiej komunikować wartość produktu.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Gotowa aplikacja SaaS dla firm i osób prywatnych które chcą oceniać opisy produktów kampanie strony sprzedażowe oferty i treści marketingowe. <strong>{SITE.name}</strong> skraca czas analizy poprawia jakość komunikacji i pomaga szybciej wdrażać zmiany pod wynik.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={user ? '/dashboard' : '/auth/register'} className="rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-slate-950 transition hover:opacity-90">
                {user ? 'Przejdź do panelu' : 'Załóż konto i zacznij'}
              </Link>
              <Link href="/pricing" className="rounded-2xl border border-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/5">
                Zobacz plany
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Zastosowanie</div>
                <div className="mt-2 text-2xl font-bold">E commerce i usługi</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Gotowość</div>
                <div className="mt-2 text-2xl font-bold">Stripe Supabase Vercel</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Docelowa domena</div>
                <div className="mt-2 text-2xl font-bold">{SITE.domain}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Co dostajesz od razu</div>
            <div className="space-y-4">
              {[
                'Landing page premium',
                'Panel użytkownika',
                'Panel admina',
                'Stripe checkout i webhook',
                'Supabase auth i baza danych',
                'Formularz supportu i opinii',
                'Regulamin i polityka prywatności',
                'Gotowość do deployu na Vercel',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Korzyści dla firm</div>
            <h2 className="mt-3 text-3xl font-bold">Lepsza sprzedaż bez przeciągania analiz i chaosu w zespole.</h2>
            <div className="mt-6 space-y-3">
              {businessBenefits.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Korzyści dla osób prywatnych</div>
            <h2 className="mt-3 text-3xl font-bold">Mocny start dla freelancerów twórców i właścicieli małych marek.</h2>
            <div className="mt-6 space-y-3">
              {personalBenefits.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Cennik</div>
            <h2 className="mt-3 text-4xl font-bold">Plany przygotowane pod szybki start i skalowanie.</h2>
          </div>
        </div>
        <PricingCards isAuthenticated={Boolean(user)} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Jak działa</div>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 font-bold text-slate-950">{index + 1}</div>
                <div className="text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Zaufanie i obsługa</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Panel klienta z historią analiz',
              'Panel admina do moderacji',
              'Obsługa subskrypcji Stripe',
              'Publiczne opinie z moderacją',
              'Formularz kontaktu z supportem',
              'Konto użytkownika i onboarding',
              'Polityka prywatności',
              'Regulamin pod USFai',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200">Opinie</div>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-bold">Realistyczne opinie budują wiarygodny start MVP</h2>
            <p className="mt-3 max-w-3xl text-slate-300">Dodałem przykładowe opinie bez sztucznego tonu oraz osobną stronę do zbierania nowych recenzji od użytkowników.</p>
          </div>
          <Link href="/reviews" className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/5">Zobacz wszystkie opinie</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.author} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-lg leading-8 text-slate-200">{item.quote}</p>
              <div className="mt-6 text-sm font-semibold text-white">{item.author}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
