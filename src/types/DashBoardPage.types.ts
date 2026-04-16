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

export interface DashboardStats {
  member_list: {
    total_count: number;
    new_this_month: number;
    active_count: number;
    dormant_count: number;
  };
  member_management: {
    total_count: number;
    grade_upgraded: number;
    grade_downgraded: number;
    withdrawal_requested: number;
  };
  admin_management: {
    total_count: number;
    root_admin_count: number;
    general_admin_count: number;
    last_active_at: string;
  };
  grade_management: {
    total_grade_count: number;
    vip_member_count: number;
    general_member_count: number;
    recent_grade_upgraded: number;
  };
}
