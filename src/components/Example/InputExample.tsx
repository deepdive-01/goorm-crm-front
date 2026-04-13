import { VStack, Text } from "@vapor-ui/core";
import Input from "../common/Input/Input";

export default function InputExample() {
  return (
    <VStack
      $css={{ gap: "$200" }}
      className="w-fit p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <Text className="text-h4">Input 컴포넌트</Text>
      {/* 기본 input */}
      <Input
        name="required-field"
        labelClassName="w-80"
        validationMode="onChange"
        label="필수 입력 항목"
        placeholder="필수 입력 항목입니다"
      />
      <Input
        name="optional-field"
        labelClassName="w-80"
        validationMode="onChange"
        label="선택 입력 항목 (선택사항)"
        placeholder="선택 입력 항목입니다"
      />
      <Input
        name="required-field"
        labelClassName="w-80"
        validationMode="onChange"
        label="비밀번호 (패턴 테스트)"
        type="password"
        match="patternMismatch"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,16}"
        requiredError="8~16자, 대소문자 영문, 특수문자 포함"
      />
      <Input
        name="optional-field"
        labelClassName="w-80"
        validationMode="onChange"
        label="이메일"
        description="이메일은 수정하실 수 없습니다."
        defaultValue="kimminseok@example.com"
        readonly
      />
      <Input
        name="required-field"
        labelClassName="w-80"
        validationMode="onChange"
        type="email"
        match="patternMismatch"
        label="이메일 (입력 값 테스트)"
        requiredError="올바른 이메일 형식으로 작성해주세요."
      />
    </VStack>
  );
}
