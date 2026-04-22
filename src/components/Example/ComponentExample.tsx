import { HStack } from "@vapor-ui/core";
import InputExample from "../Example/InputExample";
import TitleExample from "../Example/TitleExample";
import Table from "../admin/Table/Table";
import DashBoardExample from "../Example/DashBoardExample";
import SideBar from "../admin/SideBar/SideBar";
import EditExample from "../Example/EditExample";
import NavExample from "../Example/NavExample";
import ShippingAddressExample from "../Example/ShippingAddressExample";
import WithDrawExample from "../Example/WithDrawExample";

export default function ComponentExample() {
  return (
    <>
      <NavExample />
      <HStack $css={{ flexWrap: "wrap", margin: "$300", gap: "$300" }}>
        <InputExample />
        <TitleExample />
        <EditExample />
        <WithDrawExample />
        <Table
          variant="member"
          headings={["ID", "이름", "이메일", "등급", "상태", "가입일"]}
          data={[
            {
              row_1: "01",
              row_2: "John Doe",
              row_3: "john@example.com",
              row_4: "VIP",
              row_5: "active",
              row_6: "2023-01-01",
            },
          ]}
        />
        <ShippingAddressExample />
        <DashBoardExample />
        <SideBar userName="관리자A" roleName="관리자" roleLabel="관리자A" />
      </HStack>
    </>
  );
}
