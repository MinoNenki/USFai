# USFai

Profesjonalna aplikacja SaaS oparta o Next.js 14 Supabase Stripe i OpenAI.
Projekt jest przygotowany pod markę **USFai** i zastosowanie w e commerce usługach ofertach sprzedażowych reklamach i analizie treści online.

## Co jest gotowe w tej wersji
- landing page premium pod sprzedaż
- logowanie i rejestracja Supabase
- panel użytkownika z historią analiz
- panel admina do zarządzania użytkownikami opiniami i supportem
- Stripe Checkout i webhook subskrypcji
- publiczna sekcja opinii z moderacją
- formularz kontaktu z supportem
- konto użytkownika i onboarding
- polityka prywatności i regulamin pod markę USFai
- baza danych Supabase pod gotowy start MVP SaaS

## Stack
- Next.js 14
- React 18
- Supabase Auth + DB
- Stripe Checkout + webhook
- OpenAI API
- Tailwind CSS
- Vercel
- GitHub
- VS Code

## Najważniejsze zasady przed deployem
1. Nie wrzucaj do repo folderów `node_modules` `.next` pliku `.env.local` ani folderu `.git` z innego archiwum.
2. W repo trzymaj tylko kod źródłowy oraz `package-lock.json`.
3. Na Vercel ustaw wszystkie zmienne środowiskowe ręcznie.
4. W Supabase dodaj poprawny URL produkcyjny po deployu.
5. W Stripe ustaw webhook na `/api/stripe/webhook`.
6. Przed publiczną sprzedażą wpisz swoje prawdziwe dane prawne w `lib/site.ts`.

## Krok po kroku od GitHub repo do produkcji

### 1. Rozpakuj paczkę i otwórz projekt w VS Code
```bash
npm install
cp .env.example .env.local
```

### 2. Uzupełnij `.env.local`
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_25=
STRIPE_PRICE_50=
STRIPE_PRICE_99=
```

### 3. Utwórz nowe czyste repo na GitHub
```bash
git init
git add .
git commit -m "USFai final deploy ready"
git branch -M main
git remote add origin TWOJ_URL_REPO
git push -u origin main
```

### 4. Skonfiguruj Supabase
1. Załóż nowy projekt.
2. Wejdź do SQL Editor.
3. Wklej cały plik `supabase/schema.sql`.
4. Uruchom SQL.
5. Wejdź do Authentication > URL Configuration.
6. Ustaw `Site URL` na `http://localhost:3000` lokalnie.
7. Dodaj `Redirect URLs` dla lokalnego adresu i później dla Vercel.
8. Skopiuj `Project URL` oraz `anon key` do `.env.local`.
9. Skopiuj `service_role key` do `.env.local`.

### 5. Ustaw pierwszego administratora
Po pierwszej rejestracji użytkownika:
1. Otwórz Table Editor w Supabase.
2. Wejdź do tabeli `profiles`.
3. Znajdź swój rekord po e mailu.
4. Zmień pole `role` z `user` na `admin`.
5. Zapisz zmiany.

### 6. Skonfiguruj Stripe
1. Utwórz trzy produkty subskrypcyjne w Stripe.
2. Nazwij je zgodnie z planami Starter Growth Business.
3. Skopiuj `price_id` każdego planu.
4. Wstaw je do ENV jako:
   - `STRIPE_PRICE_25`
   - `STRIPE_PRICE_50`
   - `STRIPE_PRICE_99`
5. Skopiuj `STRIPE_SECRET_KEY` do `.env.local`.

### 7. Uruchom lokalnie webhook Stripe
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Skopiuj wygenerowany `webhook signing secret` i wstaw do `STRIPE_WEBHOOK_SECRET`.

### 8. Odpal aplikację lokalnie
```bash
npm run dev
```
Wejdź na `http://localhost:3000`

### 9. Sprawdź jakość przed wysyłką na produkcję
```bash
npm run typecheck
npm run build
```

### 10. Deploy na Vercel
1. Zaloguj się do Vercel.
2. Kliknij **Add New Project**.
3. Importuj repo z GitHub.
4. Ustaw wszystkie ENV dokładnie jak lokalnie.
5. Wdróż projekt.

### 11. Po deployu zaktualizuj Supabase
1. Skopiuj adres produkcyjny z Vercel.
2. W Supabase ustaw go jako `Site URL`.
3. Dodaj ten sam adres do `Redirect URLs`.
4. Ustaw `NEXT_PUBLIC_SITE_URL` na adres Vercel albo później na własną domenę.

### 12. Po deployu zaktualizuj Stripe
1. W Stripe dodaj produkcyjny webhook:
   `https://twoja-domena.pl/api/stripe/webhook`
   albo adres Vercel jeśli domena nie jest jeszcze podpięta.
2. Zaznacz co najmniej eventy:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 13. Podłącz domenę w Vercel
1. Kup domenę tam gdzie chcesz.
2. Dodaj ją w Vercel do projektu.
3. Ustaw rekordy DNS według instrukcji Vercel.
4. Po aktywacji domeny wpisz ją do `lib/site.ts` oraz ENV `NEXT_PUBLIC_SITE_URL`.

### 14. Ostatnie obowiązkowe poprawki przed sprzedażą
- wpisz prawdziwą nazwę firmy lub właściciela
- wpisz prawdziwy adres do reklamacji
- wpisz prawdziwy e mail supportu
- wpisz dane NIP VAT lub dane rejestrowe jeśli są wymagane
- dopracuj zasady zwrotów i odstąpienia od umowy jeśli sprzedajesz do konsumentów

## Moduły admina
- `/admin` przegląd systemu
- `/admin/users` role użytkowników i planów
- `/admin/reviews` moderacja opinii
- `/admin/support` obsługa zgłoszeń

## Moduły użytkownika
- `/dashboard` analizy i historia
- `/account` profil i dane klienta
- `/support` kontakt z supportem
- `/reviews` publiczne opinie i dodawanie recenzji

## Wymagane ENV
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_25=
STRIPE_PRICE_50=
STRIPE_PRICE_99=
```

## Ważna uwaga prawna
Dokumenty prawne są mocnym profesjonalnym szablonem startowym pod USFai ale nie zastępują lokalnej porady prawnej. Przed sprzedażą wpisz prawdziwe dane operatora i sprawdź zgodność z przepisami kraju sprzedaży.
