import type { Metadata } from 'next';
import DeliveryPage from '../../components/DeliveryPage';

export const metadata: Metadata = {
  title: '인천 식자재 납품 | 부평·계양·서구·남동구 새벽배송',
  description: '인천 부평구, 계양구, 서구, 남동구, 미추홀구, 연수구 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송. 프랜차이즈·병원·급식 납품 전문. 1566-1521',
  keywords: ['인천 식자재', '부평 식자재 납품', '계양 식자재', '인천 쌀 도매', '인천 계란 도매', '인천 급식 납품', '인천 새벽배송', '남동구 식자재', '서구 식자재'],
  openGraph: {
    title: '인천 식자재 납품 | 지구농산',
    description: '인천 전 지역 식자재 납품. 쌀, 계란, 김치, 반찬 도매. 새벽·당일배송.',
    url: 'https://jigufood.com/delivery/incheon',
  },
  alternates: {
    canonical: 'https://jigufood.com/delivery/incheon',
  },
};

const AREAS = ['부평구', '계양구', '서구', '남동구', '미추홀구', '연수구', '중구', '동구'];

export default function IncheonPage() {
  return (
    <DeliveryPage
      region="인천"
      regionFull="인천광역시"
      areas={AREAS}
      description="인천광역시 전 지역에 신선한 식자재를 새벽·오전 배송합니다. 부평구 물류창고에서 출발하여 인천 전역에 빠르고 정확하게 납품합니다."
      highlight="인천 부평구 본사 물류창고에서 직접 출발 — 가장 빠른 배송"
    />
  );
}
