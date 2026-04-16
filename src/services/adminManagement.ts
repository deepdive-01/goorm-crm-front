import { api } from "./api";

export type ManagedAdmin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  role: string;
  created_at: string;
};

export async function fetchManagedAdmins(): Promise<ManagedAdmin[]> {
  const res = await api.get("/api/v1/admin/admins");
  return res.data.data.admins;
}

export async function updateManagedAdmin(
  id: string,
  payload: Partial<Pick<ManagedAdmin, "grade" | "phone">>,
): Promise<void> {
  await api.put(`/api/v1/admin/admins/${id}`, payload);
}
