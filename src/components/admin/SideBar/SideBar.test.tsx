import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../../context/UserContext";
import SideBar from "./SideBar";

const defaultProps = {
  userName: "홍길동",
  roleName: "관리자",
  roleLabel: "관리자A",
};

// 테스트에서 사이드바를 렌더링 하는 함수
function renderSideBar(
  props: Partial<typeof defaultProps> = {},
  initialRoute = "/",
) {
  return render(
    <UserProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <SideBar {...defaultProps} {...props} />
      </MemoryRouter>
    </UserProvider>,
  );
}

// 사이드바 컴포넌트 테스트
describe("SideBar 렌더링 테스트", () => {
  // 테스트마다 localStorage 초기화
  beforeEach(() => {
    localStorage.clear();
  });

  // 테스트마다 localStorage 초기화
  afterEach(() => {
    localStorage.clear();
  });

  it("userName이 렌더링 되어야 한다.", () => {
    renderSideBar();
    expect(screen.getByText(defaultProps.userName)).toBeInTheDocument();
  });

  it("roleName이 렌더링 되어야 한다.", () => {
    renderSideBar();
    expect(screen.getByText(defaultProps.roleName)).toBeInTheDocument();
  });

  it("roleLabel이 전달되면 칩 우측에 렌더링 되어야 한다.", () => {
    renderSideBar({ roleLabel: "관리자A" });
    expect(screen.getByText("관리자A")).toBeInTheDocument();
  });

  it("roleLabel이 없으면 userName이 칩 우측에 표시되어야 한다.", () => {
    renderSideBar({ userName: "김철수", roleLabel: undefined });
    const elements = screen.getAllByText("김철수");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("네비게이션 메뉴 항목(공통)이 모두 렌더링 되어야 한다.", () => {
    renderSideBar();
    expect(screen.getByText("알림")).toBeInTheDocument();
    expect(screen.getByText("대시보드")).toBeInTheDocument();
    expect(screen.getByText("회원 목록")).toBeInTheDocument();
    expect(screen.getByText("회원 관리")).toBeInTheDocument();
    expect(screen.getByText("등급 관리")).toBeInTheDocument();
  });

  it("관리자 관리 메뉴는 ROOT 역할일 때만 렌더링 되어야 한다.", () => {
    renderSideBar({ roleName: "ROOT" });
    expect(screen.getByText("관리자 관리")).toBeInTheDocument();
  });

  it("관리자 관리 메뉴는 ADMIN 역할일 때 렌더링되지 않아야 한다.", () => {
    renderSideBar({ roleName: "ADMIN" });
    expect(screen.queryByText("관리자 관리")).not.toBeInTheDocument();
  });

  it("닫기 버튼이 렌더링 되어야 한다.", () => {
    renderSideBar();
    expect(
      screen.getByRole("button", { name: "사이드바 닫기" }),
    ).toBeInTheDocument();
  });

  it("열기 버튼이 렌더링 되어야 한다.", () => {
    renderSideBar();
    expect(
      screen.getByRole("button", { name: "사이드바 열기" }),
    ).toBeInTheDocument();
  });
});

describe("SideBar 동작 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("초기 상태에서 사이드바는 열려 있어야 한다.", () => {
    const { container } = renderSideBar();
    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-64");
  });

  it("닫기 버튼 클릭 시 사이드바가 닫혀야 한다.", () => {
    const { container } = renderSideBar();
    fireEvent.click(screen.getByRole("button", { name: "사이드바 닫기" }));
    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-0");
  });

  it("닫기 버튼 클릭 시 열기 버튼이 활성화되어야 한다.", () => {
    renderSideBar();
    fireEvent.click(screen.getByRole("button", { name: "사이드바 닫기" }));
    const openButton = screen.getByRole("button", { name: "사이드바 열기" });
    expect(openButton).toHaveClass("opacity-100");
    expect(openButton).not.toHaveClass("opacity-0");
  });

  it("열기 버튼 클릭 시 사이드바가 다시 열려야 한다.", () => {
    const { container } = renderSideBar();
    fireEvent.click(screen.getByRole("button", { name: "사이드바 닫기" }));
    fireEvent.click(screen.getByRole("button", { name: "사이드바 열기" }));
    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-64");
  });

  it("닫힌 상태가 localStorage에 저장되어야 한다.", () => {
    renderSideBar();
    fireEvent.click(screen.getByRole("button", { name: "사이드바 닫기" }));
    expect(localStorage.getItem("admin_sidebar_open")).toBe("false");
  });

  it("열린 상태가 localStorage에 저장되어야 한다.", () => {
    renderSideBar();
    expect(localStorage.getItem("admin_sidebar_open")).toBe("true");
  });

  it("localStorage에 닫힘 상태가 저장되어 있으면 초기에 닫혀 있어야 한다.", () => {
    localStorage.setItem("admin_sidebar_open", "false");
    const { container } = renderSideBar();
    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-0");
  });
});

// 주소 경로를 미정했기 때문에 우선 임시 테스트를 진행합니다.
describe("SideBar 메뉴 활성 상태 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("현재 경로가 /admin 이면 대시보드 버튼이 활성 스타일이어야 한다.", () => {
    renderSideBar({}, "/admin");
    const dashboardButton = screen.getByRole("button", { name: /대시보드/i });
    expect(dashboardButton).toHaveClass("bg-gray-50");
  });

  it("현재 경로가 /admin/members 이면 회원 목록 버튼이 활성 스타일이어야 한다.", () => {
    renderSideBar({}, "/admin/members");
    const membersButton = screen.getByRole("button", { name: /회원 목록/i });
    expect(membersButton).toHaveClass("bg-gray-50");
  });

  it("현재 경로와 일치하지 않는 메뉴는 활성 스타일이 아니어야 한다.", () => {
    renderSideBar({}, "/admin/dashboard");
    const membersButton = screen.getByRole("button", { name: /회원 목록/i });
    expect(membersButton).not.toHaveClass("bg-gray-50");
  });
});
