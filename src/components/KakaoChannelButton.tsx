'use client';

import { useEffect } from 'react';

// 지구농산 카카오톡 비즈니스 채널 검색용 ID
const KAKAO_CHANNEL_ID = '_wHljX';

export default function KakaoChannelButton() {
  useEffect(() => {
    // 카카오 SDK 스크립트 로드
    if (typeof window !== 'undefined' && !(window as any).Kakao) {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
      script.async = true;
      script.onload = () => {
        // SDK 초기화는 불필요 (채널 채팅은 URL 방식 사용)
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    window.open(
      `https://pf.kakao.com/${KAKAO_CHANNEL_ID}/chat`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-[#FEE500] border-0 cursor-pointer"
      aria-label="카카오톡 채널 상담"
      title="카카오톡 채널 상담"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M128 36C70.562 36 24 72.713 24 118.244C24 147.628 43.389 173.574 72.629 188.476L63.106 222.863C62.537 224.89 64.886 226.527 66.659 225.35L107.324 199.009C114.054 199.851 120.959 200.288 128 200.288C185.438 200.288 232 163.775 232 118.244C232 72.713 185.438 36 128 36Z"
          fill="#3C1E1E"
        />
      </svg>
    </button>
  );
}
