import { HStack } from "@vapor-ui/core";
import InputExample from "./InputExample";
import TitleExample from "./TitleExample";
import DashBoard from "./DashBoardExample";

export default function ComponentExample() {
  return (
    <HStack>
      <InputExample />
      <TitleExample />
      <DashBoard />
    </HStack>
  );
}
