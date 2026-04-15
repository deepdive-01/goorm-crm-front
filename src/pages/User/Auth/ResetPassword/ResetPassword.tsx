import { Button, Callout, VStack, Text } from "@vapor-ui/core";

import { useResetPassword } from "../../../../hooks/useResetPassword";
import AuthenticationForm from "../../../../components/user/AuthenticationForm/AuthenticationForm";
import Input from "../../../../components/common/Input/Input";

export default function ResetPassword() {
  const {
    password,
    confirmPassword,
    passwordMismatch,
    resetError,
    setPassword,
    setConfirmPassword,
    handleSendCode,
    handleCodeChange,
    handleResetPassword,
  } = useResetPassword();

  const size = "md";

  return (
    <VStack
      render={<form onSubmit={handleResetPassword} noValidate />}
      $css={{
        width: "100vw",
        height: "100vh",
        padding: "$200",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-gray-50"
    >
      <VStack
        $css={{ gap: "$400", alignItems: "center" }}
        className="w-96 p-8 border-[1px] border-gray-100 rounded-lg bg-white"
      >
        <Text className="text-h2">비밀번호 재설정</Text>
        <VStack $css={{ gap: "$200" }} className="w-full">
          {/* 서버 응답 에러 메시지 */}
          {resetError && (
            <Callout.Root colorPalette="warning" className="text-body5">
              {resetError}
            </Callout.Root>
          )}

          {/* 이메일 인증 — 별도 인증 완료 버튼 없이 코드 입력 후 비밀번호 재설정 버튼으로 한 번에 처리 */}
          <AuthenticationForm
            onSendCode={handleSendCode}
            onCodeChange={handleCodeChange}
            size={size}
          />

          <Input
            id="password"
            name="required-field"
            size={size}
            validationMode="onBlur"
            label="비밀번호"
            type="password"
            value={password}
            match="patternMismatch"
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,16}"
            requiredError="8~16자, 영문, 숫자, 특수문자 포함"
            description="8~16자, 영문, 숫자, 특수문자 포함"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            name="required-field"
            size={size}
            validationMode="onChange"
            type="password"
            label="비밀번호 확인"
            value={confirmPassword}
            match={passwordMismatch}
            requiredError="비밀번호가 일치하지 않습니다"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            size={size}
            variant="fill"
            type="submit"
            className="w-full text-white bg-primary-500 text-body4"
            disabled={passwordMismatch}
          >
            비밀번호 재설정
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
