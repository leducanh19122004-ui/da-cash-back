import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DA CASH BACK — Nền tảng hoàn phí giao dịch Crypto & Forex',
  description:
    'DA CASH BACK giúp trader nhận lại một phần phí giao dịch khi đăng ký tài khoản sàn crypto và forex qua link đối tác. Minh bạch, an toàn, không yêu cầu mật khẩu.',
  keywords: 'cashback crypto, hoàn phí giao dịch, forex cashback, binance cashback, bybit cashback, rebate trading',
  authors: [{ name: 'DA CASH BACK' }],
  openGraph: {
    title: 'DA CASH BACK — Nền tảng hoàn phí giao dịch Crypto & Forex',
    description: 'Đăng ký sàn qua link đối tác, giao dịch như bình thường và nhận hoàn phí định kỳ.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'DA CASH BACK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DA CASH BACK — Hoàn phí giao dịch Crypto & Forex',
    description: 'Nền tảng cashback giao dịch minh bạch, an toàn.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ background: '#0B0B0B', color: '#F8F5E9' }}>
        {children}
      </body>
    </html>
  );
}
