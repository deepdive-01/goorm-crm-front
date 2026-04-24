import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import DashBoardPage from "./DashBoardPage";

function renderDashBoardPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MemoryRouter>
          <DashBoardPage />
        </MemoryRouter>
      </UserProvider>
    </QueryClientProvider>,
  );
}

describe("DashBoardPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderDashBoardPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("데이터 로딩 중에는 스켈레톤 카드가 4개 표시된다.", () => {
    renderDashBoardPage();
    const skeletons = screen.getAllByTestId("dashboard-skeleton");
    expect(skeletons).toHaveLength(4);
  });

  it("API 응답 후 대시보드 카드 4개가 렌더링된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.getAllByText("회원 목록").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("관리자 현황")).toBeInTheDocument();
      expect(screen.getAllByText("등급 관리").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("회원 등급 분포")).toBeInTheDocument();
    });
  });

  it("API 응답 후 스켈레톤 카드가 사라진다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.queryAllByTestId("dashboard-skeleton")).toHaveLength(0);
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
  it("회원 목록 카드의 총 회원 수(total_elements)가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      // members mock total_elements: 12
      expect(screen.getAllByText("12").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("관리자 현황 카드의 총 관리자 수(total_elements)가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      // admins mock total_elements: 4
      expect(screen.getAllByText("4").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("등급 관리 카드의 총 등급 수가 표시된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      // grades mock has 4 grades
      expect(screen.getAllByText("4").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("각 카드의 '상세보기 →' 버튼이 렌더링된다.", async () => {
    renderDashBoardPage();
    await waitFor(() => {
      const buttons = screen.getAllByText("상세보기 →");
      expect(buttons).toHaveLength(4);
    });
  });

  it("회원 목록 API 실패 시 카드가 렌더링되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/admin/users", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderDashBoardPage();
    await waitFor(() => {
      expect(screen.queryByText("관리자 현황")).not.toBeInTheDocument();
    });
  });
});
