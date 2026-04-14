import { api } from "./api";

export async function fetchAdminMe() {
  const res = await api.get("/api/v1/admin/me");
  return res.data.data;
}

export async function fetchDashboardStats() {
  const res = await api.get("/api/v1/admin/dashboard");
  return res.data.data;
}
