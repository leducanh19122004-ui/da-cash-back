import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { BRAND, SITE_URL } from '@/config/ecosystem';
import { registrableExchanges } from '@/config/exchanges';

const TITLE = `${BRAND.cashback} — Trading fee rebates by ${BRAND.network}`;
const DESCRIPTION = `Get part of your trading fees back. Register on a supported exchange through a DA partner link, submit your UID and receive a rebate on eligible trading fees. Open for registration: ${registrableExchanges
  .map((e) => e.name)
  .join(', ')}. Rates, eligible products and payout timing are confirmed per exchange.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: BRAND.network }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // OG image is still the 512px app icon (no 1200x630 artwork yet).
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['vi_VN', 'ko_KR', 'th_TH', 'id_ID'],
    siteName: BRAND.cashback,
    images: [{ url: '/icon-512x512.png', width: 512, height: 512, alt: `${BRAND.cashback} logo` }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
