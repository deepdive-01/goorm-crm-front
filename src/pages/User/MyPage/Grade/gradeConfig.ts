// 등급 순서 (낮은 등급 → 높은 등급)
export const GRADES = ["MEMBER", "BRONZE", "SILVER", "GOLD"] as const;

export type GradeType = (typeof GRADES)[number];

// 등급별 텍스트 색상
// - GradeBar 라벨: 활성 등급에 적용, 비활성은 text-gray-300
// - GradeTable 등급명 셀에 적용
export const GRADE_TEXT_COLORS: Record<GradeType, string> = {
  MEMBER: "text-gray-300",
  BRONZE: "text-primary-300",
  SILVER: "text-primary-400",
  GOLD: "text-primary-500",
};

// 등급별 진행 바 배경색 (GradeBar 진행 바에 적용)
export const GRADE_BAR_COLORS: Record<GradeType, string> = {
  MEMBER: "bg-gray-300",
  BRONZE: "bg-primary-300",
  SILVER: "bg-primary-400",
  GOLD: "bg-primary-500",
};
