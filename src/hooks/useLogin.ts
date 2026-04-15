import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";
import { validateEmail } from "../utils/validateEmail";

export function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 이메일 필드에 한 번이라도 포커스가 벗어났는지 추적
  // touched 이전에는 에러를 표시하지 않아 초기 UX를 깔끔하게 유지
  const [emailTouched, setEmailTouched] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const isValidEmail = validateEmail(email);

  // emailTouched 이후에만 에러를 노출: 빈 값 → 필수 에러, 형식 불일치 → 형식 에러
  const emailError =
    emailTouched && email.length === 0
      ? "이메일을 입력해주세요."
      : emailTouched && !isValidEmail
        ? "이메일 형식이 올바르지 않습니다."
        : null;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 입력 중 서버 에러 메시지 초기화
    setLoginError(null);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLoginError(null);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);

    // 제출 시 touched를 강제로 true로 설정해 에러 메시지를 즉시 표시
    setEmailTouched(true);
    if (!email || !isValidEmail) return;

    try {
      await login(email, password);
      // 로그인 성공 시 홈으로 이동
      navigate("/");
    } catch (error: unknown) {
      // 서버 응답 에러 메시지 우선 표시, 없으면 기본 메시지
      const err = error as { response?: { data?: { message?: string } } };
      setLoginError(
        err.response?.data?.message ??
          "로그인에 실패했습니다. 다시 시도해주세요.",
      );
    }
  };

  return {
    email,
    password,
    emailError,
    loginError,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handleLogin,
  };
}
