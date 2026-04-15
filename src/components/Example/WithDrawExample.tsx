import { VStack, Text } from "@vapor-ui/core";
import WithDraw from "../../pages/User/MyPage/ProfileEdit/WithDraw/WithDraw";

export default function WithDrawExample() {
  return (
    <VStack
      $css={{ gap: "$200" }}
      className="w-fit p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <Text className="text-h4">회원탈퇴 모달 컴포넌트</Text>
      {/* 기본 WithDrawModal */}
      <WithDraw
        size="lg"
        description="회원 탈퇴 시 더이상 회원 혜택을 받으실 수 없습니다."
      />
    </VStack>
  );
}
