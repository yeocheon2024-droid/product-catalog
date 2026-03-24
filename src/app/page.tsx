'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, getImageUrl, getMajorCategories, formatPrice, Product } from '@/lib/supabase';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setCategories(getMajorCategories(data));
    setLoading(false);
  }

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === '전체' || p.major_name === activeCategory;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      (p.spec || '').toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* 검색바 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="품목명, 품목코드, 규격으로 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-brand-200 bg-white
                     focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent
                     text-sm placeholder:text-gray-400"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('전체')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${activeCategory === '전체'
              ? 'bg-brand-400 text-white shadow-md'
              : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
            }`}
        >
          전체 ({products.length})
        </button>
        {categories.map(cat => {
          const count = products.filter(p => p.major_name === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === cat
                  ? 'bg-brand-400 text-white shadow-md'
                  : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
                }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* 품목 수 */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length}개 품목
      </p>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-brand-300 border-t-brand-500 rounded-full" />
        </div>
      )}

      {/* 상품 그리드 */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(product => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(product);

  return (
    <a
      href={`/m/?code=${product.code}`}
      className="product-card bg-white rounded-xl overflow-hidden border border-brand-100 block"
    >
      {/* 이미지 */}
      <div className="aspect-square bg-brand-50 flex items-center justify-center overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="text-4xl text-brand-200">📦</div>
        )}
      </div>

      {/* 정보 */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        {product.spec && (
          <p className="text-xs text-gray-400 mt-1 truncate">{product.spec}</p>
        )}
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-base font-bold text-brand-500">
            {formatPrice(product.sell)}
          </span>
          {product.tax === '과세' && (
            <span className="text-[10px] text-gray-400">(VAT포함)</span>
          )}
        </div>
        {product.minor_name && (
          <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
            {product.minor_name}
          </span>
        )}
      </div>
    </a>
  );
}
