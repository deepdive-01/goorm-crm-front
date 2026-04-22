import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import MemberListPage from "./MemberListPage";

function renderMemberListPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MemoryRouter>
          <MemberListPage />
        </MemoryRouter>
      </UserProvider>
    </QueryClientProvider>,
  );
}

describe("MemberListPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderMemberListPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("페이지 타이틀이 렌더링된다.", () => {
    renderMemberListPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("검색창이 렌더링된다.", () => {
    renderMemberListPage();
    expect(screen.getByPlaceholderText("이름으로 검색")).toBeInTheDocument();
  });

  it("필터 드롭다운 버튼 3개가 렌더링된다.", () => {
    renderMemberListPage();
    expect(screen.getByRole("button", { name: "상태" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "등급" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "속성" })).toBeInTheDocument();
  });

  it("'+ 추가' 버튼이 렌더링된다.", () => {
    renderMemberListPage();
    expect(screen.getByRole("button", { name: "+ 추가" })).toBeInTheDocument();
  });

  it("테이블 헤더 6개가 렌더링된다.", async () => {
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("회원 ID")).toBeInTheDocument();
      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getAllByText("등급").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("상태").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("가입일")).toBeInTheDocument();
    });
  });
});

describe("MemberListPage 유저 정보 테스트", () => {
  it("API 응답의 name이 사이드바에 표시된다.", async () => {
    renderMemberListPage();
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
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("MemberListPage 회원 목록 테스트", () => {
  it("API 응답 후 회원 이름이 테이블에 표시된다.", async () => {
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
      expect(screen.getByText("이서연")).toBeInTheDocument();
    });
  });

  it("회원 이메일이 테이블에 표시된다.", async () => {
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("minjun@example.com")).toBeInTheDocument();
    });
  });

  it("회원 목록 API 실패 시 회원 데이터가 표시되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/admin/users", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.queryByText("김민준")).not.toBeInTheDocument();
      expect(screen.queryByText("minjun@example.com")).not.toBeInTheDocument();
    });
  });
});

describe("MemberListPage 필터 테스트", () => {
  it("상태 드롭다운 클릭 시 옵션 목록이 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberListPage();
    await user.click(screen.getByRole("button", { name: /상태/ }));
    expect(screen.getByRole("button", { name: "활성" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "차단" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "전체" })).toBeInTheDocument();
  });

  it("상태 필터 '차단' 선택 시 차단 회원만 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /상태/ }));
    await user.click(screen.getByRole("button", { name: "차단" }));

    await waitFor(() => {
      expect(screen.getByText("박지호")).toBeInTheDocument();
      expect(screen.queryByText("김민준")).not.toBeInTheDocument();
    });
  });

  it("상태 필터 '활성' 선택 시 활성 회원만 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("박지호")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /상태/ }));
    await user.click(screen.getByRole("button", { name: "활성" }));

    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
      expect(screen.queryByText("박지호")).not.toBeInTheDocument();
    });
  });

  it("등급 드롭다운 클릭 시 옵션 목록이 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberListPage();
    await user.click(screen.getByRole("button", { name: "등급" }));
    expect(screen.getByRole("button", { name: "Gold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Member" })).toBeInTheDocument();
  });

  it("등급 필터 'Gold' 선택 시 Gold 회원만 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberListPage();
    await waitFor(() => {
      expect(screen.getByText("이서연")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "등급" }));
    await user.click(screen.getByRole("button", { name: "Gold" }));

    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument(); // Gold
      expect(screen.queryByText("이서연")).not.toBeInTheDocument(); // Member
    });
  });
});
