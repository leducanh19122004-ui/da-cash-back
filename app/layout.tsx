import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import GlobalAnimatedBackground from './components/GlobalAnimatedBackground';

export const metadata: Metadata = {
  title: 'DA CASH BACK — Premium Crypto Cashback Platform',
  description: 'DA CASH BACK giúp trader nhận lại một phần phí giao dịch khi đăng ký tài khoản sàn crypto và forex qua link đối tác. Minh bạch, an toàn, không yêu cầu mật khẩu.',
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
    description: 'Đăng ký sàn qua link đối tác, giao dịch như bình thường và nhận hoàn phí định kỳ.',
    type: 'website', locale: 'vi_VN', siteName: 'DA CASH BACK',
    images: [{ url: '/icon-512x512.png', width: 512, height: 512, alt: 'DA CASH BACK Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DA CASH BACK — Premium Crypto Cashback Platform',
    description: 'Nền tảng cashback giao dịch minh bạch, an toàn.',
    images: ['/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          {/*
           * app-root: base layer, background đen
           * GlobalAnimatedBackground: fixed, z-index 0, pointer-events none
           * app-content: relative, z-index 10 — toàn bộ UI nằm trên nền
           */}
          <div className="app-root">
            <GlobalAnimatedBackground />
            <div className="app-content">
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
