import type { Metadata } from 'next';
import DeliveryPage from '../../components/DeliveryPage';

export const metadata: Metadata = {
  title: '서울 식자재 납품 | 강서·영등포·금천구 새벽배송',
  description: '서울 강서구, 영등포구, 금천구 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송. 프랜차이즈·병원·급식 납품 전문. 1566-1521',
  keywords: ['서울 식자재', '강서구 식자재 납품', '영등포 식자재', '금천구 쌀 도매', '서울 계란 도매', '서울 급식 납품', '서울 새벽배송'],
  openGraph: {
    title: '서울 식자재 납품 | 지구농산',
    description: '서울 서남부 지역 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송.',
    url: 'https://product-catalog-4qg.pages.dev/delivery/seoul',
  },
  alternates: {
    canonical: 'https://product-catalog-4qg.pages.dev/delivery/seoul',
  },
};

const AREAS = ['강서구', '금천구', '영등포구'];

export default function SeoulPage() {
  return (
    <DeliveryPage
      region="서울"
      regionFull="서울특별시"
      areas={AREAS}
      description="서울 서남부 지역에 신선한 식자재를 새벽·오전 배송합니다. 인천 부평구 물류창고에서 출발하여 강서구, 영등포구, 금천구까지 매일 납품합니다."
      highlight="서울 서남부 집중 배송 — 강서·영등포·금천"
    />
  );
}
