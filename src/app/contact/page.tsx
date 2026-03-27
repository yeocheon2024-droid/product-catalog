'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const KAKAO_CHANNEL_ID = '_xnQgVX';

const PRODUCT_CATEGORIES = ['쌀/잡곡', '계란', '김치/반찬', '식용유', '기타'];

const DELIVERY_REGIONS = [
  { label: '인천 부평구', value: '인천 부평구' },
  { label: '인천 계양구', value: '인천 계양구' },
  { label: '인천 서구', value: '인천 서구' },
  { label: '인천 남동구', value: '인천 남동구' },
  { label: '인천 미추홀구', value: '인천 미추홀구' },
  { label: '인천 연수구', value: '인천 연수구' },
  { label: '인천 중구', value: '인천 중구' },
  { label: '인천 동구', value: '인천 동구' },
  { label: '경기 부천시', value: '경기 부천시' },
  { label: '경기 시흥시', value: '경기 시흥시' },
  { label: '경기 안산시', value: '경기 안산시' },
  { label: '경기 광명시', value: '경기 광명시' },
  { label: '경기 안양시', value: '경기 안양시' },
  { label: '서울 강서구', value: '서울 강서구' },
  { label: '서울 금천구', value: '서울 금천구' },
  { label: '서울 영등포구', value: '서울 영등포구' },
  { label: '기타 (직접 입력)', value: '기타' },
];

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

