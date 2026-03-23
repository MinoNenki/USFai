import { SITE } from '@/lib/site';

const sections = [
  {
    title: '1. Administrator danych',
    body: `Administratorem danych dla serwisu ${SITE.domain} i aplikacji ${SITE.name} jest ${SITE.legalOwner}. Kontakt ${SITE.supportEmail}. Adres korespondencyjny ${SITE.legalAddress}.`,
  },
  {
    title: '2. Jakie dane przetwarzamy',
    body: 'Możemy przetwarzać dane konta użytkownika adres e mail dane rozliczeniowe historię analiz treści przesyłane do analizy identyfikatory techniczne logi bezpieczeństwa oraz informacje wymagane do obsługi płatności opinii i wsparcia klienta.',
  },
  {
    title: '3. Cele i podstawy przetwarzania',
    body: 'Dane przetwarzamy w celu świadczenia usługi SaaS obsługi konta uwierzytelniania rozliczeń subskrypcji zapewnienia bezpieczeństwa obsługi zgłoszeń i moderacji opinii oraz dochodzenia lub obrony roszczeń. Podstawą przetwarzania jest wykonanie umowy uzasadniony interes administratora oraz obowiązki prawne.',
  },
  {
    title: '4. Odbiorcy danych',
    body: 'Dane mogą być powierzane dostawcom infrastruktury i usług technologicznych niezbędnych do działania aplikacji w szczególności Vercel Supabase Stripe oraz OpenAI. Zakres przekazania danych ograniczamy do minimum niezbędnego do realizacji usługi.',
  },
  {
    title: '5. Czas przechowywania',
    body: 'Dane konta przechowujemy przez okres aktywności użytkownika oraz przez czas potrzebny do rozliczeń bezpieczeństwa i realizacji obowiązków prawnych. Dane mogą zostać usunięte wcześniej na uzasadniony wniosek użytkownika jeśli nie stoi temu na przeszkodzie obowiązek prawny lub uzasadniony interes administratora.',
  },
  {
    title: '6. Prawa użytkownika',
    body: 'Użytkownik ma prawo dostępu do danych sprostowania usunięcia ograniczenia przetwarzania przenoszenia danych wniesienia sprzeciwu oraz złożenia skargi do właściwego organu nadzorczego jeżeli uzna że dane są przetwarzane niezgodnie z prawem.',
  },
  {
    title: '7. Cookies i dane techniczne',
    body: 'Serwis może korzystać z plików cookies i podobnych technologii do utrzymania sesji logowania bezpieczeństwa działania formularzy oraz podstawowych analiz technicznych. Przed uruchomieniem produkcyjnym należy dopasować baner cookies i ustawienia zgód do modelu analityki używanego w projekcie.',
  },
  {
    title: '8. Dane wprowadzane do analiz',
    body: `Użytkownik odpowiada za legalność treści przesyłanych do ${SITE.name}. Nie zalecamy przesyłania danych wrażliwych tajemnic przedsiębiorstwa lub informacji których przetwarzanie nie jest konieczne do wykonania analizy.`,
  },
  {
    title: '9. Dane firmowe do uzupełnienia',
    body: `Przed komercyjnym wdrożeniem należy uzupełnić pełną nazwę operatora adres dane rejestrowe oraz ${SITE.legalTaxId}. Dokument jest profesjonalnym szablonem startowym ale wymaga wstawienia realnych danych właściciela.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-200">
      <h1 className="mb-3 text-4xl font-black text-white">Polityka prywatności</h1>
      <p className="mb-8 text-sm text-slate-400">Aktualizacja {SITE.lastUpdated}</p>
      <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 leading-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-xl font-bold text-white">{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
