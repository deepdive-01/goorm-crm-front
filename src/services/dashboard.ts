import { api } from "./api";

export async function fetchAdminMe() {
  const res = await api.get("/api/v1/admin/me");
  return res.data.data;
}

export async function updateAdminMe(payload: {
  name?: string;
  phone?: string;
}): Promise<void> {
  await api.patch("/api/v1/admin/me", payload);
}

export async function fetchMemberList() {
  const res = await api.get("/api/v1/admin/users");
  return res.data.data;
}

export async function fetchAdminList() {
  const res = await api.get("/api/v1/root/accounts/admins");
  return res.data.data;
}
