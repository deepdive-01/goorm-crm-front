import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const passwordResetHandlers = [
  http.post(
    `${BASE_URL}/api/v1/auth/password/email-verification`,
    async ({ request }) => {
      const { email } = (await request.json()) as { email: string };

      return HttpResponse.json({
        code: "RESET_CODE_SENT",
        data: {
          email,
          expired_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        },
      });
    },
  ),

  http.post(`${BASE_URL}/api/v1/auth/password-reset`, async ({ request }) => {
    const { email } = (await request.json()) as {
      email: string;
      auth_code: string;
      new_password: string;
    };

    return HttpResponse.json({
      code: "PASSWORD_RESET_SUCCESS",
      data: {
        email,
        updated_at: new Date().toISOString(),
      },
    });
  }),
];
