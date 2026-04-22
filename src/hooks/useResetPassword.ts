import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  sendPasswordResetEmail,
  resetPassword,
} from "../services/passwordReset";

export function useResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  // AuthenticationForm의 onSendCode에 전달: 이메일 저장 후 인증코드 발송
  const handleSendCode = async (inputEmail: string) => {
    setEmail(inputEmail);
    await sendPasswordResetEmail(inputEmail);
  };

  // AuthenticationForm의 onCodeChange에 전달: 인증코드 실시간 저장
  const handleCodeChange = (code: string) => {
    setAuthCode(code);
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setResetError(null);

    if (!email || !authCode) {
      setResetError("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      // 인증코드 + 새 비밀번호를 한 번에 전송
      await resetPassword(email, authCode, password);
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setResetError(
        err.response?.data?.message ??
          "비밀번호 재설정에 실패했습니다. 다시 시도해주세요.",
      );
    }
  };

  return {
    password,
    confirmPassword,
    passwordMismatch,
    resetError,
    setPassword,
    setConfirmPassword,
    handleSendCode,
    handleCodeChange,
    handleResetPassword,
  };
}
