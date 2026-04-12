import { api } from "./api";

export const sendVerificationEmail = async (email: string) => {
  const response = await api.post("/api/v1/auth/signup/email-verification", {
    email,
  });
  return response.data;
};

export const verifyAuthCode = async (email: string, authCode: string) => {
  const response = await api.post("/api/v1/auth/signup/email-check", {
    email,
    auth_code: authCode,
  });
  return response.data;
};
