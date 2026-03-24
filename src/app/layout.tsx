import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '품목 안내 | 여천 식자재',
  description: '식자재 품목 안내',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-brand-50 text-gray-800 min-h-screen">
        <header className="bg-white border-b border-brand-200 sticky top-0 z-50 no-print">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏪</span>
              <h1 className="text-lg font-bold text-brand-700">여천 식자재</h1>
            </a>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-brand-800 text-brand-200 text-center py-4 text-sm mt-12 no-print">
          &copy; 2026 여천 식자재. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