const STRENGTHS = [
  { title: '당일 새벽·오전 배송', desc: '전날 오후 4시까지 주문 시 다음날 새벽 또는 오전 배송' },
  { title: '즉시 반품·회수', desc: '문제 발생 시 담당자가 직접 회수, 교환·환불 신속 처리' },
  { title: '전담 담당자 배정', desc: '거래처별 전담 영업 담당자가 밀착 관리' },
  { title: '검증된 납품 이력', desc: '프랜차이즈, 병원, 단체급식 등 다양한 업종에 장기 납품' },
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    business_number: '',
    contact: '',
    delivery_area: '',
    delivery_area_other: '',
    products: [] as string[],
    weekly_quantity: '',
    preferred_days: '',
    memo: '',
  });
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product],
    }));
  };

  // 사업자번호 검증 (국세청 API) — 방문자에게는 결과 미노출
  const verifyBusinessNumber = async (bizNo: string): Promise<string> => {
    const cleaned = bizNo.replace(/[^0-9]/g, '');
    if (cleaned.length !== 10) return '조회불가(형식오류)';

    try {
      const res = await fetch(
        'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=' +
          encodeURIComponent(process.env.NEXT_PUBLIC_NTS_API_KEY || ''),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ b_no: [cleaned] }),
        }
      );
      const json = await res.json();
      const status = json?.data?.[0]?.b_stt_cd;
      if (status === '01') return '사업자 정상';
      if (status === '02') return '사업자 휴업';
      if (status === '03') return '사업자 폐업';
      return '조회불가';
    } catch {
      return '조회실패';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.company_name || !formData.contact || !formData.delivery_area) {
      setError('상호명, 연락처, 배송 지역은 필수 입력입니다.');
      return;
    }
    if (!privacyAgreed) {
      setError('개인정보 수집·이용에 동의해 주세요.');
      return;
    }

    setSubmitting(true);

    const area = formData.delivery_area === '기타'
      ? formData.delivery_area_other || '기타'
      : formData.delivery_area;

    // 사업자번호 검증 (입력된 경우만)
    let bizStatus = '';
    const cleanedBizNo = formData.business_number.replace(/[^0-9]/g, '');
    if (cleanedBizNo.length > 0) {
      bizStatus = await verifyBusinessNumber(formData.business_number);
    }

    const inquiry = {
      company_name: formData.company_name,
      business_number: cleanedBizNo || null,
      business_status: bizStatus || null,
      contact: formData.contact,
      delivery_area: area,
      products: formData.products,
      weekly_quantity: formData.weekly_quantity,
      preferred_days: formData.preferred_days,
      memo: formData.memo,
      created_at: new Date().toISOString(),
    };

    try {
      if (supabase) {
        const { error: dbError } = await supabase
          .from('inquiries')
          .insert([inquiry]);
        if (dbError) throw dbError;
      }

      // 카카오 채널 채팅으로 알림 전달 (사업자 검증 결과 포함)
      const bizLine = bizStatus
        ? `사업자: ${formData.business_number} (${bizStatus})`
        : '';
      const message = [
        `[새 견적 요청]`,
        `상호: ${inquiry.company_name}`,
        bizLine,
        `연락처: ${inquiry.contact}`,
        `지역: ${inquiry.delivery_area}`,
        formData.products.length > 0 ? `관심품목: ${formData.products.join(', ')}` : '',
        inquiry.weekly_quantity ? `주간수량: ${inquiry.weekly_quantity}` : '',
        inquiry.preferred_days ? `배송요일: ${inquiry.preferred_days}` : '',
        inquiry.memo ? `요청사항: ${inquiry.memo}` : '',
      ].filter(Boolean).join('\n');

      window.open(
        `https://pf.kakao.com/${KAKAO_CHANNEL_ID}/chat?msg=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );

      setSubmitted(true);
    } catch (err: any) {
      setError('전송에 실패했습니다. 대표번호로 문의해 주세요.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* ===== 대표번호 ===== */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">문의하기</h1>
        <div className="mt-6 border border-gray-200 rounded-xl p-6">
          <p className="text-xs text-gray-400 mb-1">대표전화</p>
          <a href="tel:1566-1521" className="text-3xl font-black text-gray-900 hover:text-amber-700 transition-colors">
            1566-1521
          </a>
          <p className="mt-2 text-xs text-gray-400">평일 운영 (토·일·공휴일 휴무)</p>
          <a href="tel:1566-1521" className="mt-4 inline-flex items-center gap-2 bg-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            전화하기
          </a>
        </div>
      </div>

      {/* ===== 견적 요청 폼 ===== */}
      <section className="border-t border-gray-100 bg-amber-50/40">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-1">견적 요청</h2>
          <p className="text-sm text-gray-500 mb-8">아래 정보를 입력해 주시면 빠르게 견적을 안내드리겠습니다.</p>

          {submitted ? (
            <div className="border border-green-200 bg-green-50 rounded-xl p-8 text-center">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg font-bold text-gray-900">견적 요청이 접수되었습니다</p>
              <p className="mt-2 text-sm text-gray-500">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ company_name: '', business_number: '', contact: '', delivery_area: '', delivery_area_other: '', products: [], weekly_quantity: '', preferred_days: '', memo: '' }); }}
                className="mt-6 text-sm text-amber-700 font-medium hover:underline"
              >
                새 견적 요청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>
              )}

              {/* 상호명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">상호명 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={e => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="업체명을 입력해 주세요"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* 사업자번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">사업자번호</label>
                <input
                  type="text"
                  value={formData.business_number}
                  onChange={e => setFormData(prev => ({ ...prev, business_number: e.target.value }))}
                  placeholder="000-00-00000"
                  maxLength={12}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="010-0000-0000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* 배송 지역 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">배송 지역 <span className="text-red-500">*</span></label>
                <select
                  value={formData.delivery_area}
                  onChange={e => setFormData(prev => ({ ...prev, delivery_area: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="">지역을 선택해 주세요</option>
                  {DELIVERY_REGIONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                {formData.delivery_area === '기타' && (
                  <input
                    type="text"
                    value={formData.delivery_area_other}
                    onChange={e => setFormData(prev => ({ ...prev, delivery_area_other: e.target.value }))}
                    placeholder="배송 지역을 직접 입력해 주세요"
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* 관심 품목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2.5">관심 품목</label>
                <div className="flex flex-wrap gap-2.5">
                  {PRODUCT_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleProductToggle(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        formData.products.includes(cat)
                          ? 'bg-amber-700 text-white border-amber-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 주간 예상 수량 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">주간 예상 수량</label>
                <input
                  type="text"
                  value={formData.weekly_quantity}
                  onChange={e => setFormData(prev => ({ ...prev, weekly_quantity: e.target.value }))}
                  placeholder="예) 쌀 20kg 10포, 계란 30판 등"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* 배송 희망 요일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">배송 희망 요일</label>
                <input
                  type="text"
                  value={formData.preferred_days}
                  onChange={e => setFormData(prev => ({ ...prev, preferred_days: e.target.value }))}
                  placeholder="예) 월, 수, 금"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* 추가 요청사항 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">추가 요청사항 <span className="text-gray-400 font-normal">(선택)</span></label>
                <textarea
                  value={formData.memo}
                  onChange={e => setFormData(prev => ({ ...prev, memo: e.target.value }))}
                  placeholder="기타 요청사항을 입력해 주세요"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              {/* 개인정보 수집·이용 동의 */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-xs text-gray-500 mb-3 leading-relaxed">
                  <p className="font-medium text-gray-700 mb-1">[개인정보 수집·이용 동의]</p>
                  <p>· 수집 항목: 상호명, 사업자번호, 연락처</p>
                  <p>· 수집 목적: 견적 요청 접수 및 상담 연락</p>
                  <p>· 보관 기간: 수집일로부터 1년 (이후 파기)</p>
                  <p className="mt-1">
                    자세한 내용은{' '}
                    <a href="/privacy" className="text-amber-700 underline hover:text-amber-800" target="_blank">개인정보처리방침</a>
                    을 확인해 주세요.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={e => setPrivacyAgreed(e.target.checked)}
                    className="w-4 h-4 accent-amber-700"
                  />
                  <span className="text-sm font-medium text-gray-700">개인정보 수집·이용에 동의합니다 <span className="text-red-500">*</span></span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !privacyAgreed}
                className="w-full bg-amber-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? '전송 중...' : '견적 요청하기'}
              </button>
              <p className="text-xs text-gray-400 text-center">접수 후 영업일 기준 1일 이내 담당자가 연락드립니다.</p>
            </form>
          )}
        </div>
      </section>

      {/* ===== 소개 ===== */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="text-sm text-amber-700 font-medium">거래처의 요구를 먼저 생각하는</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-1">신뢰 기반 식자재 유통 파트너</h2>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            쌀, 잡곡, 계란, 김치, 반찬, 기름 등 다양한 식자재를 프랜차이즈 식당, 병원, 급식시설에 안정적으로 공급해온 전문 유통 기업입니다.
            빠른 배송과 책임감 있는 사후관리로 오랜 시간 신뢰를 쌓아왔습니다.
          </p>
        </div>
      </section>

      {/* ===== 핵심 강점 ===== */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">핵심 강점</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {STRENGTHS.map(item => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 배송 안내 ===== */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-2">배송 안내</h2>
          <p className="text-sm text-gray-900 font-medium">전날 오후 4시까지 주문 마감 → 다음날 새벽·오전 배송</p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            급식, 식당, 병원 등 이른 시간 운영이 필요한 거래처를 위해 최적화된 배송 시스템을 운영합니다.
            당일 긴급 발주가 필요한 경우에도 담당자에게 직접 연락하시면 최선을 다해 지원해드립니다.
          </p>

          <h3 className="text-sm font-bold text-gray-900 mt-8 mb-3">평일 배송 가능 지역</h3>
          <div className="space-y-4">
            {DELIVERY_AREAS.map(group => (
              <div key={group.region}>
                <p className="text-xs font-bold text-amber-800 mb-2">{group.region}</p>
                <div className="flex flex-wrap gap-2">
                  {group.areas.map(area => (
                    <span key={area} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400">상기 지역 외 배송은 대표번호로 문의해 주세요. 평일 운영 (토·일·공휴일 휴무)</p>
        </div>
      </section>

      {/* ===== 고객 약속 ===== */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">고객 약속</h2>
          <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <li className="flex gap-2"><span className="text-amber-700 shrink-0">·</span>거래처의 모든 요청 사항을 담당자가 직접 확인하고 최대한 반영합니다.</li>
            <li className="flex gap-2"><span className="text-amber-700 shrink-0">·</span>품질 문제가 발생하면 즉시 회수 후 교환 또는 환불로 처리합니다.</li>
            <li className="flex gap-2"><span className="text-amber-700 shrink-0">·</span>정해진 시간에 정량을 정확하게 납품하는 것을 원칙으로 합니다.</li>
            <li className="flex gap-2"><span className="text-amber-700 shrink-0">·</span>장기 거래처일수록 더 세심하게 관리합니다.</li>
          </ul>
        </div>
      </section>

      {/* ===== 회사 정보 ===== */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">회사 정보</h2>
          <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <div>
              <p className="text-gray-400">주소</p>
              <p className="text-gray-700 mt-0.5">인천광역시 부평구 일신동 79-25</p>
            </div>
            <div>
              <p className="text-gray-400">대표전화</p>
              <a href="tel:1566-1521" className="text-gray-700 mt-0.5 hover:text-amber-700">1566-1521</a>
            </div>
            <div>
              <p className="text-gray-400">이메일</p>
              <a href="mailto:ljsgn5958@gmail.com" className="text-gray-700 mt-0.5 hover:text-amber-700">ljsgn5958@gmail.com</a>
            </div>
            <div>
              <p className="text-gray-400">팩스</p>
              <p className="text-gray-700 mt-0.5">032-330-4428</p>
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
