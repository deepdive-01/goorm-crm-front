import { api } from "./api";
import type { MemberRow } from "../types/table.types";

// 실제 API 응답 필드 기준 인터페이스 (GET /api/v1/admin/users)
export interface Member {
  user_id: number; // 실제 API는 id가 아닌 user_id
  email: string;
  name: string;
  role: string;
  grade: string;   // "GOLD" | "SILVER" | "BRONZE" | "MEMBER"
  status: string;  // "ACTIVE" | "BANNED"
  created_at: string;
}

// 회원 리스트를 가져오는 함수
// 실제 API 응답: { content: Member[], total_pages, total_elements, current_page }
export async function fetchMembers(): Promise<MemberRow[]> {
  const res = await api.get("/api/v1/admin/users");
  const members: Member[] = res.data.data.content; // 실제 API는 members가 아닌 content

  return members.map((m) => ({
    row_1: m.user_id, // 실제 API는 id가 아닌 user_id
    row_2: m.name,
    row_3: m.email,
    row_4: m.grade,
    row_5: m.status,
    row_6: m.created_at,
  }));
}
