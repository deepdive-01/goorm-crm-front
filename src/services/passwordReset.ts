import { api } from "./api";

export const sendPasswordResetEmail = async (email: string) => {
  const response = await api.post("/api/v1/auth/password/email-verification", {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  email: string,
  authCode: string,
  newPassword: string,
) => {
  const response = await api.post("/api/v1/auth/password-reset", {
    email,
    auth_code: authCode,
    new_password: newPassword,
  });
  return response.data;
};
