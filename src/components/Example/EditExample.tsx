import { VStack, Text } from "@vapor-ui/core";
import Edit from "../user/Edit/Edit";

export default function EditExample() {
  return (
    <VStack
      $css={{ gap: "$200" }}
      className="p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <Text className="text-h4">Input 컴포넌트</Text>
      <Text className="text-body4">클릭 시 수정 컴포넌트 열림</Text>
      {/* 기본 Edit */}
      <Edit
        name="required-field"
        id="name"
        type="text"
        size="md"
        labelClassName="w-full"
      ></Edit>
    </VStack>
  );
}
