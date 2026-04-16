import { api } from "./api";

export type Grade = {
  grade_id: number;
  name: string;
  member_count: number;
  min_purchase_amount: number;
  discount_rate: number;
  reward_rate: number;
  is_free_shipping: boolean;
};

export type UpdateGradePayload = {
  min_purchase_amount: number;
  discount_rate: number;
  reward_rate: number;
  is_free_shipping: boolean;
};

export async function fetchGrades(): Promise<Grade[]> {
  const res = await api.get("/api/v1/root/grades");
  return res.data.data;
}

export async function updateGrade(
  grade_id: number,
  payload: UpdateGradePayload,
): Promise<void> {
  await api.patch(`/api/v1/root/grades/${grade_id}`, payload);
}
