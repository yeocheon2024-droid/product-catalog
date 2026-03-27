'use client';

import { useState } from 'react';

const PRODUCTS = [
  { name: '쌀·잡곡', desc: '국내산 프리미엄 쌀, 잡곡류 대량 납품' },
  { name: '계란', desc: '신선 계란 매일 입고, 당일 배송' },
  { name: '김치·반찬', desc: '국내산 김치, 반찬류 정기 납품' },
  { name: '식용유·조미료', desc: '대용량 식용유, 소스, 양념류' },
  { name: '냉동식품', desc: '만두, 냉동 식자재 보관·배송' },
  { name: '기타 식자재', desc: '면류, 통조림, 건어물 등 전 품목' },
];

const CLIENTS = ['프랜차이즈 식당', '병원·요양원', '단체급식', '학교·어린이집', '호텔·카페', '식품 가공업체'];

interface DeliveryPageProps {
  region: string;
  regionFull: string;
  areas: string[];
  description: string;
  highlight: string;
}

export default function DeliveryPage({ region, regionFull, areas, description, highlight }: DeliveryPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="지구농산" className="h-11 w-11" />
            <span className="text-2xl font-extrabold text-amber-900 tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">제품소개</a>
            <a href="/order" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">발주하기</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">문의하기</a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <a href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">제품소개</a>
            <a href="/order" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">발주하기</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">문의하기</a>
          </div>
        )}
      </header>

      {/* 히어로 */}
      <section className="bg-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          <p className="text-sm font-medium text-amber-700">{regionFull} 식자재 납품 전문</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            {region} 식자재 납품<br className="hidden sm:block" /> 새벽·당일 배송
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
          <div className="mt-3 inline-block bg-amber-100 text-amber-800 text-sm font-medium px-4 py-2 rounded-lg">
            {highlight}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="bg-amber-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors">
              견적 요청하기
            </a>
            <a href="tel:1566-1521" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
              1566-1521 전화하기
            </a>
          </div>
        </div>
      </section>

      {/* 배송 가능 지역 */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{region} 배송 가능 지역</h2>
          <div className="flex flex-wrap gap-2">
            {areas.map(area => (
              <span key={area} className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm font-medium text-amber-900">
                {regionFull} {area}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">전날 오후 4시까지 주문 → 다음날 새벽·오전 배송</p>
        </div>
      </section>

      {/* 취급 품목 */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">취급 품목</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRODUCTS.map(item => (
              <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-amber-700 font-medium hover:underline">전체 품목 보기 →</a>
          </div>
        </div>
      </section>

      {/* 납품 가능 업종 */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">납품 가능 업종</h2>
          <div className="flex flex-wrap gap-2">
            {CLIENTS.map(c => (
              <span key={c} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 왜 지구농산인가 */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">왜 지구농산인가</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm">새벽·오전 배송</h3>
              <p className="mt-1 text-xs text-gray-500">전날 오후 4시 주문 마감, 다음날 새벽 또는 오전 도착</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm">즉시 반품·교환</h3>
              <p className="mt-1 text-xs text-gray-500">품질 문제 시 담당자 직접 회수, 당일 교환·환불</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm">전담 담당자</h3>
              <p className="mt-1 text-xs text-gray-500">거래처별 전담 영업 담당자 밀착 관리</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm">검증된 납품 이력</h3>
              <p className="mt-1 text-xs text-gray-500">프랜차이즈, 병원, 급식 등 다양한 업종 장기 납품</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-amber-700">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-xl font-bold text-white">{region} 지역 식자재 납품, 지금 문의하세요</h2>
          <p className="mt-2 text-amber-100 text-sm">견적 요청 후 영업일 1일 이내 담당자가 연락드립니다.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/contact" className="bg-white text-amber-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors">
              견적 요청하기
            </a>
            <a href="tel:1566-1521" className="border border-white text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors">
              1566-1521
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: '지구농산 주식회사',
            description: `${regionFull} 식자재 납품 전문. 쌀, 계란, 김치, 반찬, 식용유 도매.`,
            telephone: '1566-1521',
            email: 'ljsgn5958@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '항동로139번길 39, 1층 물류창고',
              addressLocality: '부평구',
              addressRegion: '인천광역시',
              addressCountry: 'KR',
            },
            areaServed: areas.map(area => ({
              '@type': 'Place',
              name: `${regionFull} ${area}`,
            })),
            priceRange: '$$',
            openingHours: 'Mo-Fr 09:00-17:00',
          }),
        }}
      />

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="지구농산" className="h-8 w-8 brightness-0 invert opacity-80" />
                <h3 className="text-white text-lg tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산 주식회사</h3>
              </div>
              <p className="text-sm mt-1 text-gray-500">쌀 · 김치 · 계란 · 종합유통</p>
            </div>
            <div className="text-sm space-y-1">
              <p>대표전화: 1566-1521</p>
              <p>팩스: 032-330-4428</p>
              <p>이메일: ljsgn5958@gmail.com</p>
              <p className="text-xs text-gray-500">인천광역시 부평구 항동로139번길 39, 1층 물류창고</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>&copy; 2026 지구농산 (주). All rights reserved.</span>
            <div className="flex gap-4">
              <a href="/delivery/incheon" className="hover:text-gray-300 transition-colors">인천 납품</a>
              <a href="/delivery/gyeonggi" className="hover:text-gray-300 transition-colors">경기 납품</a>
              <a href="/delivery/seoul" className="hover:text-gray-300 transition-colors">서울 납품</a>
              <a href="/privacy" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
