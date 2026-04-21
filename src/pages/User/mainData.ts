// ── Project Overview ─────────────────────────────────────────

export const PROJECT_INFO = {
  period: "2026.04.01 ~ 2026.04.20",
  githubFe: "https://github.com/deepdive-01/goorm-crm-front",
  githubBe: "https://github.com/deepdive-01/goorm-crm-back",
  deployBe: "https://goorm-crm-back.onrender.com",
  feStack:
    "React, TypeScript, Tailwind CSS, Prettier, Vite, Vapor UI, MSW, Vitest, React Testing Library, ReactQuery",
  beStack: "Java, JUnit, SpringBoot, JPA, PostgreSQL, Render, Docker, Swagger",
  deployInfo: "FE: Vercel / BE: Render (Docker) / DB: PostgreSQL",
  team: [
    { name: "이세현", role: "FE" },
    { name: "최유정", role: "FE" },
    { name: "이채원", role: "BE" },
    { name: "조성민", role: "BE" },
  ],
};

// ── Goals ────────────────────────────────────────────────────

export const TECH_GOALS = [
  "Figma 디자인 시스템 구축",
  "React 컴포넌트 설계 및 재사용 가능한 공통 컴포넌트 설계",
  "REST API 연동 흐름 이해와 클라이언트, 서버 간 데이터 흐름 구조화",
  "Vapor UI 디자인 시스템 기반의 일관된 UI 구성",
  "MSW(Mock Service Worker)를 활용한 목업 API 테스트",
  "Vitest + Testing Library 기반의 컴포넌트, 페이지 단위 테스트",
  "Spring Boot Controller → Service → Repository 3계층 구조 설계 및 구현",
  "JWT 기반의 인증 시스템 구현",
  "JPA를 활용한 데이터 접근과 JPQL 커스텀 쿼리 작성",
  "Docker 기반 클라우드 배포 환경 구성",
  "Linear 기반 티켓 시스템으로 작업 단위 분리 및 진행 상황 추적",
];

export const COLLAB_GOALS = [
  "FE / BE의 분리된 협업 구조 경험",
  "API 명세서 기반의 FE, BE 사전 합의 및 기능 설계",
  "기획, 설계, 개발, 배포까지의 경험",
  "티켓 시스템을 이용한 일정 추적",
];

// ── Pages ─────────────────────────────────────────────────────

export type PageItem = {
  code: string;
  path: string;
  title: string;
  role: string;
  type: "user" | "admin";
  features: string[];
};

