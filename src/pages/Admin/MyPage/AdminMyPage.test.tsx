import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import AdminMyPage from "./AdminMyPage";

function renderAdminMyPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MemoryRouter>
          <AdminMyPage />
        </MemoryRouter>
      </UserProvider>
    </QueryClientProvider>,
  );
}

// 렌더링 테스트
describe("AdminMyPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderAdminMyPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("페이지 타이틀 '내 계정'이 렌더링된다.", () => {
    renderAdminMyPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "내 계정",
    );
  });

  it("'개인정보' 섹션 타이틀이 렌더링된다.", () => {
    renderAdminMyPage();
    expect(screen.getByText("개인정보")).toBeInTheDocument();
  });

  it("'계정 정보' 섹션 타이틀이 렌더링된다.", () => {
    renderAdminMyPage();
    expect(screen.getByText("계정 정보")).toBeInTheDocument();
  });

  it("필드 레이블 이름·이메일·전화번호가 렌더링된다.", () => {
    renderAdminMyPage();
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("전화번호")).toBeInTheDocument();
  });
});

// 프로필 테스트
describe("AdminMyPage 프로필 정보 테스트", () => {
  it("API 응답 후 이름이 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("API 응답 후 이메일이 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(
        screen.getAllByText("admin@shop.com").length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it("API 응답 후 전화번호가 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getByText("010-1111-2222")).toBeInTheDocument();
    });
  });

  it("API 응답 후 역할이 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("ADMIN").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("API 응답 후 등급이 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getByText("BRONZE")).toBeInTheDocument();
    });
  });

  it("API 응답 후 가입일이 'YYYY-MM-DD' 형식으로 표시된다.", async () => {
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getByText("2026-01-01")).toBeInTheDocument();
    });
  });

  it("API 실패 시 사이드바에 기본값 '관리자'가 표시된다.", async () => {
    server.use(
      http.get("*/api/v1/admin/me", () => {
        return HttpResponse.json(
          { code: "UNAUTHORIZED", message: "인증이 필요합니다." },
          { status: 401 },
        );
      }),
    );
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

// 편집
describe("AdminMyPage 편집 테스트", () => {
  function getNameRow() {
    return screen.getByText("이름").closest(".flex") as HTMLElement;
  }

  it("이름 편집 버튼 클릭 시 입력 필드가 나타난다.", async () => {
    const user = userEvent.setup();
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });

    await user.click(within(getNameRow()).getByRole("button"));

    expect(screen.getByDisplayValue("운영팀장")).toBeInTheDocument();
  });

  it("이름 편집 중 취소 버튼 클릭 시 원래 값으로 돌아간다.", async () => {
    const user = userEvent.setup();
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });

    await user.click(within(getNameRow()).getByRole("button"));

    const input = screen.getByDisplayValue("운영팀장");
    await user.clear(input);
    await user.type(input, "신이름");

    await user.click(within(getNameRow()).getAllByRole("button")[0]);

    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("이름 수정 후 확인 버튼 클릭 시 변경된 이름이 표시된다.", async () => {
    const user = userEvent.setup();
    renderAdminMyPage();
    await waitFor(() => {
      expect(screen.getAllByText("운영팀장").length).toBeGreaterThanOrEqual(1);
    });

    // GET 응답을 미리 오버라이드하여 mutation 후 재조회 시 새 이름이 반환되도록 함
    server.use(
      http.get("*/api/v1/admin/me", () => {
        return HttpResponse.json({
          status: 200,
          code: "ADMIN_PROFILE_SUCCESS",
          message: "관리자 프로필 정보를 조회했습니다.",
          data: {
            email: "admin@shop.com",
            name: "이운영",
            phone: "010-1111-2222",
            grade: "BRONZE",
            role: "ADMIN",
            created_at: "2026-01-01T09:00:00Z",
          },
        });
      }),
    );

    await user.click(within(getNameRow()).getByRole("button"));

    const input = screen.getByDisplayValue("운영팀장");
    await user.clear(input);
    await user.type(input, "이운영");

    await user.click(within(getNameRow()).getAllByRole("button")[1]);

    await waitFor(() => {
      expect(screen.getAllByText("이운영").length).toBeGreaterThanOrEqual(1);
    });
  });
});
