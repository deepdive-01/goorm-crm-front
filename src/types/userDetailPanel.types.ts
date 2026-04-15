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

export const MEMBER_GRADES = ["Member", "Bronze", "Silver", "Gold"] as const;
export const ADMIN_GRADES = ["Root", "일반"] as const;
