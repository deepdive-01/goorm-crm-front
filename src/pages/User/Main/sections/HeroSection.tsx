import { useNavigate } from "react-router-dom";
import { Button, Text, Badge } from "@vapor-ui/core";
import { useUserContext } from "../../../../context/UserContext";

const NAV_HEIGHT = 64;

export function HeroSection() {
  const navigate = useNavigate();
  const { profile } = useUserContext();
  const isAdmin = profile?.role === "ADMIN" || profile?.role === "ROOT";

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[650px] h-[650px] -top-[180px] -right-[80px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(189,52,254,0.22) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] top-10 -left-[100px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 50%, rgba(65,209,255,0.18) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute w-[420px] h-[420px] -bottom-[60px] left-[38%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,62,0,0.1) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Hero content */}
      <div
        className="relative flex flex-col items-center gap-6 px-6 text-center"
        style={{ paddingTop: NAV_HEIGHT + 80, paddingBottom: 120 }}
      >
        <Badge colorPalette="hint" shape="pill" size="sm">
          팀 프로젝트 · DeepDive · 2026.04.01 ~ 04.20
        </Badge>

        <Text
          className="font-bold"
          style={{
            fontSize: 52,
            lineHeight: "1.15",
            color: "#111",
            marginTop: 8,
          }}
        >
          회원 관리 서비스
          <br />
          <span className="text-primary-500">Goorm</span>
        </Text>

        <Text className="block max-w-xl leading-relaxed text-gray-300 text-body1">
          React와 Spring Boot을 활용하여 구현한 CRM 서비스입니다.
          <br />
          쇼핑몰 회원 관리를 기준으로 회원 등록부터 등급 관리,
          <br />
          관리자 대시보드까지 제공합니다.
        </Text>

        <div className="flex gap-3 mt-2">
          {profile ? (
            <>
              <Button
                className="px-4 text-white text-body4 bg-primary-500"
                size="lg"
                onClick={() => navigate("/myPage")}
              >
                마이페이지
              </Button>
              {isAdmin && (
                <Button
                  className="px-4 border text-primary-500 border-primary-500 text-body4"
                  size="lg"
                  onClick={() => navigate("/admin")}
                >
                  관리자 페이지
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                className="px-4 text-white text-body4 bg-primary-500"
                size="lg"
                onClick={() => navigate("/signup")}
              >
                시작하기
              </Button>
              <Button
                className="px-4 border text-primary-500 border-primary-500 text-body4"
                size="lg"
                onClick={() => navigate("/login")}
              >
                로그인
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-[180px] pointer-events-none bg-gradient-to-b from-transparent via-gray-50/60 to-white" />
    </section>
  );
}
