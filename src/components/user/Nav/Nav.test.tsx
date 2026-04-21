import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Nav from "./Nav";

const MockBellIcon = () => <svg data-testid="bell-icon" />;
const MockUserIcon = () => <svg data-testid="user-icon" />;

const defaultProps = {
  LogoTitle: { LogoTitle: "Goorm", href: "/" },
};

const renderNav = (props = {}) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Nav {...defaultProps} {...props} />} />
        <Route path="/login" element={<div>로그인 페이지</div>} />
        <Route path="/features" element={<div>기능 페이지</div>} />
        <Route path="/mypage" element={<div>마이 페이지</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("Nav", () => {
  describe("렌더링", () => {
    it("로고 텍스트가 렌더링된다", () => {
      renderNav();
      expect(screen.getByText("Goorm")).toBeInTheDocument();
    });

    it("메뉴 아이템이 렌더링된다", () => {
      renderNav({
        items: [
          { href: "/features", label: "Features" },
          { href: "/mypage", label: "마이 페이지" },
        ],
      });
      expect(screen.getByText("Features")).toBeInTheDocument();
      expect(screen.getByText("마이 페이지")).toBeInTheDocument();
    });

    it("아바타 아이콘이 렌더링된다", () => {
      renderNav({
        avatarIcons: [{ Icon: MockBellIcon, alt: "알림" }],
      });
      expect(screen.getByTestId("bell-icon")).toBeInTheDocument();
    });

    it("드롭다운 메뉴가 초기에 보이지 않는다", () => {
      renderNav({
        avatarIcons: [
          {
            Icon: MockUserIcon,
            alt: "사용자",
            menuItems: [{ label: "로그아웃", href: "/login" }],
          },
        ],
      });
      expect(screen.queryByText("로그아웃")).not.toBeInTheDocument();
    });
  });

  describe("로고 클릭", () => {
    it("로고 클릭 시 href 경로로 이동한다", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="/login"
              element={<Nav LogoTitle={{ LogoTitle: "Goorm", href: "/" }} />}
            />
            <Route path="/" element={<div>홈 페이지</div>} />
          </Routes>
        </MemoryRouter>,
      );
      await user.click(screen.getByText("Goorm"));
      expect(screen.getByText("홈 페이지")).toBeInTheDocument();
    });

    it("href가 없으면 클릭해도 이동하지 않는다", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="/login"
              element={<Nav LogoTitle={{ LogoTitle: "Goorm" }} />}
            />
            <Route path="/" element={<div>홈 페이지</div>} />
          </Routes>
        </MemoryRouter>,
      );
      await user.click(screen.getByText("Goorm"));
      expect(screen.queryByText("홈 페이지")).not.toBeInTheDocument();
    });
  });

  describe("아바타 드롭다운", () => {
    it("menuItems가 있는 아이콘 클릭 시 드롭다운이 표시된다", async () => {
      const user = userEvent.setup();
      renderNav({
        avatarIcons: [
          {
            Icon: MockUserIcon,
            alt: "사용자",
            menuItems: [{ label: "로그아웃", href: "/login" }],
          },
        ],
      });
      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("로그아웃")).toBeInTheDocument();
      });
    });

    it("드롭다운에서 href 메뉴 클릭 시 해당 페이지로 이동한다", async () => {
      const user = userEvent.setup();
      renderNav({
        avatarIcons: [
          {
            Icon: MockUserIcon,
            alt: "사용자",
            menuItems: [{ label: "로그인", href: "/login" }],
          },
        ],
      });
      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("로그인")).toBeInTheDocument();
      });
      await user.click(screen.getByText("로그인"));
      await waitFor(() => {
        expect(screen.getByText("로그인 페이지")).toBeInTheDocument();
      });
    });

    it("드롭다운에서 onClick 메뉴 클릭 시 함수가 실행된다", async () => {
      const handleLogout = vi.fn();
      const user = userEvent.setup();
      renderNav({
        avatarIcons: [
          {
            Icon: MockUserIcon,
            alt: "사용자",
            menuItems: [{ label: "로그아웃", onClick: handleLogout }],
          },
        ],
      });
      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("로그아웃")).toBeInTheDocument();
      });
      await user.click(screen.getByText("로그아웃"));
      expect(handleLogout).toHaveBeenCalledTimes(1);
    });

    it("menuItems가 없는 아이콘은 클릭해도 드롭다운이 열리지 않는다", async () => {
      // const user = userEvent.setup();
      renderNav({
        avatarIcons: [{ Icon: MockBellIcon, alt: "알림" }],
      });
      // 클릭 가능한 버튼 없음 (Avatar만 렌더링)
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
