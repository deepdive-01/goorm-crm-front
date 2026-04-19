export interface AdminUser {
  name: string;
  role: string;
}

export interface AdminProfile {
  email: string;
  name: string;
  phone: string;
  grade: string;
  role: string;
  created_at: string;
}

export interface MemberItem {
  user_id: number;
  email: string;
  name: string;
  role: string;
  grade: string;
  status: string;
  created_at: string;
}

export interface MemberListResponse {
  content: MemberItem[];
  total_pages: number;
  total_elements: number;
  current_page: number;
}

export interface AdminListResponse {
  content: AdminItem[];
  total_pages: number;
  total_elements: number;
  current_page: number;
}

export interface AdminItem {
  user_id: number;
  email: string;
  name: string;
  phone: string;
  grade: string;
  role: string;
}
