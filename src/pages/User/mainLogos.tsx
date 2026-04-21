import type { ReactElement } from "react";

type LogoProps = { size?: number };

// ── Frontend ──────────────────────────────────────────────────

export function ReactLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.464" width={size} height={size}>
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypeScriptLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="10" fill="#3178C6" />
      <path
        d="M56.3 56.4v5.5c.9.5 2 .8 3.1.8 3.5 0 5.8-1.8 5.8-5 0-2.7-1.5-4.3-4.7-5.5-2.4-.9-3.2-1.5-3.2-2.6 0-1 .8-1.7 2.1-1.7 1.2 0 2.4.5 3.5 1.3l1.8-3.4c-1.3-.9-3-1.5-5.1-1.5-3.3 0-5.6 2-5.6 5 0 2.8 1.6 4.4 5 5.6 2.3.8 2.9 1.4 2.9 2.5 0 1.1-.9 1.8-2.4 1.8-1.4 0-2.8-.6-3.9-1.8l-.3-.1zM36 45.5h5.4v18.3h4.3V45.5h5.4v-3.9H36v3.9z"
        fill="white"
      />
    </svg>
  );
}

export function ViteLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <defs>
        <linearGradient
          id="vite-a"
          x1="6"
          y1="0"
          x2="26"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#41d1ff" />
          <stop offset="1" stopColor="#bd34fe" />
        </linearGradient>
        <linearGradient
          id="vite-b"
          x1="2"
          y1="3"
          x2="15"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ff3e00" />
          <stop offset="1" stopColor="#ffd400" />
        </linearGradient>
      </defs>
      <path
        d="M29.88 6.57l-13.5 24.2a.77.77 0 01-1.36 0L1.52 6.57a.79.79 0 01.85-1.14l13.5 2.4 13.5-2.4a.79.79 0 01.85 1.14"
        fill="url(#vite-a)"
      />
      <path
        d="M20.76 2L12 18 7.08 9.22l-.34-.6h9.48L20.76 2z"
        fill="url(#vite-b)"
      />
    </svg>
  );
}

export function VitestLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <defs>
        <linearGradient
          id="vitest-a"
          x1="6"
          y1="0"
          x2="26"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#41d1ff" />
          <stop offset="1" stopColor="#bd34fe" />
        </linearGradient>
      </defs>
      <path
        d="M29.88 6.57l-13.5 24.2a.77.77 0 01-1.36 0L1.52 6.57a.79.79 0 01.85-1.14l13.5 2.4 13.5-2.4a.79.79 0 01.85 1.14"
        fill="url(#vitest-a)"
      />
      <path d="M12 22l4-8 4 8H12z" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export function TailwindLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 54 33" width={size} height={(size * 33) / 54}>
      <defs>
        <linearGradient id="tw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2298BD" />
          <stop offset="100%" stopColor="#0ED7B5" />
        </linearGradient>
      </defs>
      <path
        d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.548 15.6 40.5 15.6c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 2.928 33.952 0 27 0zM13.5 15.6C6.3 15.6 1.8 19.2 0 26.4c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 28.272 20.048 31.2 27 31.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 18.528 20.452 15.6 13.5 15.6z"
        fill="url(#tw)"
      />
    </svg>
  );
}

export function VaporUILogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#2a72e5" />
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fill="white"
        fontSize="48"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        V
      </text>
    </svg>
  );
}

export function MSWLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#FF6A33" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        MSW
      </text>
    </svg>
  );
}

export function ReactQueryLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="50" fill="#FF4154" />
      <circle
        cx="50"
        cy="50"
        r="16"
        fill="none"
        stroke="white"
        strokeWidth="7"
      />
      <circle cx="50" cy="24" r="7" fill="white" />
      <circle cx="72" cy="62" r="7" fill="white" />
      <circle cx="28" cy="62" r="7" fill="white" />
    </svg>
  );
}

export function RTLLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#E33E3E" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="white"
        fontSize="22"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        RTL
      </text>
    </svg>
  );
}

export function PrettierLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#1a2b34" />
      {[20, 32, 44, 56, 68].map((y, i) => (
        <rect
          key={i}
          x={20}
          y={y}
          width={[60, 45, 55, 40, 50][i]}
          height={8}
          rx={4}
          fill="#56b3b4"
        />
      ))}
    </svg>
  );
}

// ── Backend ──────────────────────────────────────────────────

export function SpringBootLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="48" fill="#6DB33F" />
      <path
        d="M30 65 Q25 40 50 28 Q75 40 70 65 Q60 80 50 78 Q40 80 30 65z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M50 78 Q35 72 30 58"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

export function JavaLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#007396" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="36"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        J
      </text>
    </svg>
  );
}

export function JPALogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#59666C" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        JPA
      </text>
    </svg>
  );
}

export function PostgreSQLLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#336791" />
      <ellipse
        cx="50"
        cy="42"
        rx="26"
        ry="18"
        fill="none"
        stroke="white"
        strokeWidth="5"
      />
      <ellipse cx="50" cy="42" rx="26" ry="18" fill="#336791" />
      <line x1="24" y1="42" x2="24" y2="62" stroke="white" strokeWidth="5" />
      <line x1="76" y1="42" x2="76" y2="62" stroke="white" strokeWidth="5" />
      <ellipse
        cx="50"
        cy="62"
        rx="26"
        ry="18"
        fill="#336791"
        stroke="white"
        strokeWidth="5"
      />
      <ellipse
        cx="50"
        cy="42"
        rx="26"
        ry="18"
        fill="none"
        stroke="white"
        strokeWidth="5"
      />
    </svg>
  );
}

