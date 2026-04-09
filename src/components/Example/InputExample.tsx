import { VStack, Button } from "@vapor-ui/core";
import { useState } from "react";
import BaseInput from "../common/BaseInput/BaseInput";
import { SearchOutlineIcon } from "@vapor-ui/icons";

export default function InputExample() {
  const [telValue, setTelValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  return (
    <VStack $css={{ gap: "$100", margin: "$200" }}>
      <h3>인풋 컴포넌트 예시</h3>
      {/* 기본 input */}
      <BaseInput placeholder="text를 입력하세요" type="text" className="px-3" />
      <BaseInput
        placeholder="이메일을 입력하세요"
        type="email"
        className="px-3"
      />
      <BaseInput
        placeholder="비밀번호를 입력하세요"
        type="password"
        className="px-3"
      />
      <BaseInput
        placeholder="url을 입력하세요"
        type="url"
        size="lg"
        className="px-3"
      />
      {/* tel은 자동으로 010-0000-0000 형식으로 표시됌 */}
      <BaseInput
        placeholder="tel을 입력하세요"
        type="tel"
        value={telValue}
        onChange={setTelValue}
        className="px-3"
      />
      {/* number는 천단위로 구분되어 표시됌 (예: 1,000) */}
      <BaseInput
        placeholder="number를 입력하세요"
        type="number"
        value={numberValue}
        onChange={setNumberValue}
        className="px-3"
      />

      {/* suffix로 버튼 추가 */}
      <BaseInput
        placeholder="검색어를 입력하세요"
        type="search"
        suffix={
          <Button
            variant="fill"
            className="bg-primary-500 text-white px-3 text-body3 rounded-md"
          >
            <SearchOutlineIcon />
            검색
          </Button>
        }
        className="px-3"
      />

      {/* invalid 상태 */}
      <BaseInput placeholder="오류 상태" invalid className="px-3" />

      {/* disabled 상태 */}
      <BaseInput disabled defaultValue="비활성화된 값" className="px-3" />

      {/* readOnly 상태 */}
      <BaseInput placeholder="읽기 전용" readOnly className="px-3" />
    </VStack>
  );
}
