import { VStack, Text } from "@vapor-ui/core";
import Edit from "../user/Edit/Edit";
import ShippingAddressModal from "../../pages/User/MyPage/ProfileEdit/ShippingAddress/modal/ShippingAddressModal";
import ShippingAddress from "../../pages/User/MyPage/ProfileEdit/ShippingAddress/ShippingAddress";

export default function ShippingAddressExample() {
  return (
    <VStack
      $css={{ gap: "$200" }}
      className="w-1/2 p-7 border-[1px] border-gray-100 rounded-lg"
    >
      <Text className="text-h4">ShippingAddressModal</Text>
      {/* 기본 ShippingAddressModal */}
      <Edit modal={<ShippingAddressModal />} />

      <Text className="text-h4">ShippingAddress</Text>
      {/* 기본 ShippingAddress */}
      <ShippingAddress />
    </VStack>
  );
}
