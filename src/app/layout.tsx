import type { Metadata } from 'next';
import './globals.css';
import KakaoChannelButton from '../components/KakaoChannelButton';

export const metadata: Metadata = {
  title: {
    default: '인천 식자재 납품업체 | 쌀 계란 김치 도매 | 지구농산',
    template: '%s | 지구농산',
  },
  description: '인천·부천·시흥 식자재 납품 전문. 쌀, 계란, 김치, 반찬, 식용유 도매. 새벽배송, 당일배송. 프랜차이즈·병원·급식 납품. 지구농산 1566-1521',
  keywords: ['식자재 납품', '인천 식자재', '쌀 도매', '계란 도매', '김치 납품', '식자재 도매', '급식 납품', '병원 식자재', '부천 식자재', '시흥 식자재', '새벽배송', '지구농산'],
  openGraph: {
    title: '인천 식자재 납품업체 | 지구농산',
    description: '인천·경기·서울 식자재 납품 전문. 쌀, 계란, 김치, 반찬, 식용유 도매. 새벽·당일배송.',
    url: 'https://jigufood.com',
    siteName: '지구농산',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jigufood.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="naver-site-verification" content="360ad8c9acee4f2f93376655feb13f099f5fb59e" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-white text-gray-900 min-h-screen">
        {children}
        <KakaoChannelButton />
      </body>
    </html>
  );
}