export const PAGES: PageItem[] = [
  {
    code: "USER-01",
    path: "/login",
    title: "로그인",
    role: "사용자 인증",
    type: "user",
    features: [
      "이메일 + 비밀번호 입력 후 로그인 버튼 클릭",
      "JWT Access Token 발급 및 로그인 처리",
      "이메일 / 비밀번호 형식 오류 시 에러 표시",
      "로그인 실패 시 경고 표시",
      "하단 버튼으로 회원가입, 비밀번호 재설정 페이지 이동",
    ],
  },
  {
    code: "USER-02",
    path: "/signup",
    title: "회원가입",
    role: "신규 회원 등록",
    type: "user",
    features: [
      "이름, 전화번호, 이메일, 비밀번호, 비밀번호 확인 입력",
      "이메일 인증 코드 발송 → 코드 입력 → 인증 완료 처리",
      "비밀번호 확인 불일치 시 에러 표시",
      "이미 가입된 이메일 등 에러 시 경고 표시",
    ],
  },
  {
    code: "USER-03",
    path: "/resetPassword",
    title: "비밀번호 재설정",
    role: "비밀번호 변경",
    type: "user",
    features: [
      "이메일 인증 코드 발송 → 코드 입력",
      "새 비밀번호 + 비밀번호 확인 입력 후 재설정 버튼 클릭",
      "비밀번호 불일치 시 버튼 비활성화",
      "인증 코드 불일치, 만료 시 경고 표시",
    ],
  },
  {
    code: "USER-04",
    path: "/myPage",
    title: "마이페이지",
    role: "개인정보 조회 및 수정",
    type: "user",
    features: [
      "이름, 전화번호 수정 아이콘 클릭 시 입력 전환",
      "수정 후 확인 버튼으로 저장 및 화면 반영",
      "배송지 수정 버튼 클릭 시 모달 표시",
      "현재 등급 및 등급별 혜택 조회, 등급 진행 현황 시각화",
      "회원 탈퇴: 비밀번호 확인 후 탈퇴 처리",
      "로그아웃: 토큰 제거 후 로그인 페이지로 이동",
    ],
  },
  {
    code: "ADM-01",
    path: "/admin",
    title: "관리자 대시보드",
    role: "주요 지표 현황 파악",
    type: "admin",
    features: [
      "사이드바 + 그리드 지표 카드 구성",
      "회원, 관리자, 등급 요약 통계 표시",
      "카드 상세보기 버튼 클릭 시 해당 관리 페이지로 이동",
    ],
  },
  {
    code: "ADM-02",
    path: "/admin/members",
    title: "회원 목록",
    role: "전체 회원 조회",
    type: "admin",
    features: [
      "전체 회원 목록 테이블 조회 (ID, 이름, 이메일, 등급, 상태, 가입일)",
      "이름 검색 및 상태, 등급 필터링",
      "필터 결과가 없을 때 빈 테이블 표시",
    ],
  },
  {
    code: "ADM-03",
    path: "/admin/member-management",
    title: "회원 관리",
    role: "회원 정보 수정",
    type: "admin",
    features: [
      "회원 목록 테이블에서 행 클릭 시 상세 패널 제공",
      "패널에서 등급, 상태 변경 가능",
      "외부 클릭 시 패널 닫힘",
    ],
  },
  {
    code: "ADM-04",
    path: "/admin/admin-management",
    title: "관리자 관리",
    role: "관리자 권한 관리",
    type: "admin",
    features: [
      "관리자 목록 테이블에서 행 클릭 시 우측 상세 패널 제공",
      "패널에서 권한 변경 후 저장",
      "패널 외부 클릭 시 닫힘",
    ],
  },
  {
    code: "ADM-05",
    path: "/admin/grade-management",
    title: "등급 관리",
    role: "등급 혜택 설정",
    type: "admin",
    features: [
      "전체 등급 목록 테이블 조회",
      "행 클릭 시 우측 상세 패널 제공",
      "최소 구매금액, 할인율, 적립률, 무료배송 여부 수정",
      "패널 외부 클릭 시 닫힘",
    ],
  },
  {
    code: "ADM-06",
    path: "/admin/my-page",
    title: "관리자 마이페이지",
    role: "관리자 본인 정보 조회/수정",
    type: "admin",
    features: [
      "SideBar 하단 마이 페이지 드롭다운",
      "프로필 카드 제공 및 이름, 이메일, 역할 조회",
      "이름, 전화번호 클릭 시 수정 가능",
    ],
  },
];

// ── Dev Flow ──────────────────────────────────────────────────

export type DevStep = { tag: string; desc: string };
export type DevPhase = { phase: string; steps: DevStep[] };

export const DEV_FLOW: DevPhase[] = [
  {
    phase: "기획 및 설계",
    steps: [
      {
        tag: "공통",
        desc: "기능 정의: 서비스에서 제공할 기능 목록 정의 및 우선 순위 선정",
      },
      {
        tag: "FE",
        desc: "화면 설계: Figma를 활용한 페이지 흐름 및 주요 구성 정의",
      },
      { tag: "BE", desc: "ERD 설계: 테이블 구조 및 관계 설정" },
      {
        tag: "BE",
        desc: "API 명세서 작성: 엔드포인트, 요청/응답 형식 정의",
      },
      {
        tag: "FE",
        desc: "디자인 작업: 화면 흐름 기반 UI 디자인 및 컴포넌트 구조 설계",
      },
    ],
  },
  {
    phase: "기능 구현",
    steps: [
      {
        tag: "BE",
        desc: "사전 준비: 공통 응답 구조, Security, CORS, JWT 인증 구현",
      },
      {
        tag: "FE",
        desc: "사전 준비: 프로젝트 초기 세팅 및 디자인 시스템 구축",
      },
      {
        tag: "FE",
        desc: "컴포넌트 개발: 페이지별 컴포넌트 구현 및 MSW 기반 API 테스트",
      },
      {
        tag: "BE",
        desc: "기능 개발: 로그인/회원가입, 사용자 조회, 관리자 조회, 마이 페이지, 등급 CRUD",
      },
    ],
  },
  {
    phase: "연동 및 배포",
    steps: [
      { tag: "BE", desc: "Render 배포: Docker 이미지 빌드 및 배포" },
      { tag: "FE", desc: "연동 테스트: API 서버 기반 연동 및 동작 확인" },
      {
        tag: "BE·FE",
        desc: "이슈 확인: 연동 과정에서 발생한 이슈 파악 및 수정",
      },
      { tag: "FE", desc: "배포: Vercel 배포 완료" },
    ],
  },
  {
    phase: "마무리",
    steps: [
      { tag: "BE·FE", desc: "통합 테스트 및 배포 환경 확인" },
      { tag: "공통", desc: "결과 보고서 작성" },
    ],
  },
];

