import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '지구농산 (주) | 품목 안내',
  description: '신선한 식자재를 공급합니다. 농산품, 수산품, 축산품, 공산품 전 품목 안내.',
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
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-white text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
