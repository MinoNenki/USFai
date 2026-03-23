export const SITE = {
  name: 'USFai',
  domain: 'twoja-domena.pl',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://twoja-domena.pl',
  supportEmail: 'support@twoja-domena.pl',
  legalOwner: 'USFai — wpisz pełną nazwę firmy lub właściciela przed publikacją komercyjną',
  legalAddress: 'Wpisz pełny adres siedziby lub adres do reklamacji przed publikacją komercyjną',
  legalTaxId: 'Wpisz NIP VAT lub dane rejestrowe jeśli są wymagane',
  lastUpdated: '22.03.2026',
} as const;
