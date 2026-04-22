import { Button, Callout, VStack } from "@vapor-ui/core";
import { TextInput } from "@vapor-ui/core";

import Spinner from "../../common/Spinner/Spinner";

import { useAuthenticationForm } from "../../../hooks/useAuthenticationForm";

type AuthenticationFormProps = {
  onSendCode: (email: string) => Promise<void>;
  onSubmit?: (email: string, code: string) => Promise<string>;
  onCodeChange?: (code: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
  submitLabel?: string;
  showEndBtn?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function AuthenticationForm({
  onSendCode,
  onSubmit,
  onCodeChange,
  size,
  submitLabel,
  showEndBtn,
  children,
  className,
}: AuthenticationFormProps) {
  const {
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
  } = useAuthenticationForm({ onSendCode, onSubmit });

  return (
    <VStack $css={{ gap: "$200" }} className={className}>
      {/* 이메일 + 인증번호 받기 버튼 */}
      <div className="flex flex-col w-full gap-1">
        <label
          id="auth-email-label"
          htmlFor="auth-email"
          className="text-gray-400 text-body4"
        >
          이메일
        </label>
        <div className="flex flex-col w-full gap-4 xl:gap-0 xl:flex-row">
          <TextInput
            id="auth-email"
            aria-labelledby="auth-email-label"
            value={email}
            size={size}
            type="email"
            autoComplete="email"
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className="w-full px-3 xl:flex-1 xl:rounded-r-none text-body4"
          />
          <Button
            size={size}
            variant="fill"
            type="button"
            disabled={!isValidEmail || isSendingCode}
            onClick={handleSendCode}
            className="w-full px-4 text-white bg-primary-500 xl:w-fit xl:rounded-l-none text-body4 flex items-center justify-center gap-2"
          >
            {isSendingCode && <Spinner size={16} />}
            {isSendingCode ? "전송 중..." : "인증번호 받기"}
          </Button>
        </div>
        {emailError && (
          <p className="text-body5 text-semantic-red">{emailError}</p>
        )}
        {sendCodeError && (
          <p className="text-body5 text-semantic-red">{sendCodeError}</p>
        )}
        {/* 인증번호 발송 성공 시 안내 */}
        {codeSent && !sendCodeError && (
          <Callout.Root colorPalette="success" className="text-body5">
            인증번호가 이메일로 전송되었습니다. 이메일을 확인해주세요.
          </Callout.Root>
        )}
      </div>

      {/* 인증번호 입력 */}
      <div className="flex flex-col w-full gap-1">
        <label
          id="auth-code-label"
          htmlFor="auth-code"
          className="text-gray-400 text-body4"
        >
          인증번호
        </label>
        <TextInput
          id="auth-code"
          aria-labelledby="auth-code-label"
          value={code}
          size={size}
          placeholder=""
          autoComplete="one-time-code"
          maxLength={6}
          onChange={(e) => {
            handleCodeChange(e);
            onCodeChange?.(e.target.value);
          }}
          onBlur={handleCodeBlur}
          className="w-full px-3 text-body4"
        />
        {codeError && (
          <p className="text-body5 text-semantic-red">{codeError}</p>
        )}
        {verificationError && (
          <p className="text-body5 text-semantic-red">{verificationError}</p>
        )}
      </div>

      {children}

      {showEndBtn && (
        <Button
          size={size}
          variant="fill"
          type="button"
          onClick={handleSubmit}
          disabled={code.trim().length !== 6 || isVerified || isVerifying}
          className="w-full px-4 text-white bg-primary-500 text-body4 flex items-center justify-center gap-2"
        >
          {isVerifying && <Spinner size={16} />}
          {isVerified
            ? "인증 완료됨"
            : isVerifying
              ? "인증 중..."
              : submitLabel}
        </Button>
      )}
    </VStack>
  );
}
