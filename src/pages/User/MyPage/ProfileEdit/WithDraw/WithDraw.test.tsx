import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { server } from "../../../../../mocks/server";
import { UserProvider } from "../../../../../context/UserContext";
import WithDraw from "./WithDraw";
import Login from "../../../Auth/Login/Login";

/**
 * UserProvider: deleteAccount API를 useUserContext로 사용하기 위해 필요
 * MemoryRouter + Routes: handleDelete 성공 후 navigate("/login") 검증을 위해 필요
 */
const renderWithDraw = (description?: string) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <UserProvider>
              <WithDraw description={description} />
            </UserProvider>
          }
        />
        {/* 탈퇴 성공 후 navigate("/login")으로 이동하는지 확인하는 더미 페이지 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
  );

/**
 * 트리거 버튼 클릭으로 모달을 여는 헬퍼
 * WithDraw는 자체 Dialog.Root + Trigger를 가지므로 버튼 클릭 시 모달이 열림
 */
const openModal = async () => {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
  return user;
};

describe("WithDraw", () => {
  describe("렌더링", () => {
    it("회원 탈퇴하기 트리거 버튼이 렌더링된다", () => {
      renderWithDraw();
      expect(
        screen.getByRole("button", { name: "회원 탈퇴하기" }),
      ).toBeInTheDocument();
    });

    it("트리거 버튼 클릭 시 비밀번호 input이 표시된다", async () => {
      renderWithDraw();
      await openModal();
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        ).toBeInTheDocument();
      });
    });

    it("트리거 버튼 클릭 시 탈퇴 사유 input이 표시된다", async () => {
      renderWithDraw();
      await openModal();
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("탈퇴 사유를 입력해주세요 (선택)"),
        ).toBeInTheDocument();
      });
    });

    it("description prop이 있으면 모달에 표시된다", async () => {
      // description은 선택적 안내 문구로 Dialog.Description에 렌더링됨
      renderWithDraw("탈퇴 시 모든 데이터가 삭제됩니다.");
      await openModal();
      await waitFor(() => {
        expect(
          screen.getByText("탈퇴 시 모든 데이터가 삭제됩니다."),
        ).toBeInTheDocument();
      });
    });

    it("description prop이 없으면 안내 문구가 표시되지 않는다", async () => {
      renderWithDraw();
      await openModal();
      await waitFor(() => {
        // Dialog.Description 자체가 조건부 렌더링되므로 DOM에 존재하지 않아야 함
        expect(
          screen.queryByText("탈퇴 시 모든 데이터가 삭제됩니다."),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("버튼 활성화 상태", () => {
    it("비밀번호 미입력 시 탈퇴 버튼이 비활성화된다", async () => {
      // disabled={!password || isDeleting} 조건 검증
      renderWithDraw();
      await openModal();
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "회원 탈퇴하기" }),
        ).toBeDisabled();
      });
    });

    it("비밀번호 입력 시 탈퇴 버튼이 활성화된다", async () => {
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "test1234!",
      );
      expect(
        screen.getByRole("button", { name: "회원 탈퇴하기" }),
      ).not.toBeDisabled();
    });
  });

  describe("탈퇴 처리", () => {
    it("올바른 비밀번호 입력 후 탈퇴 성공 시 로그인 페이지로 이동한다", async () => {
      // handleDelete 성공 → navigate("/login") 호출 검증
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "test1234!",
      );
      await user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
      // Login 컴포넌트의 email input이 렌더링되면 /login으로 이동한 것으로 판단
      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "이메일" }),
        ).toBeInTheDocument();
      });
    });

    it("탈퇴 실패 시 Callout 에러 메시지가 표시된다", async () => {
      // deleteError가 설정되면 Callout.Root가 렌더링되어 에러 메시지를 표시
      server.use(
        http.delete("*/api/v1/users/me", () => {
          return HttpResponse.json(
            {
              code: "TOKEN_EXPIRED",
              message: "세션이 만료되었습니다. 다시 로그인해주세요.",
            },
            { status: 401 },
          );
        }),
      );
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "wrongpassword1!",
      );
      await user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
      await waitFor(() => {
        expect(
          screen.getByText("세션이 만료되었습니다. 다시 로그인해주세요."),
        ).toBeInTheDocument();
      });
    });

    it("탈퇴 실패 시 페이지가 이동하지 않는다", async () => {
      // 에러 발생 시 navigate("/login")이 호출되지 않아야 함
      server.use(
        http.delete("*/api/v1/users/me", () => {
          return HttpResponse.json({}, { status: 500 });
        }),
      );
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "wrongpassword1!",
      );
      await user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
      await waitFor(() => {
        expect(
          screen.getByText("회원 탈퇴에 실패했습니다. 다시 시도해주세요."),
        ).toBeInTheDocument();
      });
      // 에러 상태에서 로그인 페이지로 이동하지 않아야 함 (Login의 email input이 없어야 함)
      expect(
        screen.queryByRole("textbox", { name: "이메일" }),
      ).not.toBeInTheDocument();
    });

    it("탈퇴 중에는 탈퇴 버튼이 비활성화된다", async () => {
      // isDeleting이 true인 동안 disabled={!password || isDeleting} 조건으로 버튼 비활성화
      server.use(
        http.delete("*/api/v1/users/me", async () => {
          await new Promise((r) => setTimeout(r, 100));
          return HttpResponse.json({
            status: 200,
            code: "WITHDRAWAL_SUCCESS",
            data: null,
          });
        }),
      );
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "test1234!",
      );
      // await 없이 클릭 → isDeleting=true 상태에서 버튼 상태 확인
      user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "탈퇴 처리 중..." }),
        ).toBeDisabled();
      });
    });

    it("탈퇴 사유는 선택 입력이며 비워도 탈퇴가 진행된다", async () => {
      // reason이 빈 문자열이면 API 요청에서 reason 필드를 제외하고 전송
      renderWithDraw();
      const user = await openModal();
      await waitFor(() =>
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
      );
      // 탈퇴 사유 없이 비밀번호만 입력
      await user.type(
        screen.getByPlaceholderText("현재 비밀번호를 입력해주세요"),
        "test1234!",
      );
      await user.click(screen.getByRole("button", { name: "회원 탈퇴하기" }));
      // Login 컴포넌트의 email input이 렌더링되면 /login으로 이동한 것으로 판단
      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "이메일" }),
        ).toBeInTheDocument();
      });
    });
  });
});
