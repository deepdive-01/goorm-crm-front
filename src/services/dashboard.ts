import { api } from "./api";

export async function fetchAdminMe() {
  const res = await api.get("/api/v1/admin/me");
  return res.data.data;
}

// 관리자 개인정보 수정 API
export async function updateAdminMe(payload: {
  name?: string;
  phone?: string;
}): Promise<void> {
  await api.patch("/api/v1/admin/me", payload);
}

export async function fetchDashboardStats() {
  const res = await api.get("/api/v1/admin/dashboard");
  return res.data.data;
}
