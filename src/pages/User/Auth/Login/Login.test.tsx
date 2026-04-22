import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { server } from "../../../../mocks/server";
import { UserProvider } from "../../../../context/UserContext";
import Login from "./Login";

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>회원가입 페이지</div>} />
          <Route path="/" element={<div>홈 페이지</div>} />
        </Routes>
      </UserProvider>
    </MemoryRouter>,
  );

describe("Login", () => {
  describe("렌더링", () => {
    it("이메일 input이 렌더링된다", () => {
      renderLogin();
      expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    });

    it("비밀번호 input이 렌더링된다", () => {
      renderLogin();
      expect(screen.getByLabelText(/비밀번호/)).toBeInTheDocument();
    });

    it("로그인 버튼이 렌더링된다", () => {
      renderLogin();
      expect(
        screen.getByRole("button", { name: "로그인" }),
      ).toBeInTheDocument();
    });

    it("회원가입 버튼이 렌더링된다", () => {
      renderLogin();
      expect(
        screen.getByRole("button", { name: "회원가입" }),
      ).toBeInTheDocument();
    });
  });

  describe("이메일 유효성 검증", () => {
    it("이메일 입력 후 지우고 포커스를 벗어나면 필수 에러가 표시된다", async () => {
      const user = userEvent.setup();
      renderLogin();
      const emailInput = screen.getByLabelText(/이메일/);
      await user.click(emailInput);
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText("이메일을 입력해주세요.")).toBeInTheDocument();
      });
    });

    it("이메일 형식이 올바르지 않으면 에러가 표시된다", async () => {
      const user = userEvent.setup();
      renderLogin();
      await user.type(screen.getByLabelText(/이메일/), "invalid-email");
      await user.tab();
      await waitFor(() => {
        expect(
          screen.getByText("이메일 형식이 올바르지 않습니다."),
        ).toBeInTheDocument();
      });
    });

    it("올바른 이메일 형식이면 에러가 표시되지 않는다", async () => {
      const user = userEvent.setup();
      renderLogin();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.tab();
      expect(
        screen.queryByText("이메일 형식이 올바르지 않습니다."),
      ).not.toBeInTheDocument();
    });
  });

  describe("로그인 API (login)", () => {
    it("올바른 자격증명으로 로그인 성공 시 홈으로 이동한다", async () => {
      const user = userEvent.setup();
      renderLogin();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.type(screen.getByLabelText(/비밀번호/), "test1234!");
      await user.click(screen.getByRole("button", { name: "로그인" }));
      await waitFor(() => {
        expect(screen.getByText("홈 페이지")).toBeInTheDocument();
      });
    });

    it("잘못된 자격증명으로 로그인 실패 시 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/login", () => {
          return HttpResponse.json(
            {
              code: "INVALID_CREDENTIALS",
              message: "이메일 또는 비밀번호가 올바르지 않습니다.",
            },
            { status: 401 },
          );
        }),
      );
      const user = userEvent.setup();
      renderLogin();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.type(screen.getByLabelText(/비밀번호/), "Wrong123!");
      await user.click(screen.getByRole("button", { name: "로그인" }));
      await waitFor(() => {
        expect(
          screen.getByText("이메일 또는 비밀번호가 올바르지 않습니다."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("페이지 이동", () => {
    it("회원가입 버튼 클릭 시 회원가입 페이지로 이동한다", async () => {
      const user = userEvent.setup();
      renderLogin();
      await user.click(screen.getByRole("button", { name: "회원가입" }));
      expect(screen.getByText("회원가입 페이지")).toBeInTheDocument();
    });
  });
});
