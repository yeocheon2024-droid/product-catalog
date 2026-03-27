'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchProducts, getImageUrl, formatPrice, Product } from '@/lib/supabase';

const CATEGORY_ICONS: Record<string, string> = {
  '농산품': '', '수산품': '', '축산품': '', '공산품': '',
};

const ITEMS_PER_PAGE = 30;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allMinorCategories, setAllMinorCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const catScrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = useCallback(() => {
    const el = catScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = catScrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [allMinorCategories, updateScrollButtons]);

  function scrollCategories(direction: 'left' | 'right') {
    const el = catScrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  useEffect(() => {
    loadProducts();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('price') === 'on') setShowPrice(true);
    }
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    const minors = new Set(data.map(p => p.minor_name).filter(Boolean));
    const PRIORITY_ORDER = ['쌀', '김치/반찬', '계란', '기름/분말'];
    const sorted = Array.from(minors).sort((a, b) => {
      const aIdx = PRIORITY_ORDER.indexOf(a);
      const bIdx = PRIORITY_ORDER.indexOf(b);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      const aCount = data.filter(p => p.minor_name === a).length;
      const bCount = data.filter(p => p.minor_name === b).length;
      return bCount - aCount;
    });
    setAllMinorCategories(sorted);
    setLoading(false);
  }

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === '전체' || p.minor_name === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  }).sort((a, b) => {
    if (activeCategory !== '전체') {
      // 카테고리 선택 시 가격 오름차순 (싼 것부터)
      const aPrice = a.sell || Number.MAX_SAFE_INTEGER;
      const bPrice = b.sell || Number.MAX_SAFE_INTEGER;
      return aPrice - bPrice;
    }
    const PRIORITY_ORDER = ['쌀', '김치/반찬', '계란', '기름/분말'];
    const aIdx = PRIORITY_ORDER.indexOf(a.minor_name);
    const bIdx = PRIORITY_ORDER.indexOf(b.minor_name);
    const aOrder = aIdx !== -1 ? aIdx : 100 - products.filter(p => p.minor_name === a.minor_name).length;
    const bOrder = bIdx !== -1 ? bIdx : 100 - products.filter(p => p.minor_name === b.minor_name).length;
    return aOrder - bOrder;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  function handleCategoryChange(cat: string, e?: React.MouseEvent<HTMLButtonElement>) {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
    setMenuOpen(false);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function handleSearch(value: string) {
    setSearch(value);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 상단 네비게이션 ===== */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="지구농산" className="h-11 w-11" />
            <span className="text-2xl font-extrabold text-amber-900 tracking-wide" style={{ fontFamily: "'EBSHunminjeongeum', 'Jua', sans-serif" }}>지구농산</span>
          </a>
          {/* PC 메뉴 */}
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-sm font-bold text-amber-700 border-b-2 border-amber-600 pb-1">제품소개</span>
            <a href="/order" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">발주하기</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors">문의하기</a>
          </nav>
          {/* 모바일 햄버거 */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <span className="block px-6 py-3 text-sm font-bold text-amber-700 bg-amber-50">제품소개</span>
            <a href="/order" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">발주하기</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">문의하기</a>
          </div>
        )}
      </header>

      {/* ===== 브레드크럼 + 타이틀 ===== */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="text-xs text-gray-400 mb-4">
          <span>홈</span> &gt; <span>제품소개</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900">제품소개</h1>
      </div>

      {/* ===== 카테고리 필터 바 (빙그레 스타일) ===== */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* 왼쪽 화살표 */}
          {canScrollLeft && (
            <button
              onClick={() => scrollCategories('left')}
              className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 items-center justify-center w-10 bg-gradient-to-r from-white via-white to-transparent"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
          )}
          <div
            ref={catScrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
          >
            {/* 전체 메뉴 아이콘 */}
            <button
              onClick={(e) => handleCategoryChange('전체', e)}
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 mr-2 transition-all ${activeCategory === '전체' ? 'border-amber-600 text-amber-700' : 'border-gray-300 text-gray-400 hover:border-gray-500'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            {allMinorCategories.map(cat => (
              <button
                key={cat}
                onClick={(e) => handleCategoryChange(cat, e)}
                className={`shrink-0 px-5 py-3 text-sm whitespace-nowrap transition-all border-b-3 ${activeCategory === cat ? 'cat-tab-active' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* 오른쪽 화살표 */}
          {canScrollRight && (
            <button
              onClick={() => scrollCategories('right')}
              className="hidden md:flex absolute right-0 top-0 bottom-0 z-10 items-center justify-center w-10 bg-gradient-to-l from-white via-white to-transparent"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* ===== 검색바 ===== */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              type="text"
              placeholder="품목명으로 검색"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {search && (
              <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            )}
          </div>
          <span className="text-sm text-gray-400">{filtered.length}개 품목</span>
        </div>
      </div>

      {/* ===== 로딩 ===== */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-gray-200 border-t-red-600 rounded-full" />
        </div>
      )}

      {/* ===== 품목 그리드 (빙그레 스타일: 4열, 큰 이미지, 하단 품목명) ===== */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product, idx) => (
              <div key={product.code} ref={idx === visible.length - 1 ? lastItemRef : undefined}>
                <ProductCard product={product} showPrice={showPrice} onClick={() => setSelectedProduct(product)} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-10">
              <div className="animate-spin w-6 h-6 border-2 border-gray-200 border-t-red-600 rounded-full" />
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* ===== 푸터 ===== */}
      <footer className="bg-gray-900 text-gray-400 no-print">
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

      {/* ===== 상세 모달 (빙그레 스타일: 좌 이미지 + 우 정보) ===== */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} showPrice={showPrice} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

function ProductCard({ product, showPrice, onClick }: { product: Product; showPrice: boolean; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageUrl = getImageUrl(product);
  const icon = '';

  return (
    <div onClick={onClick} className="product-card cursor-pointer group">
      {/* 이미지 영역 */}
      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center relative border border-gray-100">
        {imageUrl && !imgError ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`card-img w-full h-full object-contain p-4 ${imgLoaded ? 'img-fade' : 'opacity-0'}`}
            />
          </>
        ) : (
          <img src="/logo.png" alt="" className="w-16 h-16 opacity-20" />
        )}
      </div>
      {/* 품목명 (빙그레 스타일: 이미지 아래 중앙 정렬) */}
      <div className="mt-3 text-center px-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{product.name}</h3>
        {product.spec && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{product.spec}</p>
        )}
        {showPrice && product.sell > 0 && (
          <p className="text-sm font-bold text-amber-700 mt-1">{formatPrice(product.sell)}</p>
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, showPrice, onClose }: { product: Product; showPrice: boolean; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(product);
  const icon = '';

  let supplyPrice = 0;
  let vat = 0;
  if (product.sell > 0 && product.tax === '과세') {
    supplyPrice = Math.round(product.sell / 1.1);
    vat = product.sell - supplyPrice;
  } else {
    supplyPrice = product.sell;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* 닫기 */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="md:flex">
          {/* 좌: 이미지 (빙그레 스타일) */}
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 aspect-square md:aspect-auto">
            {imageUrl && !imgError ? (
              <img src={imageUrl} alt={product.name} onError={() => setImgError(true)} className="max-w-full max-h-80 object-contain" />
            ) : (
              <img src="/logo.png" alt="" className="w-24 h-24 opacity-20" />
            )}
          </div>

          {/* 우: 정보 (빙그레 스타일) */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex gap-2 mb-3">
              {product.major_name && <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">{product.major_name}</span>}
              {product.minor_name && <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">{product.minor_name}</span>}
            </div>

            <h2 className="text-2xl font-black text-gray-900">{product.name}</h2>

            {/* 규격 태그 (빙그레 용량 스타일) */}
            {product.spec && (
              <div className="mt-3">
                <span className="text-xs text-gray-400">규격</span>
                <span className="ml-3 inline-block px-4 py-1.5 border-2 border-amber-600 text-amber-600 rounded-full text-sm font-bold">{product.spec}</span>
              </div>
            )}

            {/* 상세 테이블 */}
            <div className="mt-6 border-t border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  <DetailRow label="단위" value={product.unit} />
                  <DetailRow label="과세구분" value={product.tax} />
                </tbody>
              </table>
            </div>

            {/* 가격 */}
            {showPrice && product.sell > 0 && (
              <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">판매단가</span>
                  <span className="text-xl font-black text-amber-700">{formatPrice(product.sell)}</span>
                </div>
                {product.tax === '과세' && (
                  <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between"><span>공급가액</span><span>{supplyPrice.toLocaleString()}원</span></div>
                    <div className="flex justify-between"><span>부가세</span><span>{vat.toLocaleString()}원</span></div>
                  </div>
                )}
              </div>
            )}

            {/* 문의 버튼 */}
            <a href="tel:1566-1521" className="mt-6 w-full flex items-center justify-center gap-2 bg-amber-700 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 text-gray-400 w-24">{label}</td>
      <td className="py-3 text-gray-900 font-medium">{value}</td>
    </tr>
  );
}
