# goorm CRM Front

구름 딥다이브 팀 프로젝트의 CRM 서비스 프론트엔드 레포지토리입니다.

사용자 인증(로그인·회원가입·비밀번호 재설정), 마이페이지, 관리자 대시보드 및 회원·관리자·등급 관리 기능을 제공합니다. Vapor UI 디자인 시스템을 기반으로 일관된 UI를 구성하고, Spring Boot 백엔드와 REST API로 연동됩니다.

---

## 기술 스택

### 코어

| 항목 | 내용 |
|------|------|
| React 19 | UI 렌더링. 함수형 컴포넌트 + Hooks 기반으로 구성 |
| TypeScript | 전체 코드베이스에 정적 타입 적용. `types/` 폴더에 도메인별 타입 분리 |
| Vite | 빌드 도구. `vite.config.ts`에서 경로 별칭(`@/`) 설정 |

### 스타일링 · UI

| 항목 | 내용 |
|------|------|
| Tailwind CSS | 유틸리티 클래스 기반 스타일링. 커스텀 디자인 토큰(색상, 타이포그래피)을 `tailwind.config.js`에 등록 |
| Vapor UI | 구름 사내 디자인 시스템. `@vapor-ui/core`(Table, 레이아웃)와 `@vapor-ui/icons`(아이콘) 사용 |
| Pretendard | 프로젝트 기본 폰트 |

### 상태 관리 · 데이터 패칭

| 항목 | 내용 |
|------|------|
| TanStack React Query | 서버 상태 관리. `useQuery`로 데이터 조회, `useMutation`으로 상태 변경 처리 |
| Axios | HTTP 클라이언트. 요청 인터셉터로 JWT 헤더 자동 첨부, 응답 인터셉터로 401/403 전역 처리 |
| React Context | 클라이언트 전역 상태 관리. `UserContext`(로그인 유저 정보), `ToastContext`(알림 상태) |

### 테스트

| 항목 | 내용 |
|------|------|
| Vitest | Vite 기반 테스트 러너. `vitest.config.ts`에서 jsdom 환경 설정 |
| React Testing Library | 컴포넌트·페이지 단위 테스트. 실제 사용자 인터랙션 기반 검증 |
| MSW (Mock Service Worker) | API 모킹. `mocks/handlers/`에 도메인별 핸들러 작성. 브라우저(개발)와 Node(테스트) 환경 분리 |

### 코드 품질

| 항목 | 내용 |
|------|------|
| ESLint | `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-simple-import-sort` 적용 |
| Prettier | `prettier-plugin-tailwindcss`로 Tailwind 클래스 자동 정렬 |
| Husky + lint-staged | 커밋 전 ESLint·Prettier 자동 실행 |
| commitlint | 커밋 메시지 컨벤션 강제 (`[GOO-##] 내용` 형식) |

---

## 협업 방식

### 티켓 시스템 (Linear)

Linear 기반 티켓 시스템을 도입해 기능 단위로 이슈를 생성하고 작업 진행 상황을 추적했습니다. FE·BE 각자의 진행 상황을 실시간으로 파악하고, PR과 커밋을 티켓에 연결해 코드 변경이 어떤 기능과 연관되는지 추적할 수 있었습니다.

- 브랜치명: `feature/GOO-42`, `fix/GOO-55`
- 커밋 메시지: `[GOO-42] 회원 관리 페이지 구현`
- PR 제목·본문에 티켓 번호 연결

### 브랜치 전략

```
main
└── develop
    ├── feature/GOO-##   (기능 개발)
    └── fix/GOO-##       (버그 수정)
```

---

## 페이지 구성

### 사용자 페이지

| 경로 | 페이지 | 주요 기능 |
|------|--------|-----------|
| `/login` | 로그인 | 이메일·비밀번호 로그인, JWT 발급 |
| `/signup` | 회원가입 | 이메일 인증 코드 발송·검증, 회원 등록 |
| `/resetPassword` | 비밀번호 재설정 | 이메일 인증 후 비밀번호 변경 |
| `/myPage` | 마이페이지 | 개인정보·배송지 수정, 등급 조회, 회원 탈퇴 |

### 관리자 페이지

| 경로 | 페이지 | 주요 기능 |
|------|--------|-----------|
| `/admin` | 대시보드 | 회원·관리자·등급 요약 통계 카드 |
| `/admin/members` | 회원 목록 | 전체 회원 조회, 이름·상태·등급 필터 |
| `/admin/member-management` | 회원 관리 | 행 클릭 시 상세 패널, 등급·상태 변경 |
| `/admin/admin-management` | 관리자 관리 | 관리자 목록 조회, 권한 변경 |
| `/admin/grade-management` | 등급 관리 | 등급 목록 조회, 혜택(할인율·적립률 등) 수정 |
| `/admin/my-page` | 관리자 마이페이지 | 본인 프로필 조회·수정 |

---

## 프로젝트 구조

```
src/
├── pages/
│   ├── User/          # 사용자 페이지 (Main, Auth, MyPage)
│   └── Admin/         # 관리자 페이지 (DashBoard, MemberList, ManagementPage, MyPage)
├── components/
│   ├── common/        # 공통 컴포넌트 (Input, Title, AdminGuard 등)
│   ├── admin/         # 관리자 전용 (SideBar, Table, TableSkeleton, DashBoard 등)
│   └── user/          # 사용자 전용 (Nav, AuthenticationForm, Edit 등)
├── services/          # API 호출 함수 (axios 기반 서비스 레이어)
├── hooks/             # 커스텀 훅 (useLogin, useSignup, useWithDraw 등)
├── context/           # 전역 상태 (UserContext, ToastContext)
├── mocks/             # MSW 핸들러 (개발·테스트용 Mock API)
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸 함수 (formatTel, formatNumber, validateEmail)
└── routes/            # 라우터 구성 (User.tsx, Admin.tsx)
```

---

## 주요 구현 사항

### 인증 흐름
- JWT Access Token을 `localStorage`에 저장, Axios 요청 인터셉터로 헤더 자동 첨부
- 응답 인터셉터에서 401/403 감지 시 토큰 제거 후 `/login`으로 리다이렉트 (경로 가드로 무한 루프 방지)
- `AdminGuard` 컴포넌트로 관리자 전용 라우트 접근 제어

### 스켈레톤 로딩
- `isLoading` 상태에서 실제 레이아웃과 동일한 형태의 스켈레톤 표시
- 대시보드 카드 스켈레톤 (페이지 인라인 컴포넌트)
- `TableSkeleton` — `headings` prop 하나로 4개 관리자 테이블 페이지가 공유하는 공통 컴포넌트

### 토스트 알림
- `ToastContext` + `useToast` 훅으로 전역 알림 상태 관리
- 성공: primary 배경 + 체크 아이콘 / 실패: red 배경 + 닫기 아이콘
- 3초 자동 닫힘, 수동 닫기 지원

### 테스트
- MSW 핸들러를 도메인별(`auth`, `members`, `dashboard` 등)로 분리해 관리
- 브라우저 환경(`mocks/browser.ts`)과 테스트 환경(`mocks/server.ts`) 분리
- 총 27개 테스트 파일, 322개 테스트 통과

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 타입 검사
npm run type-check

# 빌드
npm run build
```

### 환경 변수

```env
VITE_API_BASE_URL=BACKEND-SERVER-URL
```
