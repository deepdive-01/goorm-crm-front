import { VStack, Text } from "@vapor-ui/core";

import { useUserContext } from "../../../../context/UserContext";
import Edit from "../../../../components/user/Edit/Edit";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import WithDraw from "./WithDraw/WithDraw";

/**
 * Tab에서 page prop으로 전달되므로 recipient/email/phone을 받는 형태를 유지
 * 실제 최신 값은 UserContext에서 직접 읽어 사용
 */
type ProfileEditProps = { recipient: string; email: string; phone: string };

export default function ProfileEdit({ email }: ProfileEditProps) {
  const { profile, updateProfile } = useUserContext();

  // UserContext에서 최신 값을 읽어 Edit의 초기값으로 사용
  const name = profile?.name ?? "";
  const phone = profile?.phone ?? "";
  const address = profile?.address ?? "";

  // updateProfile은 name/phone/address 세 필드를 한 번에 전송하므로
  // 수정하지 않는 필드는 현재 값을 그대로 넘겨 덮어씌워지지 않도록 처리
  const handleConfirm = (field: "name" | "phone") => async (value: string) => {
    await updateProfile({ name, phone, address, [field]: value });
  };

  return (
    <VStack className="justify-start w-10/12 gap-10 pb-10">
      {/* 이름 */}
      <VStack className="gap-2">
        <Text className="text-body2">이름</Text>
        <Edit
          size="lg"
          inputClassName="w-full"
          displayValue={name}
          defaultValue={name}
          onConfirm={handleConfirm("name")}
        />
      </VStack>

      {/* 이메일: 변경 불가 */}
      <VStack className="gap-2">
        <Text className="text-body2">이메일</Text>
        <Edit
          size="lg"
          inputClassName="w-full"
          displayValue={email}
          defaultValue={email}
          noneEdit
        />
      </VStack>

      {/* 전화번호: type="tel"로 자동 포맷(010-0000-0000) 적용 */}
      <VStack className="gap-2">
        <Text className="text-body2">전화번호</Text>
        <Edit
          size="lg"
          inputClassName="w-full"
          type="tel"
          displayValue={phone}
          defaultValue={phone}
          onConfirm={handleConfirm("phone")}
        />
      </VStack>

      {/* 배송지: ShippingAddressModal에서 name/phone/address를 함께 저장 */}
      <VStack className="w-7/12 gap-2">
        <Text className="text-body2">배송지</Text>

        <ShippingAddress />
      </VStack>

      {/* 회원 탈퇴하기 */}
      <WithDraw />
    </VStack>
  );
}
