import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const dashboardHandlers = [
  http.get(`${BASE_URL}/api/v1/admin/me`, () => {
    return HttpResponse.json({
      status: 200,
      code: "ADMIN_PROFILE_SUCCESS",
      message: "관리자 프로필 정보를 조회했습니다.",
      data: {
        email: "admin@shop.com",
        name: "운영팀장",
        phone: "010-1111-2222",
        grade: "BRONZE",
        role: "ADMIN",
        created_at: "2026-01-01T09:00:00Z",
      },
    });
  }),

  // 현재 대시보드의 대한 API는 만들어지지 않았습니다.
  // 우선 테스트를 위해 임시로 대시보드 요약 API를 반환하도록 했으며
  // 추후 회의를 통해 추가 결정이 되면 대시보드 API를 요청하고
  // 만약 만들기 어렵다면 각각 API를 요청하여 대시보드 데이터를 구성할 예정입니다.
  http.get(`${BASE_URL}/api/v1/admin/dashboard`, () => {
    return HttpResponse.json({
      status: 200,
      code: "DASHBOARD_SUMMARY_SUCCESS",
      message: "대시보드 요약 정보를 조회했습니다.",
      data: {
        member_list: {
          total_count: 1300,
          new_this_month: 123,
          active_count: 600,
          dormant_count: 34,
        },
        member_management: {
          total_count: 23,
          grade_upgraded: 23,
          grade_downgraded: 12,
          withdrawal_requested: 23,
        },
        admin_management: {
          total_count: 10,
          root_admin_count: 2,
          general_admin_count: 6,
          last_active_at: "2026-04-14T13:30:00Z",
        },
        grade_management: {
          total_grade_count: 5,
          vip_member_count: 30,
          general_member_count: 888,
          recent_grade_upgraded: 120,
        },
      },
    });
  }),
];
