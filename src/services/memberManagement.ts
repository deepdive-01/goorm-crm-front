import { api } from "./api";

// 실제 API 응답 필드 기준 (GET /api/v1/root/accounts/users)
// address는 API 명세에 없으므로 제외
export type ManagedMember = {
  user_id: number; // 실제 API: id가 아닌 user_id
  name: string;
  email: string;
  phone: string;
  grade: string;  // "GOLD" | "SILVER" | "BRONZE" | "MEMBER"
  role: string;   // "USER"
  status: string; // "ACTIVE" | "BANNED"
  created_at: string;
};

// 회원 목록 조회 (GET /api/v1/root/accounts/users)
export async function fetchManagedMembers(): Promise<ManagedMember[]> {
  const res = await api.get("/api/v1/root/accounts/users");
  return res.data.data.content; // 실제 API: members가 아닌 content 배열
}

// 회원 상태 변경 (PATCH /api/v1/admin/users/{user_id}/status)
export async function updateMemberStatus(
  user_id: number,
  status: string,
): Promise<void> {
  await api.patch(`/api/v1/admin/users/${user_id}/status`, { status });
}

// 회원 등급 변경 (PATCH /api/v1/root/accounts/{user_id}/grade)
export async function updateMemberGrade(
  user_id: number,
  grade: string,
): Promise<void> {
  await api.patch(`/api/v1/root/accounts/${user_id}/grade`, { grade });
}
