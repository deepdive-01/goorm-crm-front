import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// 멤버를 불러오는 핸들러
export const membersHandlers = [
  http.get(`${BASE_URL}/api/v1/admin/users`, () => {
    return HttpResponse.json({
      status: 200,
      code: "MEMBER_LIST_SUCCESS",
      message: "회원 목록을 조회했습니다.",
      data: {
        members: [
          {
            id: "U001",
            name: "김민준",
            email: "minjun@example.com",
            grade: "Gold",
            status: "활성",
            created_at: "2024-01-15",
          },
          {
            id: "U002",
            name: "이서연",
            email: "seoyeon@example.com",
            grade: "Member",
            status: "활성",
            created_at: "2024-02-03",
          },
          {
            id: "U003",
            name: "박지호",
            email: "jiho@example.com",
            grade: "Member",
            status: "휴면",
            created_at: "2023-11-20",
          },
          {
            id: "U004",
            name: "최수아",
            email: "sua@example.com",
            grade: "Gold",
            status: "활성",
            created_at: "2024-03-08",
          },
          {
            id: "U005",
            name: "정도윤",
            email: "doyun@example.com",
            grade: "Member",
            status: "활성",
            created_at: "2024-03-22",
          },
          {
            id: "U006",
            name: "강하은",
            email: "haeun@example.com",
            grade: "Silver",
            status: "휴면",
            created_at: "2023-09-11",
          },
          {
            id: "U007",
            name: "윤시우",
            email: "siwoo@example.com",
            grade: "Bronze",
            status: "활성",
            created_at: "2024-04-01",
          },
          {
            id: "U008",
            name: "임나은",
            email: "naeun@example.com",
            grade: "Member",
            status: "활성",
            created_at: "2024-04-05",
          },
          {
            id: "U009",
            name: "한지유",
            email: "jiyu@example.com",
            grade: "Gold",
            status: "활성",
            created_at: "2024-01-30",
          },
          {
            id: "U010",
            name: "오재원",
            email: "jaewon@example.com",
            grade: "Member",
            status: "휴면",
            created_at: "2023-07-19",
          },
          {
            id: "U011",
            name: "신예린",
            email: "yerin@example.com",
            grade: "Silver",
            status: "활성",
            created_at: "2024-04-10",
          },
          {
            id: "U012",
            name: "배현우",
            email: "hyunwoo@example.com",
            grade: "Gold",
            status: "활성",
            created_at: "2024-02-14",
          },
        ],
      },
    });
  }),
];
