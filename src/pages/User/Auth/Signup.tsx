import { useState } from "react";

import { VStack } from "@vapor-ui/core";

import {
  sendVerificationEmail,
  verifyAuthCode,
} from "../../../services/signup";
import AuthenticationForm from "../components/AuthenticationForm/AuthenticationForm";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendCode = async (email: string) => {
    try {
      setErrorMessage(null);
      await sendVerificationEmail(email);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setErrorMessage(
        err.response?.data?.message ?? "인증번호 발송에 실패했습니다.",
      );
    }
  };

  const handleSubmit = async (email: string, code: string) => {
    try {
      setErrorMessage(null);
      await verifyAuthCode(email, code);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setErrorMessage(err.response?.data?.message ?? "인증에 실패했습니다.");
    }
  };

  return (
    <VStack
      $css={{ gap: "$300" }}
      className="w-full min-h-screen justify-center items-center"
    >
      <AuthenticationForm
        onSendCode={handleSendCode}
        onSubmit={handleSubmit}
        submitLabel="인증 완료"
        showEndBtn
      />
      {errorMessage && (
        <p className="text-body4 text-semantic-red">{errorMessage}</p>
      )}
    </VStack>
  );
}
