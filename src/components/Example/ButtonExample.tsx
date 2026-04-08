import { VStack } from "@vapor-ui/core";
import { SaveOutlineIcon } from "@vapor-ui/icons";
import BaseButton from "../common/BaseButton/BaseButton";

const handleSave = () => {
  alert("저장되었습니다.");
};

export default function ButtonExample() {
  return (
    <VStack $css={{ gap: "$100", margin: "$200" }}>
      <h3>버튼 컴포넌트 예시</h3>
      {/* 아이콘 위치를 오른쪽으로 변경하고싶다면 iconPosition="right" 추가 */}
      <BaseButton
        label="아이콘 예시"
        icon={<SaveOutlineIcon />}
        size="lg"
        variant="fill"
        className="bg-primary-500 text-white text-body3 w-[40%] rounded-xl"
        onClick={handleSave}
      />

      {/* outline 스타일을 적용하기 위해 box-shadow를 활용하여 테두리를 표현 */}
      <BaseButton
        label="Outline 예시"
        variant="outline"
        className="![box-shadow:inset_0_0_0_1px_#7B7B7B] text-gray-300 text-body3 px-4"
      />

      {/* hover 시 opacity가 0이 되도록 설정하려면 hover:before:!opacity-0 추가 */}
      <BaseButton
        label="Ghost 예시"
        variant="ghost"
        className="text-semantic-red text-body3 hover:before:!opacity-0"
      />

      {/* 높이 조절은 size props를 사용하여 조절 (Vapor에서 제공하는 size 옵션) */}
      <BaseButton
        label="크기예시"
        size="lg"
        variant="fill"
        className="px-4 text-semantic-green bg-semantic-greenSoft text-body2"
      />
    </VStack>
  );
}
