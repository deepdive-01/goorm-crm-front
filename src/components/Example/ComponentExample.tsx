import { HStack } from "@vapor-ui/core";
import InputExample from "./InputExample";
import TitleExample from "./TitleExample";
import Table from "../admin/Table/Table";

export default function ComponentExample() {
  return (
    <HStack>
      <InputExample />
      <TitleExample />
      <Table
        variant="member"
        data={[
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            grade: "VIP",
            status: "active",
            joinDate: "2023-01-01",
          },
        ]}
      />
      <Table
        variant="simple"
        data={[
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
          },
        ]}
      />
    </HStack>
  );
}
