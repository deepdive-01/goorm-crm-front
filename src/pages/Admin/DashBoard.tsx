import { useState, useEffect } from "react";
import SideBar from "../../components/admin/SideBar/SideBar";
import { fetchAdminMe } from "../../services/dashboard";

interface AdminUser {
  name: string;
  role: string;
}

export default function DashBoard() {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetchAdminMe().then(setUser);
    // fetchDashboardStats().then(setStats);
  }, [setUser]);
  return (
    <>
      <SideBar
        userName={user?.name || "관리자"}
        roleName={user?.role || "관리자"}
        roleLabel={user?.name || "관리자"}
      />
    </>
  );
}
