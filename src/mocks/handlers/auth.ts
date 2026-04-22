import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// 테스트 계정으로 이 계정으로만 로그인 가능
const MOCK_USER = {
  email: "goorm01@goorm.com",
  password: "test1234!",
};

export const authHandlers = [
  http.post(`${BASE_URL}/api/v1/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // 이메일/비밀번호가 올바르지 않을 때 → 401 (목업 계정 제외 모두 401 처리됌)
    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      return HttpResponse.json(
        {
          code: "INVALID_CREDENTIALS",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 401 },
      );
    }

    // 로그인 성공 → access_token 발급
    return HttpResponse.json({
      code: "LOGIN_SUCCESS",
      data: {
        access_token: "mock-access-token",
        user: { email: MOCK_USER.email },
      },
    });
  }),

  http.post(`${BASE_URL}/api/v1/auth/logout`, () => {
    return HttpResponse.json({ code: "LOGOUT_SUCCESS", data: {} });
  }),
];
