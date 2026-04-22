export type UserGrade = "MEMBER" | "BRONZE" | "SILVER" | "GOLD";
export type UserRole = "USER" | "ADMIN" | "ROOT";
export type UserStatus = "ACTIVE" | "BANNED" | "SUSPENDED" | "DELETED";

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
