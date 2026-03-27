'use client';

import { useState } from 'react';

export default function PrivacyPage() {
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

      {/* ===== 본문 ===== */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-gray-400">시행일: 2026년 3월 27일</p>

        <div className="mt-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. 개인정보의 수집 및 이용 목적</h2>
            <p>지구농산 농업회사법인(이하 &quot;회사&quot;)은 다음 목적을 위해 개인정보를 수집·이용합니다.</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc text-gray-600">
              <li>견적 요청 접수 및 상담 연락</li>
              <li>거래처 사업자 등록 상태 확인</li>
              <li>서비스 품질 향상 및 민원 처리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. 수집하는 개인정보 항목</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">구분</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b text-gray-600">필수</td>
                    <td className="px-4 py-2 border-b text-gray-600">상호명, 연락처</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600">선택</td>
                    <td className="px-4 py-2 text-gray-600">사업자번호, 배송 지역, 관심 품목, 주간 예상 수량, 배송 희망 요일, 추가 요청사항</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. 개인정보의 보유 및 이용 기간</h2>
            <p>수집된 개인정보는 <strong>수집일로부터 1년간</strong> 보유하며, 보유 기간 경과 후 지체 없이 파기합니다. 단, 관련 법령에 의한 보존 의무가 있는 경우 해당 기간 동안 보관합니다.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. 개인정보의 제3자 제공</h2>
            <p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc text-gray-600">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. 개인정보의 파기 절차 및 방법</h2>
            <p>보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 다음과 같이 파기합니다.</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc text-gray-600">
              <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
              <li>종이 문서: 분쇄기로 분쇄 또는 소각</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">6. 정보주체의 권리·의무</h2>
            <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리정지를 요청할 수 있습니다. 아래 연락처로 요청해 주시면 지체 없이 처리하겠습니다.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">7. 개인정보의 안전성 확보 조치</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 다음 조치를 취하고 있습니다.</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc text-gray-600">
              <li>개인정보 접근 권한 제한</li>
              <li>개인정보의 암호화 전송 (SSL/TLS)</li>
              <li>접속기록의 보관 및 위·변조 방지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">8. 개인정보 보호책임자</h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p><strong>담당자:</strong> 지구농산 대표</p>
              <p><strong>전화:</strong> 1566-1521</p>
              <p><strong>이메일:</strong> ljsgn5958@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">9. 개인정보처리방침의 변경</h2>
            <p>이 개인정보처리방침은 2026년 3월 27일부터 적용됩니다. 변경 사항이 있을 경우 웹사이트를 통해 공지합니다.</p>
          </section>

        </div>
      </div>

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
            </div>
            <div className="text-sm space-y-1">
              <p>대표전화: 1566-1521</p>
              <p>팩스: 032-330-4428</p>
              <p>이메일: ljsgn5958@gmail.com</p>
              <p className="text-xs text-gray-500">인천광역시 부평구 일신동 79-25</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>&copy; 2026 지구농산 (주). All rights reserved.</span>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
