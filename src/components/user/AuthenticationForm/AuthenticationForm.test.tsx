import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AuthenticationForm from "./AuthenticationForm";

const defaultProps = {
  onSendCode: vi.fn().mockResolvedValue(undefined),
  onSubmit: vi.fn().mockResolvedValue("mock-token"),
  submitLabel: "인증 완료",
};

describe("AuthenticationForm", () => {
  describe("렌더링", () => {
    it("이메일 input이 렌더링된다", () => {
      render(<AuthenticationForm {...defaultProps} />);
      expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    });

    it("인증번호 input이 렌더링된다", () => {
      render(<AuthenticationForm {...defaultProps} />);
      expect(screen.getByLabelText(/인증번호/)).toBeInTheDocument();
    });

    it("인증번호 받기 버튼이 렌더링된다", () => {
      render(<AuthenticationForm {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeInTheDocument();
    });

    it("showEndBtn이 없으면 인증 완료 버튼이 렌더링되지 않는다", () => {
      render(<AuthenticationForm {...defaultProps} />);
      expect(
        screen.queryByRole("button", { name: "인증 완료" }),
      ).not.toBeInTheDocument();
    });

    it("showEndBtn이 true이면 submitLabel 텍스트로 버튼이 렌더링된다", () => {
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      expect(
        screen.getByRole("button", { name: "인증 완료" }),
      ).toBeInTheDocument();
    });
  });

  describe("인증번호 받기 버튼 활성화", () => {
    it("초기에는 비활성화 상태다", () => {
      render(<AuthenticationForm {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeDisabled();
    });

    it("유효하지 않은 이메일 입력 시 비활성화 상태다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      await user.type(screen.getByLabelText(/이메일/), "invalid-email");
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeDisabled();
    });

    it("@ 없는 이메일 입력 시 비활성화 상태다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      await user.type(screen.getByLabelText(/이메일/), "goorm01");
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeDisabled();
    });

    it("도메인 없는 이메일 입력 시 비활성화 상태다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      await user.type(screen.getByLabelText(/이메일/), "goorm01@");
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeDisabled();
    });

    it("유효한 이메일 입력 시 활성화된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeEnabled();
    });

    it("유효한 이메일을 지우면 다시 비활성화된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      const emailInput = screen.getByLabelText(/이메일/);
      await user.type(emailInput, "test@example.com");
      await user.clear(emailInput);
      expect(
        screen.getByRole("button", { name: "인증번호 받기" }),
      ).toBeDisabled();
    });

    it("유효한 이메일 입력 후 인증번호 받기 클릭 시 onSendCode가 호출된다", async () => {
      const onSendCode = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} onSendCode={onSendCode} />);
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      expect(onSendCode).toHaveBeenCalledWith("goorm01@goorm.com");
    });

    it("onSendCode 실패 시 에러 메시지가 표시된다", async () => {
      const onSendCode = vi.fn().mockRejectedValue({
        response: { data: { message: "이미 사용 중인 이메일입니다." } },
      });
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} onSendCode={onSendCode} />);
      await user.type(screen.getByLabelText(/이메일/), "goorm01@goorm.com");
      await user.click(screen.getByRole("button", { name: "인증번호 받기" }));
      await waitFor(() => {
        expect(
          screen.getByText("이미 사용 중인 이메일입니다."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("인증 완료 버튼 활성화", () => {
    it("초기에는 비활성화 상태다", () => {
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      expect(screen.getByRole("button", { name: "인증 완료" })).toBeDisabled();
    });

    it("6자리 미만 입력 시 비활성화 상태다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      await user.type(screen.getByLabelText(/인증번호/), "12345");
      expect(screen.getByRole("button", { name: "인증 완료" })).toBeDisabled();
    });

    it("maxLength로 인해 6자리를 초과하여 입력할 수 없다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      const codeInput = screen.getByLabelText(/인증번호/);
      await user.type(codeInput, "1234567");
      expect(codeInput).toHaveValue("123456");
    });

    it("정확히 6자리 입력 시 활성화된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      expect(screen.getByRole("button", { name: "인증 완료" })).toBeEnabled();
    });

    it("6자리 입력 후 한 글자 지우면 다시 비활성화된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      const codeInput = screen.getByLabelText(/인증번호/);
      await user.type(codeInput, "123456");
      await user.type(codeInput, "{Backspace}");
      expect(screen.getByRole("button", { name: "인증 완료" })).toBeDisabled();
    });

    it("공백만 6자리 입력 시 비활성화 상태다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      await user.type(screen.getByLabelText(/인증번호/), "      ");
      expect(screen.getByRole("button", { name: "인증 완료" })).toBeDisabled();
    });

    it("인증 성공 후 버튼 텍스트가 '인증 완료됨'으로 바뀌고 비활성화된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} showEndBtn />);
      await user.type(screen.getByLabelText(/인증번호/), "123456");
      await user.click(screen.getByRole("button", { name: "인증 완료" }));
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "인증 완료됨" }),
        ).toBeDisabled();
      });
    });

    it("인증 실패 시 에러 메시지가 표시된다", async () => {
      const onSubmit = vi.fn().mockRejectedValue({
        response: { data: { message: "인증번호가 올바르지 않습니다." } },
      });
      const user = userEvent.setup();
      render(
        <AuthenticationForm {...defaultProps} onSubmit={onSubmit} showEndBtn />,
      );
      await user.type(screen.getByLabelText(/인증번호/), "000000");
      await user.click(screen.getByRole("button", { name: "인증 완료" }));
      await waitFor(() => {
        expect(
          screen.getByText("인증번호가 올바르지 않습니다."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("사용자 입력 반영", () => {
    it("이메일 입력값이 input에 반영된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      const emailInput = screen.getByLabelText(/이메일/);
      await user.type(emailInput, "goorm01@goorm.com");
      expect(emailInput).toHaveValue("goorm01@goorm.com");
    });

    it("인증번호 입력값이 input에 반영된다", async () => {
      const user = userEvent.setup();
      render(<AuthenticationForm {...defaultProps} />);
      const codeInput = screen.getByLabelText(/인증번호/);
      await user.type(codeInput, "123456");
      expect(codeInput).toHaveValue("123456");
    });
  });
});
