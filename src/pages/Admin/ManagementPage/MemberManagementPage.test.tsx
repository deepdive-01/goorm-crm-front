import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import { ToastProvider } from "../../../context/ToastContext";
import MemberManagementPage from "./MemberManagementPage";

function renderMemberManagementPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastProvider>
          <MemoryRouter>
            <MemberManagementPage />
          </MemoryRouter>
        </ToastProvider>
      </UserProvider>
    </QueryClientProvider>,
  );
}

// 렌더링 테스트
describe("MemberManagementPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderMemberManagementPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("페이지 타이틀이 렌더링된다.", () => {
    renderMemberManagementPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("테이블 헤더 회원ID·이메일이 렌더링된다.", async () => {
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });
    expect(document.body).toHaveTextContent("회원ID");
    expect(document.body).toHaveTextContent("이메일");
  });
});

// 유저 정보 테스트
describe("MemberManagementPage 유저 정보 테스트", () => {
  it("API 응답의 name이 사이드바에 표시된다.", async () => {
    renderMemberManagementPage();
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
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

// 회원 목록 테스트
describe("MemberManagementPage 회원 목록 테스트", () => {
  it("API 응답 후 회원 이름이 테이블에 표시된다.", async () => {
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
      expect(screen.getByText("이서연")).toBeInTheDocument();
    });
  });

  it("회원 이메일이 테이블에 표시된다.", async () => {
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("minjun@example.com")).toBeInTheDocument();
    });
  });

  it("회원 ID가 테이블에 표시된다.", async () => {
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("회원 목록 API 실패 시 회원 데이터가 표시되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/root/accounts/users", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.queryByText("김민준")).not.toBeInTheDocument();
      expect(screen.queryByText("minjun@example.com")).not.toBeInTheDocument();
    });
  });
});

// 패널 테스트
describe("MemberManagementPage 드로어 패널 테스트", () => {
  it("초기에는 드로어 패널이 열려있지 않다.", async () => {
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });
    expect(screen.queryByText("사용자 정보 수정")).not.toBeInTheDocument();
  });

  it("테이블 행 클릭 시 드로어 패널이 열린다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));

    expect(screen.getByText("사용자 정보 수정")).toBeInTheDocument();
    expect(
      screen.getByText("회원의 정보를 수정할 수 있습니다"),
    ).toBeInTheDocument();
  });

  it("드로어 패널에 선택한 회원의 이름과 이메일이 표시된다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));

    await waitFor(() => {
      expect(screen.getAllByText("김민준").length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByText("minjun@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it("X 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));
    expect(screen.getByText("사용자 정보 수정")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "패널 닫기" }));
    expect(screen.queryByText("사용자 정보 수정")).not.toBeInTheDocument();
  });

  it("다른 행 클릭 시 드로어 패널이 해당 회원 정보로 변경된다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));
    await waitFor(() => {
      expect(
        screen.getAllByText("minjun@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });

    await user.click(screen.getByText("이서연"));
    await waitFor(() => {
      expect(
        screen.getAllByText("seoyeon@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});

// 저장 테스트
describe("MemberManagementPage 저장 테스트", () => {
  it("저장하기 버튼이 드로어 패널에 렌더링된다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));
    expect(
      screen.getByRole("button", { name: "저장하기" }),
    ).toBeInTheDocument();
  });

  it("저장하기 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderMemberManagementPage();
    await waitFor(() => {
      expect(screen.getByText("김민준")).toBeInTheDocument();
    });

    await user.click(screen.getByText("김민준"));
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    expect(screen.queryByText("사용자 정보 수정")).not.toBeInTheDocument();
  });
});
