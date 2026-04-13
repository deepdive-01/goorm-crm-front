import { Button, Callout, VStack, Text } from "@vapor-ui/core";

import { useSignup } from "../../../hooks/useSignup";
import AuthenticationForm from "../components/AuthenticationForm/AuthenticationForm";
import Input from "../../../components/common/Input/Input";

export default function SignupForm() {
  const {
    name,
    phone,
    passwordMismatch,
    signupError,
    setName,
    setPhone,
    setPassword,
    setConfirmPassword,
    handleSendCode,
    handleVerify,
    handleRegister,
  } = useSignup();

  const size = "md";

  return (
    <VStack
      render={<form onSubmit={handleRegister} noValidate />}
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
        <Text className="text-h2">회원가입</Text>
        <VStack $css={{ gap: "$200" }} className="w-full">
          {signupError && (
            <Callout.Root colorPalette="warning" className="text-body5">
              {signupError}
            </Callout.Root>
          )}

          <Input
            name="required-field"
            validationMode="onBlur"
            label="이름"
            type="text"
            id="name"
            size={size}
            match="valueMissing"
            requiredError="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            name="required-field"
            validationMode="onBlur"
            label="전화번호"
            type="tel"
            id="tel"
            size={size}
            match="valueMissing"
            requiredError="전화번호를 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <AuthenticationForm
            onSendCode={handleSendCode}
            onSubmit={handleVerify}
            submitLabel="인증 완료"
            showEndBtn
            size={size}
          />

          <Input
            id="password"
            name="required-field"
            size={size}
            validationMode="onBlur"
            label="비밀번호"
            type="password"
            match="patternMismatch"
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,16}"
            requiredError="8~16자, 영문, 숫자, 특수문자 포함"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            name="required-field"
            size={size}
            validationMode="onChange"
            type="password"
            label="비밀번호 확인"
            match={passwordMismatch}
            requiredError="비밀번호가 일치하지 않습니다"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            size={size}
            variant="fill"
            type="submit"
            className="w-full text-white bg-blue-500 text-body4"
            disabled={passwordMismatch}
          >
            회원가입
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
