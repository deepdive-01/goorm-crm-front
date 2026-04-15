import { api } from "./api";

import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  DeleteAccountRequest,
} from "../types/user.types";

// 내 프로필 정보 조회
export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/api/v1/users/me");
  return response.data.data;
};

// 개인정보 수정
export const updateProfile = async (
  body: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch("/api/v1/users/me", body);
  return response.data.data;
};

// 회원 탈퇴
export const deleteAccount = async (
  body: DeleteAccountRequest,
): Promise<void> => {
  await api.delete("/api/v1/users/me", { data: body });
};
