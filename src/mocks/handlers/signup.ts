import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const signupHandlers = [
  http.post(
    `${BASE_URL}/api/v1/auth/signup/email-verification`,
    async ({ request }) => {
      const { email } = (await request.json()) as { email: string };

      return HttpResponse.json({
        code: "VERIFICATION_CODE_SENT",
        data: {
          email,
          expired_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        },
      });
    },
  ),

  http.post(
    `${BASE_URL}/api/v1/auth/signup/email-check`,
    async ({ request }) => {
      const { email, auth_code } = (await request.json()) as {
        email: string;
        auth_code: string;
      };

      return HttpResponse.json({
        code: "VERIFICATION_SUCCESS",
        data: {
          email,
          auth_code,
          verification_token: "mock-verification-token",
        },
      });
    },
  ),

  http.post(`${BASE_URL}/api/v1/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      verification_token: string;
    };

    if (!body.verification_token) {
      return HttpResponse.json(
        { code: "INVALID_TOKEN", message: "유효하지 않은 인증 토큰입니다." },
        { status: 403 },
      );
    }

    return HttpResponse.json({ code: "REGISTER_SUCCESS" }, { status: 201 });
  }),
];
