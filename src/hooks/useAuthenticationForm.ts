import { useState } from "react";

import { validateEmail } from "../utils/validateEmail";

type UseAuthenticationFormProps = {
  onSendCode: (email: string) => Promise<void>;
  onSubmit?: (email: string, code: string) => Promise<string>;
};

export function useAuthenticationForm({
  onSendCode,
  onSubmit,
}: UseAuthenticationFormProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [codeTouched, setCodeTouched] = useState(false);
  const [sendCodeError, setSendCodeError] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const isValidEmail = validateEmail(email);
  const emailError =
    emailTouched && email.length === 0
      ? "이메일을 입력해주세요."
      : emailTouched && !isValidEmail
        ? "이메일 형식이 올바르지 않습니다."
        : null;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsVerified(false);
    setSendCodeError(null);
    setVerificationError(null);
    setCodeSent(false);
  };

  const codeError =
    codeTouched && code.length === 0 ? "인증번호를 입력해주세요." : null;

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setVerificationError(null);
  };

  const handleCodeBlur = () => {
    setCodeTouched(true);
  };

  const handleSendCode = async () => {
    setIsSendingCode(true);
    try {
      setSendCodeError(null);
      setCodeSent(false);
      await onSendCode(email);
      setCodeSent(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setSendCodeError(
        err.response?.data?.message ?? "인증번호 발송에 실패했습니다.",
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async () => {
    setIsVerifying(true);
    try {
      await onSubmit?.(email, code);
      setIsVerified(true);
      setVerificationError(null);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setVerificationError(
        err.response?.data?.message ?? "인증번호가 일치하지 않습니다.",
      );
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    email,
    code,
    isValidEmail,
    isVerified,
    codeSent,
    isSendingCode,
    isVerifying,
    emailError,
    codeError,
    sendCodeError,
    verificationError,
    handleEmailChange,
    handleEmailBlur,
    handleCodeChange,
    handleCodeBlur,
    handleSendCode,
    handleSubmit,
  };
}
