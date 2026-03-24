'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchProducts, getImageUrl, formatPrice, Product } from '@/lib/supabase';

const CATEGORY_ICONS: Record<string, string> = {
  '농산품': '🥬', '수산품': '🐟', '축산품': '🥩', '공산품': '📦',
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
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProducts();
    // URL에 ?price=on 이면 가격 표시
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('price') === 'on') setShowPrice(true);
    }
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    // minor_name 기준 카테고리
    const minors = new Set(data.map(p => p.minor_name).filter(Boolean));
    setAllMinorCategories(Array.from(minors).sort());
    setLoading(false);
  }

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === '전체' || p.minor_name === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // 무한스크롤
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(value: string) {
    setSearch(value);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 tracking-tight">지구농산 (주)</span>
          </div>
          <a href="tel:061-000-0000" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span className="hidden sm:inline">문의하기</span>
          </a>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            신선한 식자재를<br />공급합니다
          </h1>
          <p className="mt-3 text-gray-400 text-sm md:text-base max-w-md">
            농산품 · 수산품 · 축산품 · 공산품<br />
            300여 가지 품목을 취급하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(CATEGORY_ICONS).map(([name, icon]) => {
              const count = products.filter(p => p.major_name === name).length;
              return (
                <div key={name} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-sm">
                  <span className="text-lg">{icon}</span>
                  <span className="text-white/80">{name}</span>
                  <span className="text-white/40 text-xs">{count}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <a href="tel:061-000-0000" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              전화 문의
            </a>
          </div>
        </div>
      </section>

      {/* 검색 + 카테고리 */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          {/* 검색바 */}
          <div className="py-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                type="text"
                placeholder="품목명으로 검색"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          </div>
          {/* 카테고리 탭 */}
          <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('전체')}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === '전체' ? 'cat-tab-active' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              전체 ({products.length})
            </button>
            {allMinorCategories.map(cat => {
              const count = products.filter(p => p.minor_name === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'cat-tab-active' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 품목 수 */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <p className="text-xs text-gray-400">{filtered.length}개 품목</p>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full" />
        </div>
      )}

      {/* 품목 그리드 */}
      {!loading && (
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visible.map((product, idx) => (
              <div
                key={product.code}
                ref={idx === visible.length - 1 ? lastItemRef : undefined}
              >
                <ProductCard
                  product={product}
                  showPrice={showPrice}
                  onClick={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 no-print">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">지구농산 (주)</h3>
              <p className="text-sm mt-1">신선한 식자재를 공급합니다.</p>
            </div>
            <div className="text-sm space-y-1">
              <p>전화: 061-000-0000</p>
              <p>주소: 전라남도 여수시</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500">
            &copy; 2026 지구농산 (주). All rights reserved.
          </div>
        </div>
      </footer>

      {/* 상세 모달 */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          showPrice={showPrice}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function ProductCard({ product, showPrice, onClick }: { product: Product; showPrice: boolean; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageUrl = getImageUrl(product);
  const icon = CATEGORY_ICONS[product.major_name] || '📦';

  return (
    <div
      onClick={onClick}
      className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative">
        {imageUrl && !imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-contain p-3 ${imgLoaded ? 'img-fade' : 'opacity-0'}`}
            />
          </>
        ) : (
          <span className="text-4xl">{icon}</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[2.5em]">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1 truncate">
          {product.spec}{product.unit ? ` · ${product.unit}` : ''}
        </p>
        {showPrice && product.sell > 0 && (
          <p className="text-sm font-bold text-gray-900 mt-1.5">{formatPrice(product.sell)}</p>
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, showPrice, onClose }: { product: Product; showPrice: boolean; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(product);
  const icon = CATEGORY_ICONS[product.major_name] || '📦';

  let supplyPrice = 0;
  let vat = 0;
  if (product.sell > 0) {
    if (product.tax === '과세') {
      supplyPrice = Math.round(product.sell / 1.1);
      vat = product.sell - supplyPrice;
    } else {
      supplyPrice = product.sell;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
      <div
        className="bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* 닫기 핸들 (모바일) */}
        <div className="flex justify-center pt-2 pb-1 md:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 이미지 */}
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <span className="text-6xl">{icon}</span>
          )}
        </div>

        {/* 정보 */}
        <div className="p-5">
          <div className="flex gap-2 mb-2">
            {product.major_name && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{product.major_name}</span>
            )}
            {product.minor_name && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{product.minor_name}</span>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{product.spec}{product.unit ? ` · ${product.unit}` : ''}</p>

          {/* 상세 정보 */}
          <div className="mt-4 space-y-2.5">
            <DetailRow label="품목코드" value={product.code} />
            <DetailRow label="규격" value={product.spec} />
            <DetailRow label="단위" value={product.unit} />
            <DetailRow label="매입처" value={product.vendor_name} />
            <DetailRow label="과세구분" value={product.tax} />
          </div>

          {/* 가격 */}
          {showPrice && product.sell > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">판매단가</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(product.sell)}</span>
              </div>
              {product.tax === '과세' && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between"><span>공급가액</span><span>{supplyPrice.toLocaleString()}원</span></div>
                  <div className="flex justify-between"><span>부가세</span><span>{vat.toLocaleString()}원</span></div>
                </div>
              )}
            </div>
          )}

          {/* 문의 버튼 */}
          <div className="mt-5 flex gap-3">
            <a
              href="tel:061-000-0000"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              전화 문의
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  );
}
