import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { server } from "../../../../mocks/server";
import Signup from "./Signup";

const renderSignup = () =>
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>,
  );

describe("Signup", () => {
  describe("렌더링", () => {
    it("이메일 input이 렌더링된다", () => {
      renderSignup();
      expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    });

    it("인증번호 input이 렌더링된다", () => {
      renderSignup();
      expect(screen.getByLabelText(/인증번호/)).toBeInTheDocument();
    });

    it("인증번호 받기 버튼이 렌더링된다", () => {
      renderSignup();
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeInTheDocument();
    });

    it("인증 완료 버튼이 렌더링된다", () => {
      renderSignup();
      expect(
        screen.getByRole("button", { name: "인증 완료" }),
      ).toBeInTheDocument();
    });
  });

  describe("인증번호 발송 (sendVerificationEmail)", () => {
    it("유효한 이메일 입력 후 인증번호 받기 클릭 시 API가 호출된다", async () => {
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.queryByText(/잠시 후 다시 시도해주세요/),
        ).not.toBeInTheDocument();
      });
    });

    it("중복 이메일이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/signup/email-verification", () => {
          return HttpResponse.json(
            {
              code: "DUPLICATE_EMAIL",
              message: "이미 사용 중인 이메일입니다.",
            },
            { status: 409 },
          );
        }),
      );
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.getByText("이미 사용 중인 이메일입니다."),
        ).toBeInTheDocument();
      });
    });

    it("요청 횟수 초과이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/signup/email-verification", () => {
          return HttpResponse.json(
            {
              code: "RATE_LIMIT_EXCEEDED",
              message: "잠시 후 다시 시도해주세요.",
            },
            { status: 429 },
          );
        }),
      );
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.getByText("잠시 후 다시 시도해주세요."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("인증 코드 검증 (verifyAuthCode)", () => {
    it("올바른 인증번호 입력 후 인증 완료 클릭 시 API가 호출된다", async () => {
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.click(screen.getByRole("button", { name: "인증 완료" }));
      await waitFor(() => {
        expect(
          screen.queryByText(/인증번호가 올바르지 않습니다/),
        ).not.toBeInTheDocument();
      });
    });

    it("잘못된 인증번호이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/signup/email-check", () => {
          return HttpResponse.json(
            {
              code: "INVALID_AUTH_CODE",
              message: "인증번호가 올바르지 않습니다.",
            },
            { status: 400 },
          );
        }),
      );
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.type(screen.getByLabelText(/인증번호/), "000000");
      await user.click(screen.getByRole("button", { name: "인증 완료" }));
      await waitFor(() => {
        expect(
          screen.getByText("인증번호가 올바르지 않습니다."),
        ).toBeInTheDocument();
      });
    });

    it("인증번호가 만료되면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/signup/email-check", () => {
          return HttpResponse.json(
            { code: "EXPIRED_CODE", message: "인증번호가 만료되었습니다." },
            { status: 400 },
          );
        }),
      );
      const user = userEvent.setup();
      renderSignup();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.click(screen.getByRole("button", { name: "인증 완료" }));
      await waitFor(() => {
        expect(
          screen.getByText("인증번호가 만료되었습니다."),
        ).toBeInTheDocument();
      });
    });
  });
});
