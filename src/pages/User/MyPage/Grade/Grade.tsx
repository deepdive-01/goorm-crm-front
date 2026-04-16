import { VStack, Text } from "@vapor-ui/core";

import { useUserContext } from "../../../../context/UserContext";
import GradeBar from "./GradeBar/GradeBar";
import GradeTable from "./GradeTable/GradeTable";

export default function Grade() {
  const { profile } = useUserContext();

  const name = profile?.name ?? "";
  const grade = profile?.grade ?? "";

  return (
    <VStack className="justify-start w-10/12 gap-10 pb-10">
      <Text className="text-h4">{name}님의 등급</Text>
      <GradeBar grade={grade} />

      <hr />

      <Text className="text-h4">
        {new Date().getFullYear()}년 등급 선정 기준
      </Text>
      <GradeTable />
    </VStack>
  );
}
