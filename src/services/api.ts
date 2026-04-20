import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청마다 localStorage의 토큰을 읽어 Authorization 헤더에 주입
// "undefined" 문자열이 저장된 경우도 무시
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인증 토큰 없이 요청하는 public API 인스턴스 (로그인, 회원가입, 이메일 인증 등)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
