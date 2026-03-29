# 제품 소개 사이트 — 쇼케이스 에이전트

> **소속 부서**: 영업부 — QR 제품소개 랜딩페이지
> **상위 문서**: ../CLAUDE.md (ERP 총괄)

## 역할
거래처/고객 대상 제품 소개 사이트 관리. 전단지 QR코드에서 연결되는 랜딩 페이지.

## 기술 스택
- Next.js 14 + TypeScript + Tailwind CSS
- Supabase JS v2

## 배포
- GitHub: `yeocheon2024-droid/product-catalog`
- URL: product-catalog-4qg.pages.dev
- 호스팅: Cloudflare Pages

## 주요 기능
- 품목 카드 그리드 뷰
- 카테고리 필터 (대분류/중분류)
- 모달 상세보기 (이미지 + 규격 + 단위)
- 이미지 fallback (로고)

## 환경변수
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 규칙
1. 고객 대면 사이트 — UI/UX 품질 우선
2. 모바일 반응형 필수 (전단지 QR → 모바일 접속이 주 경로)
3. 이미지 로딩 최적화 (lazy loading)
