import { useState } from "react";
import { Button, Field, Form, VStack } from "@vapor-ui/core";
import Input from "../../../../components/common/Input/Input";

type AuthenticationFormProps = {
  onSendCode: (email: string) => Promise<void>;
  onSubmit: (email: string, code: string) => Promise<void>;
  submitLabel: string;
  showEndBtn?: boolean;
  children?: React.ReactNode;
};

export default function AuthenticationForm({
  onSendCode,
  onSubmit,
  submitLabel,
  showEndBtn,
  children,
}: AuthenticationFormProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    onSendCode(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, code);
  };

  return (
    <VStack
      render={<Form onSubmit={handleSubmit} />}
      $css={{ gap: "$200" }}
      className="w-96"
    >
      <Field.Root $css={{ gap: "$200" }}>
        <Field.Label
          htmlFor="auth-email"
          $css={{ flexDirection: "column" }}
          className="w-full"
        >
          <Input
            id="auth-email"
            value={email}
            size="lg"
            label="이메일"
            type="email"
            onChange={handleChange}
            match="typeMismatch"
            name="required-field"
            validationMode="onBlur"
            requiredError="올바른 이메일 형식으로 작성해주세요."
            inputClassName="rounded-r-none"
            suffix={
              <Button
                size="lg"
                variant="fill"
                disabled={!isValidEmail}
                onClick={handleSendCode}
                className="w-fit px-4 rounded-l-none bg-blue-500 text-white text-body4"
              >
                인증번호 받기
              </Button>
            }
          />
        </Field.Label>

        <Field.Label
          htmlFor="auth-code"
          $css={{ flexDirection: "column" }}
          className="w-full"
        >
          <Input
            id="auth-code"
            value={code}
            size="lg"
            label="인증번호"
            name="required-field"
            validationMode="onChange"
            requiredError="인증번호를 입력해주세요."
            onChange={(e) => setCode(e.target.value)}
          />
        </Field.Label>

        {children}

        {showEndBtn && (
          <Button
            size="lg"
            variant="fill"
            type="submit"
            className="w-full px-4 bg-blue-500 text-white text-body4"
            disabled={code.trim().length !== 6}
          >
            {submitLabel}
          </Button>
        )}
      </Field.Root>
    </VStack>
  );
}
