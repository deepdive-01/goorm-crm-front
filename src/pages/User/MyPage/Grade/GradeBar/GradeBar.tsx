import { VStack, HStack, Text } from "@vapor-ui/core";

import { GRADES, GRADE_TEXT_COLORS, GRADE_BAR_COLORS } from "../gradeConfig";

type GradeBarProps = {
  grade: string;
};

export default function GradeBar({ grade }: GradeBarProps) {
  const gradeIndex = GRADES.indexOf(grade as (typeof GRADES)[number]);

  // MEMBER=0%, BRONZE=33%, SILVER=66%, GOLD=100%
  // 알 수 없는 등급이면 gradeIndex=-1 → 0%
  const progressPercent = (gradeIndex / (GRADES.length - 1)) * 100;

  return (
    <VStack className="gap-12">
      {/* 등급 라벨: 현재 등급만 등급별 색상 + bold, 나머지는 gray-300 */}
      <HStack className="justify-between w-full">
        {GRADES.map((item) => (
          <Text
            key={item}
            className={`text-body2 ${item === grade ? `${GRADE_TEXT_COLORS[item]} font-semibold` : "text-gray-300"}`}
          >
            {item}
          </Text>
        ))}
      </HStack>

      {/* 회색 배경 바 위에 등급 진행 바를 겹쳐서 표시 */}
      {/* 등급 진행 바 색은 사용자의 등급 색상으로 표시 */}
      <div className="relative w-full h-3 rounded-full bg-gray-90">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${GRADE_BAR_COLORS[grade as (typeof GRADES)[number]] ?? "bg-gray-300"}`}
          style={{ width: gradeIndex >= 0 ? `${progressPercent}%` : "0%" }}
        />
      </div>
    </VStack>
  );
}
