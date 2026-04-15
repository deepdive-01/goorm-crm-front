import { VStack, Text, HStack } from "@vapor-ui/core";

import { useUserContext } from "../../../../../context/UserContext";
import Edit from "../../../../../components/user/Edit/Edit";
import ShippingAddressModal from "./modal/ShippingAddressModal";

export default function ShippingAddress() {
  const { profile } = useUserContext();

  // profile.address는 "우편번호\n도로명주소\n상세주소" 형태로 저장됨
  const [zonecode, address, detailAddress] = (profile?.address ?? "").split(
    "\n",
  );

  const recipient = profile?.name ?? "";
  const phone = profile?.phone ?? "";

  return (
    <VStack
      $css={{ gap: "$200" }}
      className="w-full p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <HStack className="items-center justify-between w-full">
        <VStack>
          <HStack
            $css={{
              gap: "$100",
              alignItems: "center",
            }}
          >
            <Text className="text-h5">{recipient}</Text>
            <Text className="text-gray-300 text-body5">•</Text>
            <Text className="text-gray-400 text-body4">{phone}</Text>
          </HStack>
          <Text className="text-gray-400 text-body4">
            {address} {detailAddress} ({zonecode})
          </Text>
        </VStack>
        <Edit modal={<ShippingAddressModal />} />
      </HStack>
    </VStack>
  );
}
