import { api } from "./api";

// 실제 API 응답 필드 기준 (GET /api/v1/root/accounts/admins)
export type ManagedAdmin = {
  user_id: number; // 실제 API: id가 아닌 user_id
  name: string;
  email: string;
  phone: string;
  grade: string; // "GOLD" | "SILVER" | "BRONZE" | "MEMBER"
  role: string;  // "ADMIN" | "ROOT"
  created_at: string;
};

// 관리자 목록 조회 (GET /api/v1/root/accounts/admins)
export async function fetchManagedAdmins(): Promise<ManagedAdmin[]> {
  const res = await api.get("/api/v1/root/accounts/admins");
  return res.data.data.content; // 실제 API: admins 아닌 content 배열
}

// 관리자 등급 변경 (PATCH /api/v1/root/accounts/{user_id}/grade)
export async function updateAdminGrade(
  user_id: number,
  grade: string,
): Promise<void> {
  await api.patch(`/api/v1/root/accounts/${user_id}/grade`, { grade });
}

// 관리자 권한(role) 변경 (PATCH /api/v1/root/accounts/{user_id}/role)
export async function updateAdminRole(
  user_id: number,
  role: string,
): Promise<void> {
  await api.patch(`/api/v1/root/accounts/${user_id}/role`, { role });
}
