import type { Metadata } from 'next';
import DeliveryPage from '../../components/DeliveryPage';

export const metadata: Metadata = {
  title: '경기 식자재 납품 | 부천·시흥·안산·광명 새벽배송',
  description: '경기도 부천시, 시흥시, 안산시, 광명시, 안양시 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송. 프랜차이즈·병원·급식 납품 전문. 1566-1521',
  keywords: ['경기 식자재', '부천 식자재 납품', '시흥 식자재', '안산 쌀 도매', '광명 계란 도매', '경기 급식 납품', '부천 새벽배송', '안양 식자재'],
  openGraph: {
    title: '경기 식자재 납품 | 지구농산',
    description: '경기 서부 지역 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송.',
    url: 'https://product-catalog-4qg.pages.dev/delivery/gyeonggi',
  },
  alternates: {
    canonical: 'https://product-catalog-4qg.pages.dev/delivery/gyeonggi',
  },
};

const AREAS = ['부천시', '시흥시', '안산시', '광명시', '안양시'];

export default function GyeonggiPage() {
  return (
    <DeliveryPage
      region="경기"
      regionFull="경기도"
      areas={AREAS}
      description="경기도 서부 지역에 신선한 식자재를 새벽·오전 배송합니다. 인천 부평구 물류창고에서 출발하여 부천, 시흥, 안산, 광명, 안양까지 매일 납품합니다."
      highlight="인천 인접 경기 서부 — 오전 배송 보장"
    />
  );
}
