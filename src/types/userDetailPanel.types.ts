// 드롭다운
export interface SelectDropdownProps {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  primary?: boolean; // 파란색 스타일
}

// 도시 목록
export const PROVINCES = [
  "서울",
  "경기",
  "부산",
  "인천",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const;

// 실제 API 등급 값 (대문자)
export const MEMBER_GRADES = ["MEMBER", "BRONZE", "SILVER", "GOLD"] as const;
// 관리자 권한 변경 옵션 — PATCH /api/v1/root/accounts/{user_id}/role
export const ADMIN_ROLES = ["ADMIN", "ROOT"] as const;
