import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { server } from "../../../../mocks/server";
import ResetPassword from "./ResetPassword";

const renderResetPassword = () =>
  render(
    <MemoryRouter initialEntries={["/reset-password"]}>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<div>로그인 페이지</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("ResetPassword", () => {
  describe("렌더링", () => {
    it("이메일 input이 렌더링된다", () => {
      renderResetPassword();
      expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    });

    it("인증번호 input이 렌더링된다", () => {
      renderResetPassword();
      expect(screen.getByLabelText(/인증번호/)).toBeInTheDocument();
    });

    it("인증번호 받기 버튼이 렌더링된다", () => {
      renderResetPassword();
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeInTheDocument();
    });

    it("비밀번호 input이 렌더링된다", () => {
      renderResetPassword();
      expect(screen.getByLabelText(/^비밀번호$/)).toBeInTheDocument();
    });

    it("비밀번호 확인 input이 렌더링된다", () => {
      renderResetPassword();
      expect(screen.getByLabelText(/비밀번호 확인/)).toBeInTheDocument();
    });

    it("비밀번호 재설정 버튼이 렌더링된다", () => {
      renderResetPassword();
      expect(
        screen.getByRole("button", { name: "비밀번호 재설정" }),
      ).toBeInTheDocument();
    });
  });

  describe("인증번호 발송 (sendPasswordResetEmail)", () => {
    it("유효한 이메일 입력 후 인증번호 받기 클릭 시 에러가 표시되지 않는다", async () => {
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.queryByText(/잠시 후 다시 시도해주세요/),
        ).not.toBeInTheDocument();
      });
    });

    it("가입되지 않은 이메일이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/password/email-verification", () => {
          return HttpResponse.json(
            {
              code: "USER_NOT_FOUND",
              message: "가입되지 않은 이메일입니다.",
            },
            { status: 404 },
          );
        }),
      );
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "unknown@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.getByText("가입되지 않은 이메일입니다."),
        ).toBeInTheDocument();
      });
    });

    it("요청 횟수 초과이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/password/email-verification", () => {
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
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.getByText("잠시 후 다시 시도해주세요."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("비밀번호 재설정 (resetPassword)", () => {
    it("이메일 인증 없이 제출하면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/^비밀번호$/), "NewPass1!");
      await user.type(screen.getByLabelText(/비밀번호 확인/), "NewPass1!");
      await user.click(screen.getByRole("button", { name: "비밀번호 재설정" }));
      await waitFor(() => {
        expect(
          screen.getByText("이메일 인증을 완료해주세요."),
        ).toBeInTheDocument();
      });
    });

    it("올바른 정보로 재설정 성공 시 로그인 페이지로 이동한다", async () => {
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.type(screen.getByLabelText(/^비밀번호$/), "NewPass1!");
      await user.type(screen.getByLabelText(/비밀번호 확인/), "NewPass1!");
      await user.click(screen.getByRole("button", { name: "비밀번호 재설정" }));
      await waitFor(() => {
        expect(screen.getByText("로그인 페이지")).toBeInTheDocument();
      });
    });

    it("잘못된 인증코드이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/password-reset", () => {
          return HttpResponse.json(
            {
              code: "INVALID_AUTH_CODE",
              message: "인증 코드가 일치하지 않습니다.",
            },
            { status: 400 },
          );
        }),
      );
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await user.type(screen.getByLabelText(/인증번호/), "000000");
      await user.type(screen.getByLabelText(/^비밀번호$/), "NewPass1!");
      await user.type(screen.getByLabelText(/비밀번호 확인/), "NewPass1!");
      await user.click(screen.getByRole("button", { name: "비밀번호 재설정" }));
      await waitFor(() => {
        expect(
          screen.getByText("인증 코드가 일치하지 않습니다."),
        ).toBeInTheDocument();
      });
    });

    it("인증 시간이 만료되면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/password-reset", () => {
          return HttpResponse.json(
            {
              code: "EXPIRED_CODE",
              message: "인증 시간이 만료되었습니다.",
            },
            { status: 400 },
          );
        }),
      );
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.type(screen.getByLabelText(/^비밀번호$/), "NewPass1!");
      await user.type(screen.getByLabelText(/비밀번호 확인/), "NewPass1!");
      await user.click(screen.getByRole("button", { name: "비밀번호 재설정" }));
      await waitFor(() => {
        expect(
          screen.getByText("인증 시간이 만료되었습니다."),
        ).toBeInTheDocument();
      });
    });

    it("이전과 동일한 비밀번호이면 에러 메시지가 표시된다", async () => {
      server.use(
        http.post("*/api/v1/auth/password-reset", () => {
          return HttpResponse.json(
            {
              code: "SAME_AS_OLD_PASSWORD",
              message: "이전과 동일한 비밀번호는 사용할 수 없습니다.",
            },
            { status: 400 },
          );
        }),
      );
      const user = userEvent.setup();
      renderResetPassword();
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.type(screen.getByLabelText(/^비밀번호$/), "OldPass1!");
      await user.type(screen.getByLabelText(/비밀번호 확인/), "OldPass1!");
      await user.click(screen.getByRole("button", { name: "비밀번호 재설정" }));
      await waitFor(() => {
        expect(
          screen.getByText("이전과 동일한 비밀번호는 사용할 수 없습니다."),
        ).toBeInTheDocument();
      });
    });
  });
});
