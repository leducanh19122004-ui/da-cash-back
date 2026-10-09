import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'DA CASH BACK — Premium Crypto Cashback Platform',
  description: 'DA CASH BACK helps traders get part of their trading fees back by registering crypto and forex exchange accounts through partner links. Transparent, secure, no password required.',
  keywords: 'cashback crypto, hoàn phí giao dịch, forex cashback, binance cashback, rebate trading',
  authors: [{ name: 'DA CASH BACK' }],
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
  openGraph: {
    title: 'DA CASH BACK — Premium Crypto Cashback Platform',
    description: 'Register through partner links, trade as usual and receive periodic trading fee rebates.',
    type: 'website', locale: 'en_US', alternateLocale: ['vi_VN', 'ko_KR', 'th_TH', 'id_ID'], siteName: 'DA CASH BACK',
    images: [{ url: '/icon-512x512.png', width: 512, height: 512, alt: 'DA CASH BACK Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DA CASH BACK — Premium Crypto Cashback Platform',
    description: 'A transparent, secure trading cashback platform.',
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
