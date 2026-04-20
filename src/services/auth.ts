import { api, publicApi } from "./api";

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean = false,
) => {
  const response = await publicApi.post("/api/v1/auth/login", {
    email,
    password,
    rememberMe,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/v1/auth/logout");
  localStorage.removeItem("access_token");
  return response.data;
};
