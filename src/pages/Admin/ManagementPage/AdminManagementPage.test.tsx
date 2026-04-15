import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import AdminManagementPage from "./AdminManagementPage";

function renderAdminManagementPage() {
  return render(
    <MemoryRouter>
      <AdminManagementPage />
    </MemoryRouter>,
  );
}

// ─── 렌더링 테스트 ──────────────────────────────────────────
describe("AdminManagementPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderAdminManagementPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("페이지 타이틀이 렌더링된다.", () => {
    renderAdminManagementPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("테이블 헤더 3개가 렌더링된다.", async () => {
    renderAdminManagementPage();
    await waitFor(() => {
      const headers = screen.getAllByRole("columnheader");
      expect(headers).toHaveLength(3);
      expect(headers[0]).toHaveTextContent("관리자ID");
      expect(headers[1]).toHaveTextContent("이름");
      expect(headers[2]).toHaveTextContent("이메일");
    });
  });
});

// ─── 유저 정보 테스트 ───────────────────────────────────────
describe("AdminManagementPage 유저 정보 테스트", () => {
  it("API 응답의 name이 사이드바에 표시된다.", async () => {
    renderAdminManagementPage();
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
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

// ─── 관리자 목록 테스트 ────────────────────────────────────
describe("AdminManagementPage 관리자 목록 테스트", () => {
  it("API 응답 후 관리자 이름이 테이블에 표시된다.", async () => {
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
      expect(screen.getByText("박운영")).toBeInTheDocument();
    });
  });

  it("관리자 이메일이 테이블에 표시된다.", async () => {
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("admin1@example.com")).toBeInTheDocument();
    });
  });

  it("관리자 ID가 테이블에 표시된다.", async () => {
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("A001")).toBeInTheDocument();
      expect(screen.getByText("A002")).toBeInTheDocument();
    });
  });

  it("관리자 목록 API 실패 시 관리자 데이터가 표시되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/admin/admins", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.queryByText("이관리")).not.toBeInTheDocument();
      expect(screen.queryByText("admin1@example.com")).not.toBeInTheDocument();
    });
  });
});

// 패널
describe("AdminManagementPage 드로어 패널 테스트", () => {
  it("초기에는 드로어 패널이 열려있지 않다.", async () => {
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });
    expect(screen.queryByText("관리자 정보 수정")).not.toBeInTheDocument();
  });

  it("테이블 행 클릭 시 드로어 패널이 열린다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));

    expect(screen.getByText("관리자 정보 수정")).toBeInTheDocument();
    expect(
      screen.getByText("관리자의 정보를 수정할 수 있습니다"),
    ).toBeInTheDocument();
  });

  it("드로어 패널에 선택한 관리자의 이름과 이메일이 표시된다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));

    await waitFor(() => {
      expect(screen.getAllByText("이관리").length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByText("admin1@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it("X 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));
    expect(screen.getByText("관리자 정보 수정")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "패널 닫기" }));
    expect(screen.queryByText("관리자 정보 수정")).not.toBeInTheDocument();
  });

  it("다른 행 클릭 시 드로어 패널이 해당 관리자 정보로 변경된다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));
    await waitFor(() => {
      expect(
        screen.getAllByText("admin1@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });

    await user.click(screen.getByText("박운영"));
    await waitFor(() => {
      expect(
        screen.getAllByText("admin2@example.com").length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});

// 저장 버튼 테스트
describe("AdminManagementPage 저장 테스트", () => {
  it("저장하기 버튼이 드로어 패널에 렌더링된다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));
    expect(
      screen.getByRole("button", { name: "저장하기" }),
    ).toBeInTheDocument();
  });

  it("저장하기 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderAdminManagementPage();
    await waitFor(() => {
      expect(screen.getByText("이관리")).toBeInTheDocument();
    });

    await user.click(screen.getByText("이관리"));
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    expect(screen.queryByText("관리자 정보 수정")).not.toBeInTheDocument();
  });
});
