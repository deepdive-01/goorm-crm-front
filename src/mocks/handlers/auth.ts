import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const authHandlers = [
  http.post(`${BASE_URL}/api/v1/auth/login`, () => {
    return HttpResponse.json({ code: "LOGIN_SUCCESS", data: {} });
  }),

  http.post(`${BASE_URL}/api/v1/auth/logout`, () => {
    return HttpResponse.json({ code: "LOGOUT_SUCCESS", data: {} });
  }),
];
