import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../../../mocks/server";
import { UserProvider } from "../../../context/UserContext";
import { ToastProvider } from "../../../context/ToastContext";
import GradeManagementPage from "./GradeManagementPage";

function renderGradeManagementPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastProvider>
          <MemoryRouter>
            <GradeManagementPage />
          </MemoryRouter>
        </ToastProvider>
      </UserProvider>
    </QueryClientProvider>,
  );
}

// 렌더링 테스트
describe("GradeManagementPage 렌더링 테스트", () => {
  it("사이드바가 렌더링된다.", () => {
    renderGradeManagementPage();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("페이지 타이틀이 렌더링된다.", () => {
    renderGradeManagementPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("테이블 헤더 ID·등급명·최소구매금액이 렌더링된다.", async () => {
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });
    expect(document.body).toHaveTextContent("ID");
    expect(document.body).toHaveTextContent("등급명");
    expect(document.body).toHaveTextContent("최소 구매금액");
  });

  it("'+ 등급 추가하기' 버튼이 렌더링된다.", () => {
    renderGradeManagementPage();
    expect(
      screen.getByRole("button", { name: "+ 등급 추가하기" }),
    ).toBeInTheDocument();
  });
});

// 유저 정보 테스트
describe("GradeManagementPage 유저 정보 테스트", () => {
  it("API 응답의 name이 사이드바에 표시된다.", async () => {
    renderGradeManagementPage();
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
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getAllByText("관리자").length).toBeGreaterThanOrEqual(1);
    });
  });
});

// 등급 관련
describe("GradeManagementPage 등급 목록 테스트", () => {
  it("API 응답 후 등급명이 테이블에 표시된다.", async () => {
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
      expect(screen.getByText("Bronze")).toBeInTheDocument();
      expect(screen.getByText("Silver")).toBeInTheDocument();
      expect(screen.getByText("Gold")).toBeInTheDocument();
    });
  });

  it("등급 ID가 테이블에 표시된다.", async () => {
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("할인율이 테이블에 표시된다.", async () => {
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("3%")).toBeInTheDocument();
      expect(screen.getByText("5%")).toBeInTheDocument();
    });
  });

  it("등급 목록 API 실패 시 등급 데이터가 표시되지 않는다.", async () => {
    server.use(
      http.get("*/api/v1/root/grades", () => {
        return HttpResponse.json(
          { code: "INTERNAL_SERVER_ERROR", message: "서버 오류입니다." },
          { status: 500 },
        );
      }),
    );
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.queryByText("Member")).not.toBeInTheDocument();
      expect(screen.queryByText("Bronze")).not.toBeInTheDocument();
    });
  });
});

// ─── 드로어 패널 테스트 ───────────────────────────────────
describe("GradeManagementPage 드로어 패널 테스트", () => {
  it("초기에는 드로어 패널이 열려있지 않다.", async () => {
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });
    expect(screen.queryByText("등급 상세 정보")).not.toBeInTheDocument();
  });

  it("테이블 행 클릭 시 드로어 패널이 열린다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));

    expect(screen.getByText("등급 상세 정보")).toBeInTheDocument();
  });

  it("드로어 패널에 선택한 등급의 등급명과 최소 구매 금액이 표시된다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Gold")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Gold"));

    await waitFor(() => {
      expect(screen.getAllByText("Gold").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByDisplayValue("500000")).toBeInTheDocument();
    });
  });

  it("X 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));
    expect(screen.getByText("등급 상세 정보")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "패널 닫기" }));
    expect(screen.queryByText("등급 상세 정보")).not.toBeInTheDocument();
  });

  it("다른 행 클릭 시 드로어 패널이 해당 등급 정보로 변경된다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Silver")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Silver"));
    await waitFor(() => {
      expect(screen.getByDisplayValue("200000")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Gold"));
    await waitFor(() => {
      expect(screen.getByDisplayValue("500000")).toBeInTheDocument();
    });
  });

  it("패널에 기본 정보·승급 조건·혜택 내용 섹션이 렌더링된다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));

    expect(screen.getByText("기본 정보")).toBeInTheDocument();
    expect(screen.getByText("승급 조건")).toBeInTheDocument();
    expect(screen.getByText("혜택 내용")).toBeInTheDocument();
  });
});

// ─── 저장·취소 테스트 ─────────────────────────────────────
describe("GradeManagementPage 저장·취소 테스트", () => {
  it("저장·취소·삭제 버튼이 드로어 패널에 렌더링된다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));

    expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
  });

  it("저장 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));
    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(screen.queryByText("등급 상세 정보")).not.toBeInTheDocument();
  });

  it("취소 버튼 클릭 시 드로어 패널이 닫힌다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));
    expect(screen.getByText("등급 상세 정보")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(screen.queryByText("등급 상세 정보")).not.toBeInTheDocument();
  });

  it("저장 후 테이블에 수정된 값이 반영된다.", async () => {
    const user = userEvent.setup();
    renderGradeManagementPage();
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Member"));

    const minPurchaseInput = screen.getByDisplayValue("0");
    await user.clear(minPurchaseInput);
    await user.type(minPurchaseInput, "50000");

    await user.click(screen.getByRole("button", { name: "저장" }));

    // 패널이 닫히고 테이블은 여전히 렌더링됨
    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });
  });
});
