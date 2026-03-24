'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { fetchProductByCode, getImageUrl, formatPrice, Product } from '@/lib/supabase';

const CATEGORY_ICONS: Record<string, string> = {
  '농산품': '', '수산품': '', '축산품': '', '공산품': '',
};

function ProductDetail() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const showPrice = searchParams.get('price') === 'on';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (code) loadProduct(code);
    else setLoading(false);
  }, [code]);

  async function loadProduct(productCode: string) {
    setLoading(true);
    const data = await fetchProductByCode(productCode);
    setProduct(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  if (!code || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-lg">품목을 찾을 수 없습니다.</p>
        <a href="/" className="text-gray-900 mt-4 inline-block hover:underline text-sm font-medium">← 전체 품목 보기</a>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            전체 품목
          </a>
          <div className="flex items-center gap-1.5">
            <img src="/logo.png" alt="지구농산" className="h-7 w-7" />
            <span className="text-sm text-amber-900 tracking-wide" style={{ fontFamily: "'Jua', sans-serif" }}>지구농산</span>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* 이미지 */}
        <div className="bg-white">
          <div className="aspect-square flex items-center justify-center">
            {imageUrl && !imgError ? (
              <img
                src={imageUrl}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <img src="/logo.png" alt="" className="w-20 h-20 opacity-20" />
            )}
          </div>
        </div>

        {/* 정보 */}
        <div className="bg-white mt-2 p-5">
          <div className="flex gap-2 mb-2">
            {product.major_name && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{product.major_name}</span>
            )}
            {product.minor_name && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{product.minor_name}</span>
            )}
          </div>

          <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{product.spec}{product.unit ? ` · ${product.unit}` : ''}</p>

          <div className="mt-4 space-y-2.5">
            <DetailRow label="규격" value={product.spec} />
            <DetailRow label="단위" value={product.unit} />
            <DetailRow label="과세구분" value={product.tax} />
          </div>

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

          <div className="mt-5">
            <a
              href="tel:1566-1521"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              전화 문의
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
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full" />
      </div>
    }>
      <ProductDetail />
    </Suspense>
  );
}
