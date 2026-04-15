import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserProvider } from "../../../../../context/UserContext";
import ShippingAddress from "./ShippingAddress";

const renderShippingAddress = () =>
  render(
    <UserProvider>
      <ShippingAddress />
    </UserProvider>,
  );

describe("ShippingAddress", () => {
  describe("렌더링", () => {
    it("프로필 조회 후 수령인 이름이 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByText("홍길동")).toBeInTheDocument();
      });
    });

    it("프로필 조회 후 전화번호가 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByText("010-1234-5678")).toBeInTheDocument();
      });
    });

    it("프로필 조회 후 도로명 주소가 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        // profile.address: "06234\n서울시 강남구 테헤란로 123\n101동 202호"
        expect(
          screen.getByText(/서울시 강남구 테헤란로 123/),
        ).toBeInTheDocument();
      });
    });

    it("프로필 조회 후 우편번호가 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByText(/06234/)).toBeInTheDocument();
      });
    });

    it("프로필 조회 후 상세 주소가 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByText(/101동 202호/)).toBeInTheDocument();
      });
    });

    it("수정 버튼(Edit)이 표시된다", async () => {
      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });
  });

  describe("주소 없는 경우", () => {
    it("address가 null이면 빈 값으로 표시된다", async () => {
      const { HttpResponse, http } = await import("msw");
      const { server } = await import("../../../../../mocks/server");

      server.use(
        http.get("*/api/v1/users/me", () => {
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_FETCH_SUCCESS",
            data: {
              email: "goorm01@goorm.com",
              name: "홍길동",
              phone: null,
              address: null,
              grade: "BRONZE",
              role: "USER",
              status: "ACTIVE",
              created_at: "2026-04-03T10:00:00Z",
            },
          });
        }),
      );

      renderShippingAddress();
      await waitFor(() => {
        expect(screen.getByText("홍길동")).toBeInTheDocument();
      });
      // address가 null이므로 우편번호·주소 영역이 비어 있음
      expect(screen.queryByText(/서울시/)).not.toBeInTheDocument();
    });
  });
});