// ── Team ──────────────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: "FE" | "BE";
  color: string;
  tasks: string[];
};

export const TEAM: TeamMember[] = [
  {
    name: "이세현",
    role: "FE",
    color: "#2a72e5",
    tasks: [
      "팀 운영 및 일정 관리",
      "화면 설계서 작성",
      "티켓 시스템 도입",
      "Figma 디자인 작업 및 디자인 토큰 정리",
      "관리자 공통 컴포넌트 개발",
      "관리자 대시보드, 회원 목록 / 회원 관리 / 관리자 관리",
      "등급 관리, 관리자 마이페이지 구현",
    ],
  },
  {
    name: "최유정",
    role: "FE",
    color: "#2a72e5",
    tasks: [
      "Figma 디자인 작업 및 디자인 토큰 정리",
      "Vapor UI 기반 디자인 시스템 구축",
      "프로젝트 초기 세팅 및 구조 설계",
      "공통 컴포넌트, 사용자 컴포넌트 개발",
      "로그인 / 회원가입 / 비밀번호 재설정 페이지 구현",
      "사용자 마이 페이지 구현",
      "메인 페이지 구현",
    ],
  },
  {
    name: "이채원",
    role: "BE",
    color: "#10B981",
    tasks: [
      "JWT 기반 인증 구현",
      "회원가입 API 구현 (이메일 인증 코드 발송 / 검증 / 가입 완료)",
      "로그인 / 로그아웃 API 구현",
      "비밀번호 재설정 구현",
    ],
  },
  {
    name: "조성민",
    role: "BE",
    color: "#10B981",
    tasks: [
      "ERD 설계 및 테이블 정의",
      "사용자 마이 페이지 API (프로필 조회 / 수정, 회원 탈퇴)",
      "관리자 마이 페이지 API (프로필 조회 / 수정)",
      "회원 관리 API (전체 조회 / 상태 변경)",
      "관리자 API (통합 조회 / 상세 조회, 권한 / 등급 변경)",
      "등급 관리 API (목록 조회, 상세 조회, 혜택 수정)",
      "AWS EC2 구축 및 배포",
    ],
  },
];

// ── Learnings ─────────────────────────────────────────────────

export type LearningItem = { title: string; desc: string };

export const LEARNINGS: LearningItem[] = [
  {
    title: "React 컴포넌트 설계 및 재사용 가능한 공통 컴포넌트 구조화",
    desc: "재사용 가능한 공통 컴포넌트를 설계하고 사용자, 관리자 영역별로 컴포넌트를 구조화하는 방법을 경험했습니다. Vapor UI 디자인 시스템을 기반으로 컬러, 타이포그래피 등 디자인 토큰을 일관되게 적용하고 props 설계를 통해 다양한 환경에서도 재사용할 수 있는 컴포넌트를 설계했습니다.",
  },
  {
    title: "MSW를 활용한 Mock 연동",
    desc: "MSW를 활용해 API가 완성되기 전에 실제 HTTP 요청을 통해 빠른 연동을 가능하게 했습니다. 브라우저 환경과 테스트 환경을 분리하고 도메인별로 핸들러를 작성하여 성공에 대한 시뮬레이션을 할 수 있었습니다.",
  },
  {
    title: "Vitest + Testing Library 기반 컴포넌트 및 페이지 테스트 작성",
    desc: "Vitest와 React Testing Library를 활용해 컴포넌트 렌더링, 사용자 인터렉션, API 응답에 대한 테스트를 작성했습니다. 실제 유저 흐름을 고려해 테스트 코드 작성 방식을 경험할 수 있었습니다.",
  },
  {
    title: "Spring Boot을 활용한 RESTful API 설계 및 구현",
    desc: "Spring Boot의 Controller → Service → Repository 3계층 구조를 설계하고 구현하면서 각 계층의 역할을 분리하는 이유와 방법을 이해했습니다. 기본적인 흐름과 GET/POST/PATCH/DELETE 메서드를 적용하는 방법을 익혔습니다.",
  },
  {
    title: "JWT 기반 Access Token / Refresh Token 인증 구현",
    desc: "JWT를 활용한 이중 토큰 인증 구조를 구현했습니다. 짧은 유효기간의 Access Token으로 API 인증을 처리하고, 긴 유효기간의 Refresh Token을 HttpOnly 쿠키로 관리하여 보안성을 높이는 방식을 이해했습니다. Spring Security Filter Chain에 JwtFilter를 등록해 매 요청마다 토큰을 검증하는 인증 구조를 구현하고, Access Token 만료 시 Refresh Token으로 재발급하는 흐름을 직접 설계했습니다.",
  },
  {
    title: "티켓 시스템 도입을 통한 협업 프로세스 경험",
    desc: "Linear 기반의 티켓 시스템을 도입하여 기능 단위로 이슈를 생성하고 커밋 메시지, 브랜치명, PR 제목과 내용에 포함하는 컨벤션을 적용했습니다. 작업을 티켓 단위로 분리함으로써 개인별 진행 상황을 실시간으로 파악할 수 있었고, PR을 연결하여 코드 변경 사항이 어떤 기능과 연관되는지 추적하는 협업 방식을 경험할 수 있었습니다.",
  },
];

