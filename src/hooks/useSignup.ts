import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  sendVerificationEmail,
  verifyAuthCode,
  registerUser,
} from "../services/signup";

export function useSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null,
  );
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSendCode = async (email: string) => {
    await sendVerificationEmail(email);
  };

  const handleVerify = async (email: string, code: string): Promise<string> => {
    const result = await verifyAuthCode(email, code);
    const token = result.data.verification_token;
    setVerifiedEmail(email);
    setVerificationToken(token);
    return token;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupError(null);

    if (!verificationToken || !verifiedEmail) {
      setSignupError("이메일 인증을 완료해주세요.");
      return;
    }

    setIsRegistering(true);
    try {
      await registerUser({
        name,
        email: verifiedEmail,
        phone,
        password,
        verification_token: verificationToken,
      });
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setSignupError(
        err.response?.data?.message ??
          "회원가입에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    name,
    phone,
    password,
    confirmPassword,
    passwordMismatch,
    signupError,
    isRegistering,
    setName,
    setPhone,
    setPassword,
    setConfirmPassword,
    handleSendCode,
    handleVerify,
    handleRegister,
  };
}
