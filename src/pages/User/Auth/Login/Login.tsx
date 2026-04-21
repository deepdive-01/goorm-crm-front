import { useNavigate } from "react-router-dom";

import {
  Button,
  Callout,
  VStack,
  Text,
  HStack,
  TextInput,
  Field,
  Checkbox,
} from "@vapor-ui/core";

import Spinner from "../../../../components/common/Spinner/Spinner";

import { useLogin } from "../../../../hooks/useLogin";
import Input from "../../../../components/common/Input/Input";

export default function Login() {
  const navigate = useNavigate();
  const {
    email,
    password,
    rememberMe,
    emailError,
    loginError,
    isLoggingIn,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handleRememberMeChange,
    handleLogin,
  } = useLogin();

  const size = "md";

  return (
    // noValidate: 브라우저 네이티브 유효성 검사 비활성화 → 커스텀 검증만 사용
    <VStack
      render={<form onSubmit={handleLogin} noValidate />}
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
        <Text className="text-h2">로그인</Text>
        <VStack $css={{ gap: "$200" }} className="w-full">
          {/* 서버 응답 에러 (잘못된 자격증명 등) */}
          {loginError && (
            <Callout.Root colorPalette="warning" className="text-body5">
              {loginError}
            </Callout.Root>
          )}

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="login-email" className="text-gray-400 text-body4">
              이메일
            </label>
            <TextInput
              id="login-email"
              size={size}
              type="email"
              value={email}
              autoComplete="email"
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className="w-full px-3 text-body4"
            />
            {emailError && (
              <p className="text-body5 text-semantic-red">{emailError}</p>
            )}
          </div>

          {/* 비밀번호: vapor-ui Field의 patternMismatch로 형식 검증 */}
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
            onChange={handlePasswordChange}
          />

          <HStack className="items-center justify-between w-full">
            <Field.Root>
              <Field.Item>
                <Checkbox.Root
                  id="login-auto-login"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    handleRememberMeChange(!!checked)
                  }
                />
                <Field.Label className="text-gray-400 truncate w-fit text-body5">
                  자동 로그인
                </Field.Label>
              </Field.Item>
            </Field.Root>

            <Button
              type="button"
              className="text-body5 text-gray-400 hover:before:!opacity-0"
              onClick={() => navigate("/resetPassword")}
            >
              비밀번호 재설정
            </Button>
          </HStack>

          {/* VStack의 render를 통해 type = submit으로 폼 제출 */}
          <Button
            size={size}
            variant="fill"
            type="submit"
            disabled={isLoggingIn}
            className="flex items-center justify-center w-full gap-2 text-white bg-primary-500 text-body4"
          >
            {isLoggingIn && <Spinner size={16} />}
            {isLoggingIn ? "로그인 중..." : "로그인"}
          </Button>

          {/* type="button"으로 폼 제출 방지 후 라우팅 */}
          <Button
            size={size}
            type="button"
            className="w-full text-gray-400 border border-gray-100 text-body4"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
