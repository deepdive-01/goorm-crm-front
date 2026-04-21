import { renderHook, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useUserContext } from "../context/UserContext";
import { logout } from "../services/auth";
import { useMainNav } from "./useMainNav";

vi.mock("../context/UserContext");
vi.mock("../services/auth");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const makeProfile = (role: "USER" | "ADMIN" | "ROOT") => ({
  email: "goorm01@goorm.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: null,
  grade: "BRONZE" as const,
  role,
  status: "ACTIVE" as const,
  created_at: "2026-04-03T10:00:00Z",
});

const mockClearProfile = vi.fn();

const baseContextValue = {
  profile: null,
  isLoading: false,
  error: null,
  updateProfile: vi.fn(),
  deleteAccount: vi.fn(),
  refetch: vi.fn(),
  clearProfile: mockClearProfile,
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  MemoryRouter({ children });

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useUserContext).mockReturnValue(baseContextValue);
});

describe("useMainNav", () => {
  describe("navItems", () => {
    it("비로그인 상태이면 navItems가 비어있다", () => {
      const { result } = renderHook(() => useMainNav(), { wrapper });
      expect(result.current.navItems).toHaveLength(0);
    });

    it("USER role이면 마이 페이지만 있다", () => {
      vi.mocked(useUserContext).mockReturnValue({
        ...baseContextValue,
        profile: makeProfile("USER"),
      });
      const { result } = renderHook(() => useMainNav(), { wrapper });
      expect(result.current.navItems).toHaveLength(1);
      expect(result.current.navItems[0]).toMatchObject({
        label: "마이 페이지",
      });
    });

    it("ADMIN role이면 관리자 페이지와 마이 페이지 모두 있다", () => {
      vi.mocked(useUserContext).mockReturnValue({
        ...baseContextValue,
        profile: makeProfile("ADMIN"),
      });
      const { result } = renderHook(() => useMainNav(), { wrapper });
      expect(result.current.navItems).toHaveLength(2);
      expect(result.current.navItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: "관리자 페이지" }),
          expect.objectContaining({ label: "마이 페이지" }),
        ]),
      );
    });

    it("ROOT role이면 관리자 페이지와 마이 페이지 모두 있다", () => {
      vi.mocked(useUserContext).mockReturnValue({
        ...baseContextValue,
        profile: makeProfile("ROOT"),
      });
      const { result } = renderHook(() => useMainNav(), { wrapper });
      expect(result.current.navItems).toHaveLength(2);
      expect(result.current.navItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: "관리자 페이지" }),
          expect.objectContaining({ label: "마이 페이지" }),
        ]),
      );
    });
  });

  describe("menuItems", () => {
    it("로그인 상태이면 로그아웃만 있다", () => {
      vi.mocked(useUserContext).mockReturnValue({
        ...baseContextValue,
        profile: makeProfile("USER"),
      });
      const { result } = renderHook(() => useMainNav(), { wrapper });
      const labels = result.current.menuItems.map((m) => m.label);
      expect(labels).toContain("로그아웃");
      expect(labels).not.toContain("로그인");
      expect(labels).not.toContain("회원가입");
    });

    it("비로그인 상태이면 로그인과 회원가입이 있다", () => {
      const { result } = renderHook(() => useMainNav(), { wrapper });
      const labels = result.current.menuItems.map((m) => m.label);
      expect(labels).toContain("로그인");
      expect(labels).toContain("회원가입");
      expect(labels).not.toContain("로그아웃");
    });
  });

  describe("handleLogout", () => {
    it("로그아웃 클릭 시 logout API 호출, clearProfile 실행, /login으로 이동한다", async () => {
      vi.mocked(logout).mockResolvedValue(undefined);
      vi.mocked(useUserContext).mockReturnValue({
        ...baseContextValue,
        profile: makeProfile("USER"),
      });

      const { result } = renderHook(() => useMainNav(), { wrapper });
      const logoutItem = result.current.menuItems.find(
        (m) => m.label === "로그아웃",
      );

      await act(async () => {
        if (logoutItem && "onClick" in logoutItem) {
          await logoutItem.onClick?.();
        }
      });

      await waitFor(() => {
        expect(logout).toHaveBeenCalledTimes(1);
        expect(mockClearProfile).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
      });
    });
  });
});
