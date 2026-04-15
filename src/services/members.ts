import { api } from "./api";
import type { MemberRow } from "../types/table.types";

// 회원 인터페이스
export interface Member {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: string;
  created_at: string;
}

// 회원 리스트를 가져오는 함수
export async function fetchMembers(): Promise<MemberRow[]> {
  const res = await api.get("/api/v1/admin/users");
  const members: Member[] = res.data.data.members;

  return members.map((m) => ({
    row_1: m.id,
    row_2: m.name,
    row_3: m.email,
    row_4: m.grade,
    row_5: m.status,
    row_6: m.created_at,
  }));
}
