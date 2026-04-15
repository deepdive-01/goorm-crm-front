import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const MOCK_PROFILE = {
  email: "goorm01@goorm.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: "06234\n서울시 강남구 테헤란로 123\n101동 202호",
  grade: "BRONZE",
  role: "USER",
  status: "ACTIVE",
  created_at: "2026-04-03T10:00:00Z",
};

export const userHandlers = [
  // 내 프로필 정보 조회
  http.get(`${BASE_URL}/api/v1/users/me`, () => {
    return HttpResponse.json({
      status: 200,
      code: "PROFILE_FETCH_SUCCESS",
      message: "내 프로필 정보를 조회했습니다.",
      data: MOCK_PROFILE,
    });
  }),

  // 개인정보 수정
  http.patch(`${BASE_URL}/api/v1/users/me`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      phone: string;
      address: string;
    };

    // 목업 데이터 업데이트
    MOCK_PROFILE.name = body.name ?? MOCK_PROFILE.name;
    MOCK_PROFILE.phone = body.phone ?? MOCK_PROFILE.phone;
    MOCK_PROFILE.address = body.address ?? MOCK_PROFILE.address;

    return HttpResponse.json({
      status: 200,
      code: "PROFILE_UPDATE_SUCCESS",
      message: "개인정보가 성공적으로 수정되었습니다.",
      data: {
        name: MOCK_PROFILE.name,
        phone: MOCK_PROFILE.phone,
        address: MOCK_PROFILE.address,
      },
    });
  }),

  // 회원 탈퇴
  http.delete(`${BASE_URL}/api/v1/users/me`, async ({ request }) => {
    const body = (await request.json()) as {
      password: string;
      reason?: string;
    };

    if (body.password !== "test1234!") {
      return HttpResponse.json(
        {
          status: 401,
          code: "TOKEN_EXPIRED",
          message: "세션이 만료되었습니다. 다시 로그인해주세요.",
          data: null,
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      status: 200,
      code: "WITHDRAWAL_SUCCESS",
      message: "회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.",
      data: null,
    });
  }),
];
