import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import GlobalAnimatedBackground from './components/GlobalAnimatedBackground';

export const metadata: Metadata = {
  title: 'DA CASH BACK — Nền tảng hoàn phí giao dịch Crypto & Forex',
  description: 'DA CASH BACK giúp trader nhận lại một phần phí giao dịch khi đăng ký tài khoản sàn crypto và forex qua link đối tác. Minh bạch, an toàn, không yêu cầu mật khẩu.',
  keywords: 'cashback crypto, hoàn phí giao dịch, forex cashback, binance cashback, rebate trading',
  authors: [{ name: 'DA CASH BACK' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'DA CASH BACK — Nền tảng hoàn phí giao dịch Crypto & Forex',
    description: 'Đăng ký sàn qua link đối tác, giao dịch như bình thường và nhận hoàn phí định kỳ.',
    type: 'website', locale: 'vi_VN', siteName: 'DA CASH BACK',
    images: [{ url: '/logo.png', width: 1080, height: 1080, alt: 'DA CASH BACK Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DA CASH BACK — Hoàn phí giao dịch Crypto & Forex',
    description: 'Nền tảng cashback giao dịch minh bạch, an toàn.',
    images: ['/logo.png'],
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
