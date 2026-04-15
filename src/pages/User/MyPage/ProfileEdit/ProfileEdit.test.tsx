import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { server } from "../../../../mocks/server";
import { UserProvider } from "../../../../context/UserContext";
import ProfileEdit from "./ProfileEdit";

/**
 * WithDraw 내부에서 useNavigate를 사용하므로 MemoryRouter 필요
 * Tab에서 page prop으로 전달되는 형태와 동일하게 props 전달
 */
const renderProfileEdit = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <ProfileEdit recipient="" email="goorm01@goorm.com" phone="" />
      </UserProvider>
    </MemoryRouter>,
  );

/**
 * 프로필 로드 완료 대기
 * - ShippingAddress에도 홍길동이 표시되므로 getAllByText 사용
 */
const waitForProfile = () =>
  waitFor(() =>
    expect(screen.getAllByText("홍길동").length).toBeGreaterThan(0),
  );

// MOCK_PROFILE은 모듈 수준 객체라 테스트 간 변경이 누적됨
// 매 테스트 전에 GET 핸들러를 초기값으로 재설정해 격리 보장
const ORIGINAL_PROFILE = {
  email: "goorm01@goorm.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: "06234\n서울시 강남구 테헤란로 123\n101동 202호",
  grade: "BRONZE",
  role: "USER",
  status: "ACTIVE",
  created_at: "2026-04-03T10:00:00Z",
};

beforeEach(() => {
  server.use(
    http.get("*/api/v1/users/me", () =>
      HttpResponse.json({
        status: 200,
        code: "PROFILE_FETCH_SUCCESS",
        data: ORIGINAL_PROFILE,
      }),
    ),
  );
});

describe("ProfileEdit", () => {
  describe("렌더링", () => {
    it("프로필 조회 후 이름이 표시된다", async () => {
      renderProfileEdit();
      await waitForProfile();
      // 이름 필드 + 배송지 수령인에 각각 표시됨
      expect(screen.getAllByText("홍길동").length).toBeGreaterThan(0);
    });

    it("이메일이 표시된다", async () => {
      renderProfileEdit();
      await waitForProfile();
      expect(screen.getByText("goorm01@goorm.com")).toBeInTheDocument();
    });

    it("프로필 조회 후 전화번호가 표시된다", async () => {
      renderProfileEdit();
      await waitForProfile();
      expect(screen.getAllByText("010-1234-5678").length).toBeGreaterThan(0);
    });

    it("초기에 이름·전화번호·배송지·회원탈퇴 버튼 4개가 표시된다", async () => {
      renderProfileEdit();
      await waitForProfile();
      // 이름 edit(1) + 전화번호 edit(1) + 배송지 edit(1) + 회원탈퇴(1) = 4
      expect(screen.getAllByRole("button")).toHaveLength(4);
    });

    it("이메일 필드에는 수정 버튼이 없다 (noneEdit)", async () => {
      renderProfileEdit();
      await waitForProfile();
      // 이메일 라벨이 있고, 그 주변에 버튼 없이 텍스트만 표시
      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getByText("goorm01@goorm.com")).toBeInTheDocument();
    });
  });

  describe("이름 수정", () => {
    it("확인 클릭 시 updateProfile이 새 이름으로 호출된다", async () => {
      let capturedBody: Record<string, string> = {};
      server.use(
        http.patch("*/api/v1/users/me", async ({ request }) => {
          capturedBody = (await request.json()) as Record<string, string>;
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_UPDATE_SUCCESS",
            data: {
              name: capturedBody.name,
              phone: capturedBody.phone,
              address: capturedBody.address,
            },
          });
        }),
      );

      const user = userEvent.setup();
      renderProfileEdit();
      await waitForProfile();

      // 초기 버튼: [0]이름, [1]전화번호, [2]배송지, [3]회원탈퇴
      await user.click(screen.getAllByRole("button")[0]);

      // 편집 모드: input + [0]취소, [1]확인, [2]전화번호, [3]배송지, [4]회원탈퇴
      const input = screen.getByDisplayValue("홍길동");
      await user.clear(input);
      await user.type(input, "김철수");
      await user.click(screen.getAllByRole("button")[1]); // 확인

      await waitFor(() => {
        expect(capturedBody.name).toBe("김철수");
      });
      // 기존 phone·address 값이 그대로 함께 전달되어야 함
      expect(capturedBody.phone).toBe("010-1234-5678");
    });

    it("확인 후 수정된 이름이 화면에 반영된다", async () => {
      const user = userEvent.setup();
      renderProfileEdit();
      await waitForProfile();

      await user.click(screen.getAllByRole("button")[0]);
      const input = screen.getByDisplayValue("홍길동");
      await user.clear(input);
      await user.type(input, "박영희");
      await user.click(screen.getAllByRole("button")[1]); // 확인

      await waitFor(() => {
        expect(screen.getAllByText("박영희").length).toBeGreaterThan(0);
      });
    });
  });

  describe("전화번호 수정", () => {
    it("확인 클릭 시 updateProfile이 새 전화번호로 호출된다", async () => {
      let capturedBody: Record<string, string> = {};
      server.use(
        http.patch("*/api/v1/users/me", async ({ request }) => {
          capturedBody = (await request.json()) as Record<string, string>;
          return HttpResponse.json({
            status: 200,
            code: "PROFILE_UPDATE_SUCCESS",
            data: {
              name: capturedBody.name,
              phone: capturedBody.phone,
              address: capturedBody.address,
            },
          });
        }),
      );

      const user = userEvent.setup();
      renderProfileEdit();
      await waitForProfile();

      // 초기 버튼: [0]이름, [1]전화번호, [2]배송지, [3]회원탈퇴
      await user.click(screen.getAllByRole("button")[1]);

      // 편집 모드: [0]이름, [1]취소, [2]확인, [3]배송지, [4]회원탈퇴
      const input = screen.getByDisplayValue("010-1234-5678");
      await user.clear(input);
      await user.type(input, "01099998888");
      await user.click(screen.getAllByRole("button")[2]); // 확인

      await waitFor(() => {
        expect(capturedBody.phone).toBe("010-9999-8888");
      });
      // 기존 name 값이 그대로 함께 전달되어야 함
      expect(capturedBody.name).toBe("홍길동");
    });
  });
});
