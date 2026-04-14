import { api } from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/v1/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/v1/auth/logout");
  return response.data;
};
