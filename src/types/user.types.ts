export type UserGrade = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "WITHDRAWN";

export interface UserProfile {
  email: string;
  name: string;
  phone: string | null;
  address: string | null;
  grade: UserGrade;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone: string;
  address: string;
}

export interface UpdateProfileResponse {
  name: string;
  phone: string;
  address: string;
}

export interface DeleteAccountRequest {
  password: string;
  reason?: string;
}
