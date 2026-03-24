'use client';

import { useState } from 'react';

const DELIVERY_AREAS = [
  {
    region: '인천',
    areas: ['부평구', '계양구', '서구', '남동구', '미추홀구', '연수구', '중구', '동구'],
  },
  {
    region: '경기',
    areas: ['부천시', '시흥시', '안산시', '광명시', '안양시'],
  },
  {
    region: '서울',
    areas: ['강서구', '금천구', '영등포구', '여의도(영등포구)'],
  },
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 상단 네비게이션 ===== */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="지구농산" className="h-9 w-9" />
            <span className="text-xl text-amber-900 tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#about" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">회사소개</a>
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">제품소개</a>
            <a href="/order" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">발주하기</a>
            <span className="text-sm font-bold text-amber-700 border-b-2 border-amber-600 pb-1">문의하기</span>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <a href="/#about" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">회사소개</a>
            <a href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">제품소개</a>
            <a href="/order" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">발주하기</a>
            <span className="block px-6 py-3 text-sm font-bold text-amber-700 bg-amber-50">문의하기</span>
          </div>
        )}
      </header>

      {/* ===== 타이틀 ===== */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900">문의하기</h1>
        <p className="mt-2 text-gray-500">전화 한 통이면 신선한 식자재를 당일 배송해드립니다.</p>
      </div>

      {/* ===== 대표번호 CTA ===== */}
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <p className="text-sm text-amber-800 font-medium mb-1">대표전화</p>
          <a href="tel:1566-1521" className="text-4xl md:text-5xl font-black text-amber-900 hover:text-amber-700 transition-colors">
            1566-1521
          </a>
          <p className="mt-3 text-sm text-gray-500">평일 · 토요일 새벽배송 운영</p>
          <a href="tel:1566-1521" className="mt-6 inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            전화 문의하기
          </a>
        </div>
      </div>

      {/* ===== 당일배송 가능 지역 ===== */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">당일배송 가능 지역</h2>
            <p className="mt-2 text-gray-500">아래 지역은 당일 주문·당일 배송이 가능합니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DELIVERY_AREAS.map(group => (
              <div key={group.region} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-black text-amber-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm">{group.region === '인천' ? '🏭' : group.region === '경기' ? '🏙' : '🌆'}</span>
                  {group.region}
                </h3>
                <ul className="space-y-2">
                  {group.areas.map(area => (
                    <li key={area} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            위 지역 외 배송 문의는 대표번호로 연락 부탁드립니다.
          </p>
        </div>
      </section>

      {/* ===== 회사 정보 ===== */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">회사 정보</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <div>
              <p className="text-gray-400">주소</p>
              <p className="text-gray-900 font-medium">인천광역시 부평구 일신동 79-25</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <div>
              <p className="text-gray-400">대표전화</p>
              <a href="tel:1566-1521" className="text-gray-900 font-medium hover:text-amber-700">1566-1521</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <div>
              <p className="text-gray-400">이메일</p>
              <a href="mailto:ljsgn5958@gmail.com" className="text-gray-900 font-medium hover:text-amber-700">ljsgn5958@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <div>
              <p className="text-gray-400">팩스</p>
              <p className="text-gray-900 font-medium">032-330-4428</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 푸터 ===== */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="지구농산" className="h-8 w-8 brightness-0 invert opacity-80" />
                <h3 className="text-white text-lg tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산 농업회사법인</h3>
              </div>
              <p className="text-sm mt-1 text-gray-500">쌀 · 김치 · 계란 · 종합유통</p>
              <p className="text-sm mt-1">신선한 식자재를 공급합니다.</p>
            </div>
            <div className="text-sm space-y-1">
              <p>대표전화: 1566-1521</p>
              <p>팩스: 032-330-4428</p>
              <p>이메일: ljsgn5958@gmail.com</p>
              <p className="text-xs text-gray-500">인천광역시 부평구 일신동 79-25</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500">
            &copy; 2026 지구농산 (주). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
