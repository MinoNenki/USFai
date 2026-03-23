import './globals.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI SaaS dla e commerce`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'USFai pomaga firmom i osobom prywatnym szybciej oceniać oferty opisy produktów reklamy i strony sprzedażowe z pomocą AI.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE.name} — AI SaaS dla e commerce`,
    description:
      'Profesjonalna aplikacja SaaS do analiz treści ofert kampanii i sprzedaży online.',
    url: SITE.url,
    siteName: SITE.name,
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Navbar />
        {children}
        <footer className="border-t border-white/10 px-6 py-10 text-sm text-slate-400">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-white">{SITE.name}</div>
              <div>AI dla e commerce ofert reklam stron sprzedażowych i analiz pod wzrost.</div>
              <div className="mt-2">Kontakt {SITE.supportEmail}</div>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link href="/pricing">Cennik</Link>
              <Link href="/reviews">Opinie</Link>
              <Link href="/support">Support</Link>
              <Link href="/privacy">Polityka prywatności</Link>
              <Link href="/terms">Regulamin</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
