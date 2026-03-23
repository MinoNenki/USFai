import { SITE } from '@/lib/site';

const sections = [
  {
    title: '1. Postanowienia ogólne',
    body: `${SITE.name} dostępny pod adresem ${SITE.domain} jest usługą SaaS służącą do generowania analiz treści sprzedażowych opisów produktów ofert materiałów marketingowych i stron sprzedażowych przy użyciu narzędzi AI.`,
  },
  {
    title: '2. Operator usługi',
    body: `Operatorem usługi jest ${SITE.legalOwner}. Kontakt w sprawach obsługi i reklamacji ${SITE.supportEmail}. Dane adresowe operatora ${SITE.legalAddress}.`,
  },
  {
    title: '3. Konto użytkownika',
    body: 'Korzystanie z płatnych funkcji wymaga utworzenia konta. Użytkownik odpowiada za poprawność danych rejestracyjnych oraz za bezpieczeństwo danych logowania. Zabronione jest udostępnianie konta osobom nieuprawnionym.',
  },
  {
    title: '4. Zakres usługi',
    body: 'Usługa umożliwia wprowadzanie treści do analizy generowanie raportów AI przechowywanie historii analiz dodawanie opinii kontakt z supportem oraz korzystanie z planów subskrypcyjnych. Operator może rozwijać funkcjonalności modyfikować interfejs i optymalizować sposób działania produktu.',
  },
  {
    title: '5. Płatności i subskrypcje',
    body: 'Płatności za plany realizowane są przez Stripe w modelu cyklicznym. Zakres limitów i kredytów zależy od aktywnego planu. Brak płatności anulowanie subskrypcji lub wygaśnięcie planu może ograniczyć dostęp do płatnych funkcji.',
  },
  {
    title: '6. Odpowiedzialność użytkownika',
    body: `Użytkownik odpowiada za treści przesyłane do ${SITE.name} w tym za ich legalność zgodność z prawem prawa autorskie oraz sposób wykorzystania wyników generowanych przez AI.`,
  },
  {
    title: '7. Charakter wyników AI',
    body: 'Raporty mają charakter pomocniczy i nie stanowią porady prawnej podatkowej inwestycyjnej medycznej ani gwarancji wyniku biznesowego. Wyniki należy zweryfikować przed wykorzystaniem w działalności operacyjnej lub prawnej.',
  },
  {
    title: '8. Niedozwolone działania',
    body: 'Zabronione jest używanie usługi do działań sprzecznych z prawem naruszania praw osób trzecich prób obchodzenia limitów testów bezpieczeństwa bez zgody operatora automatycznych nadużyć oraz przesyłania treści mogących naruszać zasady dostawców technologicznych.',
  },
  {
    title: '9. Reklamacje i wsparcie',
    body: `Reklamacje oraz zgłoszenia techniczne można kierować przez formularz supportu lub na adres ${SITE.supportEmail}. Przed publikacją komercyjną należy uzupełnić termin odpowiedzi na reklamację procedurę zwrotów i lokalne obowiązki informacyjne właściwe dla kraju sprzedaży.`,
  },
  {
    title: '10. Rozwiązanie umowy i blokada konta',
    body: 'Operator może ograniczyć lub zablokować konto w przypadku naruszenia prawa regulaminu bezpieczeństwa platformy lub wystąpienia nadużyć płatniczych. Użytkownik może zrezygnować z usługi zgodnie z zasadami swojego planu i ustawieniami subskrypcji.',
  },
  {
    title: '11. Dane prawne do uzupełnienia przed sprzedażą',
    body: `Aby regulamin był gotowy do publicznej sprzedaży przed wdrożeniem należy wpisać pełne dane przedsiębiorcy lub właściciela jurysdykcję zasady odstąpienia od umowy dla konsumentów politykę zwrotów oraz ${SITE.legalTaxId}.`,
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-200">
      <h1 className="mb-3 text-4xl font-black text-white">Regulamin</h1>
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
