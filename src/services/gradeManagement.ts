import { api } from "./api";

// 실제 API 응답 필드 기준 (GET /api/v1/root/grades)
// member_count는 API 명세에 없으므로 제외
export type Grade = {
  grade_id: number;
  name: string;
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
