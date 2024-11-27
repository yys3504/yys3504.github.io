# 프로젝트 이름 (예: Netflix Clone)

## 📖 프로젝트 기본 정보
이 프로젝트는 영화 정보를 제공하고 사용자가 영화를 탐색하고, 찜 목록을 관리할 수 있는 Netflix 클론 웹 애플리케이션입니다. TMDB API를 활용하여 인기 영화 데이터를 표시하며, 사용자가 다양한 뷰로 영화를 탐색할 수 있도록 설계되었습니다.

### 주요 기능
- 영화 목록 슬라이더 (배너)
- 영화 찜하기/찜 취소 기능
- 반응형 웹 디자인
- 다양한 뷰 모드(리스트 뷰, 테이블 뷰)
- 사용자 친화적인 인터페이스

## 🛠️ 기술 스택
- **Frontend**: React, TypeScript
- **Styling**: CSS (반응형 디자인 포함)
- **API**: TMDB API
- **HTTP 요청 라이브러리**: Axios
- **라이브러리**: react-slick (슬라이더)
- **Package 관리**: npm

## 🚀 설치 및 실행 가이드
- git clone [(레파지토리.git)](https://github.com/yys3504/yys3504.github.io.git)
- cd yys3504.github.io/
- npm install
- npm start

## 프로젝트 구조 설명
project-name/
├── public/                    # 정적 파일
│   └── index.html             # 기본 HTML 파일
├── src/                       # 주요 소스 코드
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── styles/            # 스타일 파일 (CSS)
│   │   │   ├── BannerSlider.css
│   │   │   ├── Header.css
│   │   │   └── MovieRow.css
│   │   ├── BannerSlider.tsx   # 배너 슬라이더 컴포넌트
│   │   ├── Header.tsx         # 헤더 컴포넌트
│   │   └── MovieRow.tsx       # 영화 리스트 컴포넌트
│   ├── pages/                 # 각 페이지 컴포넌트
│   │   ├── MainPage.tsx       # 메인 페이지
│   │   ├── MainPage.css
│   │   ├── SignInPage.tsx     # 로그인 페이지
│   │   ├── SignInPage.css
│   │   ├── PopularPage.tsx    # 인기 영화 페이지
│   │   ├── PopularPage.css
│   │   ├── SearchPage.tsx     # 검색 페이지
│   │   ├── SearchPage.css
│   │   ├── WishlistPage.tsx   # 찜 목록 페이지
│   │   └── WishlistPage.css
│   ├── utils/                 # 유틸리티 함수 및 헬퍼
│   │   ├── Authentication.js  # 인증 관련 유틸리티
│   │   ├── LocalStorageHelper.ts # 로컬 스토리지 관리
│   │   └── useWishlist.ts     # 찜 목록 관리 로직
│   ├── App.tsx                # 루트 컴포넌트
│   └── index.tsx              # React 진입점
├── .env                       # 환경 변수 파일
├── package.json               # 의존성 및 스크립트 정의
└── README.md                  # 프로젝트 설명 파일

## 브랜치 설명
- **main**: 최종 배포 브랜치
- **develop**: 배포 전 개발 및 점검 브랜치
- **feature/sign-in**: 로그인 기능 개발 브랜치
- **feature/mainpage**: 메인 페이지 개발 브랜치
- **feature/popularpage**: 인기 페이지 개발 브랜치
- **feature/searchpage**: 검색 페이지 개발 브랜치
- **feature/wishlistpage**: 찜 목록 개발 브랜치


## 참고사항
- 레파지토리 기여자에 두 명이 적혀있는데, 모두 저의 깃 아이디이며 오해없으시길 바랍니다.