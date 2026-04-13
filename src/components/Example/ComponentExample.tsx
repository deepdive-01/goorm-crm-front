import { HStack } from "@vapor-ui/core";
import InputExample from "./InputExample";
import TitleExample from "./TitleExample";
import Table from "../admin/Table/Table";
import DashBoard from "./DashBoardExample";
import SideBar from "../admin/SideBar/SideBar";

export default function ComponentExample() {
  return (
    <HStack $css={{ flexWrap: "wrap", margin: "$300", gap: "$300" }}>
      <InputExample />
      <TitleExample />
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
      <DashBoard />
      <SideBar />
    </HStack>
  );
}
