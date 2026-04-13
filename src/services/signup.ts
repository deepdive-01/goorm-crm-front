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
  return response.data as {
    code: string;
    data: { email: string; verification_token: string };
  };
};

export const registerUser = async (body: {
  name: string;
  email: string;
  phone: string;
  password: string;
  verification_token: string;
}) => {
  const response = await api.post("/api/v1/auth/register", body);
  return response.data;
};
