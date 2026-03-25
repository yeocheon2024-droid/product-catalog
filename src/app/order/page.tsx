'use client';

import { useState } from 'react';

export default function OrderPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 상단 네비게이션 ===== */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="지구농산" className="h-11 w-11" />
            <span className="text-2xl font-extrabold text-amber-900 tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">제품소개</a>
            <span className="text-sm font-bold text-amber-700 border-b-2 border-amber-600 pb-1">발주하기</span>
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
            <a href="/#about" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">회사소개</a>
            <a href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">제품소개</a>
            <span className="block px-6 py-3 text-sm font-bold text-amber-700 bg-amber-50">발주하기</span>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">문의하기</a>
          </div>
        )}
      </header>

      {/* ===== 히어로 섹션 (로고 + 앱 스크린샷) ===== */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* 좌: 텍스트 + 버튼 */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                <img src="/baljugo_logo_cube_01.webp" alt="발주고" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg" />
                <div>
                  <p className="text-xs text-amber-600 font-semibold tracking-wider uppercase">NO.1 수발주 앱</p>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">발주고</h2>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                스마트폰으로 간편하게<br />
                <span className="text-amber-700">발주하세요</span>
              </h1>
              <p className="mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
                지구농산은 <strong className="text-gray-700">발주고</strong> 앱을 통해 발주 서비스를 제공합니다.<br />
                누적 다운로드 <strong className="text-amber-700">30만 돌파!</strong> 언제 어디서나 식자재를 주문하세요.
              </p>

              {/* 앱 다운로드 버튼 */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=kr.co.Comware.FranzMOMS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-7 py-3.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none">GET IT ON</p>
                    <p className="text-base font-bold leading-tight">Google Play</p>
                  </div>
                </a>
                <a
                  href="https://apps.apple.com/kr/app/%EB%B0%9C%EC%A3%BC%EA%B3%A0/id1290635647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-7 py-3.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
                    <p className="text-base font-bold leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* 우: 앱 스크린샷 */}
            <div className="flex-shrink-0 relative">
              <div className="relative w-64 md:w-80">
                <img
                  src="/main-image-01.webp"
                  alt="발주고 앱 화면"
                  className="w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 발주고 소개 섹션 ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <img src="/baljugo_logo_cube_01.webp" alt="발주고" className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">발주고란?</h2>
          <p className="mt-3 text-gray-500">NO.1 수발주 프로그램으로 식자재 주문을 혁신합니다</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>}
            title="스마트폰 간편 발주"
            description="앱에서 품목을 선택하고 수량만 입력하면 발주 완료. 언제 어디서나 주문할 수 있습니다."
          />
          <FeatureCard
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>}
            title="주문 내역 관리"
            description="발주 내역을 한눈에 확인하고, 이전 주문을 재발주할 수 있어 반복 주문이 편리합니다."
          />
          <FeatureCard
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>}
            title="투명한 거래 관리"
            description="단가, 결제 내역을 실시간으로 확인할 수 있어 정확하고 투명한 거래가 가능합니다."
          />
        </div>
      </section>

      {/* ===== 이용 방법 섹션 ===== */}
      <section className="bg-amber-50/50 border-t border-amber-100">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12">이용 방법</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StepCard step="1" title="앱 설치" description="구글 플레이스토어 또는 앱스토어에서 '발주고' 검색 후 설치" />
            <StepCard step="2" title="거래처 등록" description="지구농산에 전화 문의하여 거래처 등록 요청" />
            <StepCard step="3" title="품목 확인" description="등록된 품목과 단가를 앱에서 확인" />
            <StepCard step="4" title="발주 시작" description="필요한 품목을 선택하고 수량 입력 후 발주" />
          </div>
        </div>
      </section>

      {/* ===== CTA 섹션 ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <img src="/baljugo_logo_cube_01.webp" alt="발주고" className="w-16 h-16 mx-auto mb-6 drop-shadow-lg" />
          <h2 className="text-2xl md:text-3xl font-black text-white">지금 바로 시작하세요</h2>
          <p className="mt-3 text-amber-100">앱 설치 후 전화 한 통이면 발주 준비 완료!</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=kr.co.Comware.FranzMOMS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
              </svg>
              <span className="font-bold">Google Play</span>
            </a>
            <a
              href="https://apps.apple.com/kr/app/%EB%B0%9C%EC%A3%BC%EA%B3%A0/id1290635647"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-bold">App Store</span>
            </a>
          </div>

          <div className="mt-8">
            <a href="tel:1566-1521" className="inline-flex items-center gap-2 text-white font-bold hover:text-amber-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              1566-1521 전화 문의
            </a>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-lg">
        {step}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
