import { act, render, renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { describe, expect, it, vi } from "vitest";

import { server } from "../mocks/server";
import { UserProvider, useUserContext } from "./UserContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

describe("UserContext", () => {
  describe("초기 데이터 조회", () => {
    it("토큰이 없으면 fetchProfile을 호출하지 않고 isLoading이 false가 된다", async () => {
      localStorage.removeItem("access_token");
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.profile).toBeNull();
    });

    it("마운트 시 isLoading이 true로 시작한다", () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      expect(result.current.isLoading).toBe(true);
    });

    it("조회 완료 후 profile이 설정된다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => {
        expect(result.current.profile).not.toBeNull();
      });
      expect(result.current.profile?.name).toBe("홍길동");
      expect(result.current.profile?.email).toBe("goorm01@goorm.com");
    });

    it("조회 완료 후 isLoading이 false가 된다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("API 오류 발생 시 error가 설정된다", async () => {
      server.use(
        http.get("*/api/v1/users/me", () => {
          return HttpResponse.json(
            { message: "서버 오류가 발생했습니다." },
            { status: 500 },
          );
        }),
      );
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => {
        expect(result.current.error).not.toBeNull();
      });
      expect(result.current.profile).toBeNull();
    });

    it("401/403 응답 시 토큰을 제거하고 profile은 null로 유지된다", async () => {
      server.use(
        http.get("*/api/v1/users/me", () => {
          return HttpResponse.json(
            { code: "TOKEN_EXPIRED", message: "세션이 만료되었습니다." },
            { status: 401 },
          );
        }),
      );
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.profile).toBeNull();
      expect(result.current.error).toBeNull();
      expect(localStorage.getItem("access_token")).toBeNull();
    });
  });

  describe("updateProfile", () => {
    it("업데이트 성공 시 캐시의 name이 갱신된다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.profile).not.toBeNull());

      await act(async () => {
        await result.current.updateProfile({
          name: "김철수",
          phone: "010-9999-1111",
          address: "07001\n서울시 마포구 합정로 1\n201호",
        });
      });

      expect(result.current.profile?.name).toBe("김철수");
      expect(result.current.profile?.phone).toBe("010-9999-1111");
    });

    it("업데이트 성공 시 기존 profile 필드(email, grade 등)는 유지된다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.profile).not.toBeNull());

      const originalEmail = result.current.profile?.email;

      await act(async () => {
        await result.current.updateProfile({
          name: "김철수",
          phone: "010-9999-1111",
          address: "도로명",
        });
      });

      expect(result.current.profile?.email).toBe(originalEmail);
    });
  });

  describe("deleteAccount", () => {
    it("탈퇴 성공 시 profile이 null이 된다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.profile).not.toBeNull());

      await act(async () => {
        await result.current.deleteAccount({ password: "test1234!" });
      });

      expect(result.current.profile).toBeNull();
    });

    it("탈퇴 실패 시 에러가 발생하고 profile은 유지된다", async () => {
      server.use(
        http.delete("*/api/v1/users/me", () => {
          return HttpResponse.json(
            { code: "TOKEN_EXPIRED", message: "세션이 만료되었습니다." },
            { status: 401 },
          );
        }),
      );
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.profile).not.toBeNull());

      await expect(
        act(async () => {
          await result.current.deleteAccount({ password: "wrong!" });
        }),
      ).rejects.toBeTruthy();

      expect(result.current.profile).not.toBeNull();
    });
  });

  describe("refetch", () => {
    it("refetch 호출 시 프로필을 다시 조회한다", async () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      await waitFor(() => expect(result.current.profile).not.toBeNull());

      server.use(
        http.get("*/api/v1/users/me", () => {
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_FETCH_SUCCESS",
            data: {
              email: "goorm01@goorm.com",
              name: "박영희",
              phone: "010-5555-6666",
              address: null,
              grade: "SILVER",
              role: "USER",
              status: "ACTIVE",
              created_at: "2026-04-03T10:00:00Z",
            },
          });
        }),
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.profile?.name).toBe("박영희");
    });
  });

  describe("useUserContext 오류 처리", () => {
    it("UserProvider 외부에서 사용하면 에러가 발생한다", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<TestConsumer />);
      }).toThrow("useUserContext must be used within a UserProvider");
      consoleSpy.mockRestore();
    });
  });
});

function TestConsumer() {
  useUserContext();
  return null;
}
