import { useEffect, useState } from "react";
import DashBoard from "../../components/admin/DashBoard/DashBoard";
import SideBar from "../../components/admin/SideBar/SideBar";
import { fetchAdminMe, fetchDashboardStats } from "../../services/dashboard";
import type { DashBoardProps } from "../../types/dashBoard.types";
import type {
  AdminUser,
  DashboardStats,
} from "../../types/DashBoardPage.types";

// 카드 생성 함수
function buildCards(stats: DashboardStats): DashBoardProps[] {
  // API 응답에서 필요한 데이터 추출
  const { member_list, member_management, admin_management, grade_management } =
    stats;

  // 최근 활동 날짜를 한국어 형식으로 변환
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
      firstTitle: "이번 달 신규가입",
      firstValue: member_list.new_this_month,
      secondTitle: "활성 회원",
      secondValue: member_list.active_count,
      thirdTitle: "휴면 회원",
      thirdValue: member_list.dormant_count,
      routeButton: "상세보기 →",
      route: "/admin/members",
    },
    {
      dashBoardImage: "/admin/DashBoard/MemberManagement.svg",
      color: "green",
      mainTitle: "회원 관리",
      mainValue: member_management.total_count,
      mainValueVariant: "건",
      firstTitle: "등급 상승",
      firstValue: member_management.grade_upgraded,
      secondTitle: "등급 하락",
      secondValue: member_management.grade_downgraded,
      thirdTitle: "탈퇴 요청",
      thirdValue: member_management.withdrawal_requested,
      routeButton: "상세보기 →",
      route: "/admin/management",
    },
    {
      dashBoardImage: "/admin/DashBoard/Admin.svg",
      color: "purple",
      mainTitle: "관리자 관리",
      mainValue: admin_management.total_count,
      mainValueVariant: "명",
      firstTitle: "Root 관리자",
      firstValue: admin_management.root_admin_count,
      secondTitle: "일반 관리자",
      secondValue: admin_management.general_admin_count,
      thirdTitle: "최근 활동",
      thirdValue: lastActive,
      routeButton: "상세보기 →",
      route: "/admin/admins",
    },
    {
      dashBoardImage: "/admin/DashBoard/Rank.svg",
      color: "orange",
      mainTitle: "등급 관리",
      mainValue: grade_management.total_grade_count,
      mainValueVariant: "개",
      firstTitle: "VIP 등급",
      firstValue: grade_management.vip_member_count,
      secondTitle: "일반 등급",
      secondValue: grade_management.general_member_count,
      thirdTitle: "최근 등급 상승",
      thirdValue: grade_management.recent_grade_upgraded,
      routeButton: "상세보기 →",
      route: "/admin/grades",
    },
  ];
}

export default function DashBoardPage() {
  // API 응답 데이터 상태 관리
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // 컴포넌트 마운트 시 관리자 정보와 대시보드 통계 데이터를 API에서 가져옴
  useEffect(() => {
    fetchAdminMe()
      .then(setUser)
      .catch(() => {});
    fetchDashboardStats()
      .then(setStats)
      .catch(() => {});
  }, [setUser, setStats]); // setUser와 setStats가 변경 될 때마다 다시 실행

  const cards = stats ? buildCards(stats) : []; // stats가 존재할 때 카드 데이터 생성, 없으면 빈 배열

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <SideBar
        userName={user?.name ?? "관리자"}
        roleName={user?.role ?? "관리자"}
        roleLabel={user?.name ?? "관리자"}
      />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 p-5 flex flex-col items-center">
        <div className="w-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-body5 text-primary-500">대시보드</span>
            <h1 className="text-h1 font-bold">대시보드</h1>
            <div className="text-body1 font-medium text-gray-300">
              관리자 시스템의 주요 지표를 확인해보세요
            </div>
          </div>
          {stats ? (
            <div className="grid grid-cols-2 gap-6">
              {cards.map((card) => (
                <DashBoard key={card.mainTitle} {...card} />
              ))}
            </div>
          ) : (
            <p className="text-body4 text-gray-300">불러오는 중...</p>
          )}
        </div>
      </main>
    </div>
  );
}
