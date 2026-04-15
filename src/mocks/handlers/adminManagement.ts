import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const adminManagementHandlers = [
  http.get(`${BASE_URL}/api/v1/admin/admins`, () => {
    return HttpResponse.json({
      status: 200,
      code: "ADMIN_MANAGEMENT_SUCCESS",
      message: "관리자 목록을 조회했습니다.",
      data: {
        admins: [
          {
            id: "A001",
            name: "이관리",
            email: "admin1@example.com",
            phone: "010-1111-2222",
            grade: "Root",
            role: "ADMIN",
            created_at: "2023-06-01",
          },
          {
            id: "A002",
            name: "박운영",
            email: "admin2@example.com",
            phone: "010-2222-3333",
            grade: "일반",
            role: "ADMIN",
            created_at: "2023-07-15",
          },
          {
            id: "A003",
            name: "최팀장",
            email: "admin3@example.com",
            phone: "010-3333-4444",
            grade: "일반",
            role: "ADMIN",
            created_at: "2023-08-20",
          },
          {
            id: "A004",
            name: "정매니저",
            email: "admin4@example.com",
            phone: "010-4444-5555",
            grade: "일반",
            role: "ADMIN",
            created_at: "2023-09-05",
          },
          {
            id: "A005",
            name: "강슈퍼",
            email: "admin5@example.com",
            phone: "010-5555-6666",
            grade: "Super",
            role: "ADMIN",
            created_at: "2023-10-10",
          },
        ],
      },
    });
  }),

  http.put(`${BASE_URL}/api/v1/admin/admins/:id`, () => {
    return HttpResponse.json({
      status: 200,
      code: "ADMIN_UPDATE_SUCCESS",
      message: "관리자 정보가 수정되었습니다.",
      data: null,
    });
  }),
];
