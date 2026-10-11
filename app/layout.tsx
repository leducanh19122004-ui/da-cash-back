import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { BRAND, SITE_URL } from '@/config/ecosystem';
import { availableExchanges } from '@/config/exchanges';

const TITLE = `${BRAND.cashback} — Trader benefits by ${BRAND.network}`;
const DESCRIPTION = `${BRAND.cashback} is the trader membership of ${BRAND.network}: fee rewards at volume milestones, a daily market plan, a member community, learning and support. Available now on ${availableExchanges
  .map((e) => e.name)
  .join(', ')}.`;

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
  themeColor: '#080808',
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
