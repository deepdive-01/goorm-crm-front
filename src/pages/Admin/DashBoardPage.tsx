import { useEffect, useState } from "react";
import DashBoard from "../../components/admin/DashBoard/DashBoard";
import SideBar from "../../components/admin/SideBar/SideBar";
import { fetchAdminMe, fetchDashboardStats } from "../../services/dashboard";
import type { DashBoardProps } from "../../types/dashBoard.types";

interface AdminUser {
  name: string;
  role: string;
}

interface DashboardStats {
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

function buildCards(stats: DashboardStats): DashBoardProps[] {
  const { member_list, member_management, admin_management, grade_management } =
    stats;

  const lastActive = new Date(
    admin_management.last_active_at,
  ).toLocaleDateString("ko-KR");

  return [
    {
      dashBoardImage: "/admin/DashBoard/MemberList.svg",
      color: "blue",
      mainTitle: "회원 목록",
      mainValue: member_list.total_count,
      mainValueVariant: "명",
      firstTitle: "이번 달 신규",
      firstValue: member_list.new_this_month,
      secondTitle: "활성 회원",
      secondValue: member_list.active_count,
      thirdTitle: "휴면 회원",
      thirdValue: member_list.dormant_count,
      routeButton: "회원 목록 바로가기",
    },
    {
      dashBoardImage: "/admin/DashBoard/MemberManagement.svg",
      color: "green",
      mainTitle: "회원 관리",
      mainValue: member_management.total_count,
      mainValueVariant: "건",
      firstTitle: "등급 상향",
      firstValue: member_management.grade_upgraded,
      secondTitle: "등급 하향",
      secondValue: member_management.grade_downgraded,
      thirdTitle: "탈퇴 요청",
      thirdValue: member_management.withdrawal_requested,
      routeButton: "회원 관리 바로가기",
    },
    {
      dashBoardImage: "/admin/DashBoard/Admin.svg",
      color: "purple",
      mainTitle: "관리자 관리",
      mainValue: admin_management.total_count,
      mainValueVariant: "명",
      firstTitle: "루트 관리자",
      firstValue: admin_management.root_admin_count,
      secondTitle: "일반 관리자",
      secondValue: admin_management.general_admin_count,
      thirdTitle: "최근 활동",
      thirdValue: lastActive,
      routeButton: "관리자 관리 바로가기",
    },
    {
      dashBoardImage: "/admin/DashBoard/Rank.svg",
      color: "orange",
      mainTitle: "등급 관리",
      mainValue: grade_management.total_grade_count,
      mainValueVariant: "개",
      firstTitle: "VIP 회원",
      firstValue: grade_management.vip_member_count,
      secondTitle: "일반 회원",
      secondValue: grade_management.general_member_count,
      thirdTitle: "최근 등급 상향",
      thirdValue: grade_management.recent_grade_upgraded,
      routeButton: "등급 관리 바로가기",
    },
  ];
}

export default function DashBoardPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchAdminMe().then(setUser);
    fetchDashboardStats().then(setStats);
  }, []);

  const cards = stats ? buildCards(stats) : [];

  return (
    <div className="flex min-h-screen">
      <SideBar
        userName={user?.name ?? "관리자"}
        roleName={user?.role ?? "관리자"}
        roleLabel={user?.name ?? "관리자"}
      />
      <main className="flex-1 p-8">
        {stats ? (
          <div className="grid grid-cols-2 gap-6">
            {cards.map((card) => (
              <DashBoard key={card.mainTitle} {...card} />
            ))}
          </div>
        ) : (
          <p className="text-body4 text-gray-300">불러오는 중...</p>
        )}
      </main>
    </div>
  );
}
