export type PlanKey = 'free' | 'starter25' | 'growth50' | 'business99';

export const PLANS = {
  free: {
    key: 'free',
    name: 'Free',
    audience: 'Test produktu',
    priceLabel: '$0',
    monthlyCredits: 1,
    monthlyAnalyses: 1,
    stripePriceEnv: null,
    featured: false,
    description: 'Na start dla osób, które chcą sprawdzić jakość raportów i zobaczyć działanie produktu.',
    bullets: ['1 analiza / miesiąc', '1 kredyt startowy', 'Historia analiz', 'Panel użytkownika'],
  },
  starter25: {
    key: 'starter25',
    name: 'Starter',
    audience: 'Freelancerzy i małe sklepy',
    priceLabel: '$25',
    monthlyCredits: 10,
    monthlyAnalyses: 10,
    stripePriceEnv: 'STRIPE_PRICE_25',
    featured: false,
    description: 'Dobry plan dla mniejszych projektów e-commerce, pracy nad opisami produktów i regularnymi kampaniami.',
    bullets: ['10 kredytów / miesiąc', '10 analiz / miesiąc', 'Raporty dla produktów, ofert i reklam', 'Pełna historia analiz'],
  },
  growth50: {
    key: 'growth50',
    name: 'Growth',
    audience: 'Rosnące marki online',
    priceLabel: '$50',
    monthlyCredits: 30,
    monthlyAnalyses: 30,
    stripePriceEnv: 'STRIPE_PRICE_50',
    featured: true,
    description: 'Najlepszy wybór dla sklepów i zespołów, które regularnie optymalizują strony, reklamy i treści sprzedażowe.',
    bullets: ['30 kredytów / miesiąc', '30 analiz / miesiąc', 'Stała praca z kampaniami i ofertami', 'Najlepszy stosunek ceny do wartości'],
  },
  business99: {
    key: 'business99',
    name: 'Business',
    audience: 'Zespoły i agencje',
    priceLabel: '$99',
    monthlyCredits: 120,
    monthlyAnalyses: 120,
    stripePriceEnv: 'STRIPE_PRICE_99',
    featured: false,
    description: 'Plan dla większej skali, wielu marek lub zespołów obsługujących liczne produkty i kampanie równolegle.',
    bullets: ['120 kredytów / miesiąc', '120 analiz / miesiąc', 'Wysoki limit dla zespołów', 'Gotowe do większej skali'],
  },
} as const;

export const PLAN_ORDER = [PLANS.free, PLANS.starter25, PLANS.growth50, PLANS.business99];

export const getPlanByStripePriceId = (priceId: string | null | undefined): PlanKey | null => {
  if (!priceId) return null;

  if (priceId === process.env.STRIPE_PRICE_25) return 'starter25';
  if (priceId === process.env.STRIPE_PRICE_50) return 'growth50';
  if (priceId === process.env.STRIPE_PRICE_99) return 'business99';

  return null;
};
