import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const admins = [
  {
    user_id: 1,
    name: "이관리",
    email: "admin1@example.com",
    phone: "010-1111-2222",
    grade: "BRONZE",
    role: "ADMIN",
    created_at: "2023-06-01",
  },
  {
    user_id: 2,
    name: "박운영",
    email: "admin2@example.com",
    phone: "010-2222-3333",
    grade: "BRONZE",
    role: "ADMIN",
    created_at: "2023-07-15",
  },
  {
    user_id: 3,
    name: "최팀장",
    email: "admin3@example.com",
    phone: "010-3333-4444",
    grade: "BRONZE",
    role: "ADMIN",
    created_at: "2023-08-20",
  },
  {
    user_id: 4,
    name: "정매니저",
    email: "admin4@example.com",
    phone: "010-4444-5555",
    grade: "BRONZE",
    role: "ROOT",
    created_at: "2023-09-05",
  },
];

export const adminManagementHandlers = [
  http.get(`${BASE_URL}/api/v1/root/accounts/admins`, () => {
    return HttpResponse.json({
      status: 200,
      code: "ADMIN_LIST_SUCCESS",
      message: "관리자 목록을 조회했습니다.",
      data: {
        content: admins,
        total_pages: 1,
        total_elements: 4,
        current_page: 0,
      },
    });
  }),

  http.patch(`${BASE_URL}/api/v1/root/accounts/:user_id/role`, () => {
    return HttpResponse.json({
      status: 200,
      code: "ROLE_UPDATE_SUCCESS",
      message: "사용자의 권한이 성공적으로 변경되었습니다.",
      data: null,
    });
  }),

  http.patch(`${BASE_URL}/api/v1/root/accounts/:user_id/grade`, () => {
    return HttpResponse.json({
      status: 200,
      code: "GRADE_UPDATE_SUCCESS",
      message: "사용자의 쇼핑 등급이 변경되었습니다.",
      data: null,
    });
  }),
];
