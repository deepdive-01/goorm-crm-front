import { Skeleton, VStack, Text } from "@vapor-ui/core";

import { useUserContext } from "../../../../context/UserContext";
import GradeBar from "./GradeBar/GradeBar";
import GradeTable from "./GradeTable/GradeTable";

export default function Grade() {
  const { profile, isLoading } = useUserContext();

  const name = profile?.name ?? "";
  const grade = profile?.grade ?? "";

  return (
    <VStack className="justify-start w-10/12 gap-10 pb-10">
      {/* 이름 + 등급 바: 프로필 로드 전 Skeleton으로 대체 */}
      {isLoading ? (
        <>
          <Skeleton shape="square" className="w-48" />
          <Skeleton shape="square" className="w-full" />
        </>
      ) : (
        <>
          <Text className="text-h4">{name}님의 등급</Text>
          <GradeBar grade={grade} />
        </>
      )}

      <hr />

      <Text className="text-h4">
        {new Date().getFullYear()}년 등급 선정 기준
      </Text>
      {/* GradeTable은 정적 데이터라 Skeleton 불필요 */}
      <GradeTable />
    </VStack>
  );
}
