import { HttpResponse, http } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const grades = [
  {
    grade_id: 1,
    name: "Member",
    member_count: 50,
    min_purchase_amount: 0,
    discount_rate: 3,
    reward_rate: 3,
    is_free_shipping: false,
  },
  {
    grade_id: 2,
    name: "Bronze",
    member_count: 100,
    min_purchase_amount: 100000,
    discount_rate: 5,
    reward_rate: 5,
    is_free_shipping: true,
  },
  {
    grade_id: 3,
    name: "Silver",
    member_count: 3000,
    min_purchase_amount: 200000,
    discount_rate: 7,
    reward_rate: 7,
    is_free_shipping: true,
  },
  {
    grade_id: 4,
    name: "Gold",
    member_count: 4000,
    min_purchase_amount: 500000,
    discount_rate: 10,
    reward_rate: 7,
    is_free_shipping: true,
  },
];

export const gradeManagementHandlers = [
  // 등급 목록 조회
  http.get(`${BASE_URL}/api/v1/root/grades`, () => {
    return HttpResponse.json({
      status: 200,
      code: "GRADE_LIST_SUCCESS",
      message: "등급 목록을 성공적으로 조회했습니다.",
      data: grades,
    });
  }),

  // 특정 등급 상세 조회
  http.get(`${BASE_URL}/api/v1/root/grades/:grade_id`, ({ params }) => {
    const grade = grades.find((g) => g.grade_id === Number(params.grade_id));
    if (!grade) {
      return HttpResponse.json(
        {
          status: 404,
          code: "GRADE_NOT_FOUND",
          message: "존재하지 않는 등급입니다.",
          data: null,
        },
        { status: 404 },
      );
    }
    return HttpResponse.json({
      status: 200,
      code: "GRADE_DETAIL_SUCCESS",
      message: "등급 상세 정보를 조회했습니다.",
      data: grade,
    });
  }),

  // 등급 혜택 수정
  http.patch(`${BASE_URL}/api/v1/root/grades/:grade_id`, () => {
    return HttpResponse.json({
      status: 200,
      code: "GRADE_UPDATE_SUCCESS",
      message: "등급 혜택 정보가 성공적으로 수정되었습니다.",
      data: null,
    });
  }),
];
