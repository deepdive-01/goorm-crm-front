import { VStack, Text } from "@vapor-ui/core";
import Title from "../common/Title/Title";

export default function InputExample() {
  return (
    <VStack
      $css={{ gap: "$200" }}
      className="w-fit p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <Text className="text-h4">Title 컴포넌트</Text>
      {/* 기본 title */}
      <Title title="제목" describe="Describes" />

      {/* describe 색 조정 */}
      <Title
        title="최유정"
        describe="goorm01@goorm.com"
        DesClassName="text-gray-300"
      />

      {/* 관리자 페이지 예시 */}
      <Title
        title="대시보드"
        describe="관리자 시스템의 주요 지표를 확인해보세요"
      />
    </VStack>
  );
}
