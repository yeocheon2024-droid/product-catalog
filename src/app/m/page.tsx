'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { fetchProductByCode, getImageUrl, formatPrice, Product } from '@/lib/supabase';

function ProductDetail() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (code) {
      loadProduct(code);
    } else {
      setLoading(false);
    }
  }, [code]);

  async function loadProduct(productCode: string) {
    setLoading(true);
    const data = await fetchProductByCode(productCode);
    setProduct(data);
    setLoading(false);
  }

  async function generateQR() {
    try {
      const QRCode = (await import('qrcode')).default;
      const url = window.location.href;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: { dark: '#34261A', light: '#FFFFFF' },
      });
      setQrDataUrl(dataUrl);
      setShowQR(true);
    } catch {
      alert('QR 코드 생성 실패');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-brand-300 border-t-brand-500 rounded-full" />
      </div>
    );
  }

  if (!code || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">품목을 찾을 수 없습니다.</p>
        <a href="/" className="text-brand-500 mt-4 inline-block hover:underline">← 목록으로</a>
      </div>
    );
  }

  const imageUrl = getImageUrl(product);

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
    <div className="max-w-lg mx-auto">
      <a href="/" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-700 mb-4 no-print">
        ← 목록으로
      </a>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-100">
        {/* 이미지 */}
        <div className="aspect-square bg-brand-50 flex items-center justify-center">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div className="text-6xl text-brand-200">📦</div>
          )}
        </div>

        <div className="p-5">
          {/* 카테고리 */}
          <div className="flex gap-2 mb-2">
            {product.major_name && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-100 text-brand-600">
                {product.major_name}
              </span>
            )}
            {product.minor_name && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-500 border border-brand-100">
                {product.minor_name}
              </span>
            )}
          </div>

          <h1 className="text-xl font-bold text-gray-900 mt-2">{product.name}</h1>
          {product.spec && (
            <p className="text-sm text-gray-500 mt-1">{product.spec}</p>
          )}

          {/* 가격 */}
          <div className="mt-4 p-4 bg-brand-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">판매단가</span>
              <span className="text-2xl font-bold text-brand-500">
                {formatPrice(product.sell)}
              </span>
            </div>
            {product.tax === '과세' && product.sell > 0 && (
              <div className="mt-2 pt-2 border-t border-brand-100 text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>공급가액</span>
                  <span>{supplyPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>부가세</span>
                  <span>{vat.toLocaleString()}원</span>
                </div>
              </div>
            )}
            <div className="mt-2 text-right">
              <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {product.tax === '과세' ? 'VAT 포함' : '면세'}
              </span>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="mt-4 space-y-2 text-sm">
            <InfoRow label="품목코드" value={product.code} />
            <InfoRow label="단위" value={product.unit} />
            <InfoRow label="매입처" value={product.vendor_name} />
          </div>

          {/* QR 버튼 */}
          <div className="mt-6 no-print">
            <button
              onClick={generateQR}
              className="w-full py-3 bg-brand-400 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors text-sm"
            >
              QR 코드 생성
            </button>
          </div>
        </div>
      </div>

      {/* QR 모달 */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print"
             onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full mx-4 text-center"
               onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-xs text-gray-400 mb-4">{product.code}</p>
            {qrDataUrl && (
              <img src={qrDataUrl} alt="QR Code" className="mx-auto w-48 h-48" />
            )}
            <p className="text-xs text-gray-400 mt-3 break-all">
              {typeof window !== 'undefined' ? window.location.href : ''}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={qrDataUrl}
                download={`QR_${product.code}.png`}
                className="flex-1 py-2 bg-brand-400 text-white rounded-lg text-sm font-medium hover:bg-brand-500"
              >
                다운로드
              </a>
              <button
                onClick={() => setShowQR(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-2 border-b border-gray-50">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-brand-300 border-t-brand-500 rounded-full" />
      </div>
    }>
      <ProductDetail />
    </Suspense>
  );
}