export function SwaggerLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="48" fill="#85EA2D" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fill="#173647"
        fontSize="30"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        sw
      </text>
    </svg>
  );
}

export function JUnitLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#25A162" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        JUnit
      </text>
    </svg>
  );
}

// ── Deploy & Infra ────────────────────────────────────────────

export function DockerLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#2496ED" />
      {[
        [12, 44],
        [28, 44],
        [44, 44],
        [12, 28],
        [28, 28],
        [44, 28],
        [28, 12],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="14" height="12" rx="2" fill="white" />
      ))}
      <path
        d="M60 55 Q65 48 72 50 Q76 44 84 46"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

export function RenderLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#46E3B7" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="#0f2b26"
        fontSize="36"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        R
      </text>
    </svg>
  );
}

export function VercelLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#000000" />
      <path d="M50 20 L82 75 L18 75z" fill="white" />
    </svg>
  );
}

// ── Tools ─────────────────────────────────────────────────────

export function GitHubLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="50" fill="#24292E" />
      <path
        d="M50 18a32 32 0 00-10.12 62.4c1.6.3 2.18-.7 2.18-1.54v-5.4c-8.9 1.94-10.78-4.28-10.78-4.28-1.46-3.7-3.56-4.68-3.56-4.68-2.9-1.98.22-1.94.22-1.94 3.22.22 4.9 3.3 4.9 3.3 2.86 4.9 7.5 3.48 9.32 2.66.28-2.08 1.12-3.48 2.04-4.28-7.1-.8-14.56-3.56-14.56-15.84a12.38 12.38 0 013.3-8.6c-.34-.8-1.44-4.08.3-8.5 0 0 2.7-.86 8.82 3.28a30.5 30.5 0 0116.08 0c6.1-4.14 8.8-3.28 8.8-3.28 1.76 4.42.66 7.7.32 8.5a12.34 12.34 0 013.3 8.6c0 12.32-7.5 15.02-14.64 15.82 1.16 1 2.18 2.94 2.18 5.92v8.78c0 .84.58 1.84 2.2 1.54A32 32 0 0050 18z"
        fill="white"
      />
    </svg>
  );
}

export function LinearLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <linearGradient id="linear-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5E6AD2" />
          <stop offset="100%" stopColor="#8A94E0" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill="url(#linear-g)" />
      <path
        d="M22 78 L78 22 M22 55 L55 22 M45 78 L78 45 M22 68 L68 22"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NotionLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect
        width="100"
        height="100"
        rx="16"
        fill="#fff"
        stroke="#E1E1E1"
        strokeWidth="4"
      />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="#111"
        fontSize="48"
        fontWeight="800"
        fontFamily="serif"
      >
        N
      </text>
    </svg>
  );
}

export function PostmanLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#FF6C37" />
      <circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="white"
        strokeWidth="6"
      />
      <circle cx="50" cy="50" r="8" fill="white" />
      <line
        x1="58"
        y1="42"
        x2="74"
        y2="26"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ESLintLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#4B32C3" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        ES
      </text>
    </svg>
  );
}

export function HuskyLogo({ size = 44 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect width="100" height="100" rx="16" fill="#222" />
      <circle cx="50" cy="45" r="22" fill="#fff" />
      <circle cx="41" cy="40" r="4" fill="#222" />
      <circle cx="59" cy="40" r="4" fill="#222" />
      <path
        d="M42 52 Q50 58 58 52"
        stroke="#222"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M28 23 L36 38 M72 23 L64 38"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Tech Categories ───────────────────────────────────────────

export type TechItem = { name: string; Logo: (p: LogoProps) => ReactElement };
export type TechCategory = {
  category: string;
  color: string;
  bg: string;
  items: TechItem[];
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "Frontend",
    color: "#2a72e5",
    bg: "#EBF4FF",
    items: [
      { name: "React", Logo: ReactLogo },
      { name: "TypeScript", Logo: TypeScriptLogo },
      { name: "Vite", Logo: ViteLogo },
      { name: "Tailwind", Logo: TailwindLogo },
      { name: "Vapor UI", Logo: VaporUILogo },
      { name: "MSW", Logo: MSWLogo },
      { name: "Vitest", Logo: VitestLogo },
      { name: "RTL", Logo: RTLLogo },
      { name: "React Query", Logo: ReactQueryLogo },
      { name: "Prettier", Logo: PrettierLogo },
    ],
  },
  {
    category: "Backend",
    color: "#10B981",
    bg: "#D6FBE8",
    items: [
      { name: "Java", Logo: JavaLogo },
      { name: "Spring Boot", Logo: SpringBootLogo },
      { name: "JPA", Logo: JPALogo },
      { name: "PostgreSQL", Logo: PostgreSQLLogo },
      { name: "JUnit", Logo: JUnitLogo },
      { name: "Swagger", Logo: SwaggerLogo },
    ],
  },
  {
    category: "배포 & 인프라",
    color: "#8B5CF6",
    bg: "#F6EEFF",
    items: [
      { name: "Vercel", Logo: VercelLogo },
      { name: "Render", Logo: RenderLogo },
      { name: "Docker", Logo: DockerLogo },
    ],
  },
  {
    category: "협업 & 도구",
    color: "#F59E0B",
    bg: "#FEF7D6",
    items: [
      { name: "GitHub", Logo: GitHubLogo },
      { name: "Linear", Logo: LinearLogo },
      { name: "Notion", Logo: NotionLogo },
      { name: "Postman", Logo: PostmanLogo },
      { name: "ESLint", Logo: ESLintLogo },
      { name: "Husky", Logo: HuskyLogo },
    ],
  },
];
