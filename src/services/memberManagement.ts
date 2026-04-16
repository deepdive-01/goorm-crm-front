import { api } from "./api";

export type ManagedMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  grade: string;
  role: string;
  status: string;
  created_at: string;
};

export async function fetchManagedMembers(): Promise<ManagedMember[]> {
  const res = await api.get("/api/v1/admin/members/management");
  return res.data.data.members;
}

export async function updateManagedMember(
  id: string,
  payload: Partial<
    Pick<ManagedMember, "grade" | "status" | "address" | "phone">
  >,
): Promise<void> {
  await api.put(`/api/v1/admin/members/management/${id}`, payload);
}