// ── Retrospective ─────────────────────────────────────────────

export type RetroItem = { title: string; desc: string };

export const RETRO_BAD: RetroItem[] = [
  {
    title: "에러 처리 미흡",
    desc: "API 호출 실패 시 개별적으로 에러 처리를 진행하고 있어, 일관성이 부족합니다. 전역 에러 처리와 공통 에러 메시지 방식을 고려해 동일한 에러 상황에선 일관된 메세지를 제공할 수 있도록 할 예정입니다.",
  },
  {
    title: "로딩 상태 UI 미흡",
    desc: "데이터 로딩 혹은 로딩 실패 시 사용자에게 제공하는 UI가 텍스트로만 제공되고 있어 사용자 경험을 채워주지 못합니다. 로딩 상태에 대한 UI를 고려해 제공할 예정입니다.",
  },
  {
    title: "에러 응답/예외 처리 표준화 미흡",
    desc: "전역 예외 처리 구조는 마련했지만, 검증 에러 메시지 매핑이 케이스별로 확장될 여지가 있어 일관성이 떨어질 수 있습니다. 공통 에러 포맷과 매핑 규칙을 정리해 동일한 상황에서 일관된 메시지를 제공할 수 있도록 개선할 예정입니다.",
  },
  {
    title: "토큰 수명주기 운영 정책 미흡",
    desc: "Refresh Token을 DB에 저장하는 구조인 만큼, 만료 토큰 정리, 재발급(rotate) 정책, 다중 기기 로그인의 관리 등 운영 관점의 정책이 더 필요합니다. 토큰 관리 기준을 명확히 하고 자동 정리/재발급 시나리오를 추가해 안정성을 높일 예정입니다.",
  },
];

export const RETRO_GOOD: RetroItem[] = [
  {
    title: "티켓 시스템 도입을 통한 작업 진행 상황 공유",
    desc: "Linear 기반의 티켓 시스템을 도입하여 각 기능을 티켓 단위로 분리하고 커밋 메시지에 티켓 번호를 포함하는 컨벤션을 적용했습니다. FE와 BE의 각자 작업 진행 상황을 실시간으로 파악할 수 있었고, 어떤 기능이 어디에서 개발되고 있는지 추적할 수 있었습니다.",
  },
  {
    title: "인증/인가 체계 정립을 통한 접근 제어 일관성 확보",
    desc: "JWT 기반의 Stateless 인증을 적용하고, ROOT/ADMIN 등 역할별로 접근 가능한 API 경로를 분리해 권한 정책을 명확히 했습니다. 이를 통해 운영 중 권한 이슈를 줄이고, 신규 API 추가 시에도 동일한 기준으로 확장할 수 있었습니다.",
  },
  {
    title: "이메일 인증/비밀번호 재설정 플로우 고도화",
    desc: "이메일 인증과 비밀번호 재설정 과정에서 만료 시간, 재발송 제한(쿨다운) 등 안전장치를 두고 인증코드를 해시로 저장해 보안성을 강화했습니다. 또한 주요 분기(중복 이메일, 만료, 잘못된 코드 등)를 테스트로 검증해 회귀 가능성을 낮췄습니다.",
  },
];
