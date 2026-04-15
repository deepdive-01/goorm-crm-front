import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import DashBoardPage from "./DashBoardPage";

function renderDashBoardPage() {
  return render(
    <MemoryRouter>
      <DashBoardPage />
    </MemoryRouter>,
  );
}

describe("DashBoardPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderDashBoardPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("데이터 로딩 중에는 '불러오는 중...'이 표시된다.", () => {
    renderDashBoardPage();
    expect(screen.getByText("불러오는 중...")).toBeInTheDocument();
  });

  it("API 응답 후 대시보드 카드 4개가 렌더링된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("회원 목록")).toBeInTheDocument();
      expect(screen.getByText("회원 관리")).toBeInTheDocument();
      expect(screen.getByText("관리자 관리")).toBeInTheDocument();
      expect(screen.getByText("등급 관리")).toBeInTheDocument();
    });
  });

  it("API 응답 후 '불러오는 중...'이 사라진다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.queryByText("불러오는 중...")).not.toBeInTheDocument();
    });
  });
});

describe("DashBoardPage 유저 정보 테스트", () => {
  it("API 응답의 name이 사이드바에 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("유저 정보 API 실패 시 사이드바에 기본값 '관리자'가 표시된다.", async () => {
    server.use(
      http.get("*/api/v1/admin/me", () => {
        return HttpResponse.json(
          { code: "UNAUTHORIZED", message: "인증이 필요합니다." },
          { status: 401 },
        );
      }),
    );
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("DashBoardPage 대시보드 통계 테스트", () => {
  it("회원 목록 카드의 총 회원 수가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("1300")).toBeInTheDocument();
    });
  });

  it("회원 관리 카드의 등급 하락 건수가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("12")).toBeInTheDocument();
    });
  });

  it("관리자 관리 카드의 총 관리자 수가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });

  it("등급 관리 카드의 총 등급 수가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("각 카드의 세부 항목이 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getByText("이번 달 신규가입")).toBeInTheDocument();
      expect(screen.getByText("등급 상승")).toBeInTheDocument();
      expect(screen.getByText("Root 관리자")).toBeInTheDocument();
      expect(screen.getByText("VIP 등급")).toBeInTheDocument();
    });
  });

  it("대시보드 통계 API 실패 시 카드 수치가 렌더링되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/admin/dashboard", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.queryByText("1300")).not.toBeInTheDocument();
      expect(screen.queryByText("888")).not.toBeInTheDocument();
    });
  });

  it("각 카드의 '상세보기 →' 버튼이 렌더링된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      const buttons = screen.getAllByText("상세보기 →");
      expect(buttons).toHaveLength(4);
    });
  });
});
