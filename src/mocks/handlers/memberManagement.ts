import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const managedMembers = [
  {
    user_id: 1,
    name: "김민준",
    email: "minjun@example.com",
    phone: "010-1234-5678",
    grade: "GOLD",
    role: "USER",
    status: "ACTIVE",
    created_at: "2024-01-15",
  },
  {
    user_id: 2,
    name: "이서연",
    email: "seoyeon@example.com",
    phone: "010-2345-6789",
    grade: "MEMBER",
    role: "USER",
    status: "ACTIVE",
    created_at: "2024-02-20",
  },
  {
    user_id: 3,
    name: "박지호",
    email: "jiho@example.com",
    phone: "010-3456-7890",
    grade: "MEMBER",
    role: "USER",
    status: "BANNED",
    created_at: "2024-01-30",
  },
  {
    user_id: 4,
    name: "최수아",
    email: "sua@example.com",
    phone: "010-4567-8901",
    grade: "GOLD",
    role: "USER",
    status: "ACTIVE",
    created_at: "2024-03-05",
  },
  {
    user_id: 5,
    name: "정도윤",
    email: "doyun@example.com",
    phone: "010-5678-9012",
    grade: "SILVER",
    role: "USER",
    status: "ACTIVE",
    created_at: "2024-03-10",
  },
];

export const memberManagementHandlers = [
  http.get(`${BASE_URL}/api/v1/root/accounts/users`, () => {
    return HttpResponse.json({
      status: 200,
      code: "USER_LIST_SUCCESS",
      message: "전체 사용자 목록을 성공적으로 조회했습니다.",
      data: {
        content: managedMembers,
        total_pages: 1,
        total_elements: 5,
        current_page: 0,
      },
    });
  }),

  http.patch(`${BASE_URL}/api/v1/admin/users/:user_id/status`, () => {
    return HttpResponse.json({
      status: 200,
      code: "USER_STATUS_UPDATED",
      message: "사용자 상태가 변경되었습니다.",
      data: null,
    });
  }),
];
