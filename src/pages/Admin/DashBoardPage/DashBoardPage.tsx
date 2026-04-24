import { useQuery } from "@tanstack/react-query";
import DashBoard from "../../../components/admin/DashBoard/DashBoard";
import SideBar from "../../../components/admin/SideBar/SideBar";
// 대시보드 카드 데이터 API
import {
  fetchAdminMe,
  fetchMemberList,
  fetchAdminList,
} from "../../../services/dashboard";

// 등급 관리 API (카드 3에서 할인율, 무료배송 혜택 정보 조회용)
import { fetchGrades } from "../../../services/gradeManagement";
import type { DashBoardProps } from "../../../types/dashBoard.types";
import type {
  MemberListResponse,
  AdminListResponse,
} from "../../../types/DashBoardPage.types";
import type { Grade } from "../../../services/gradeManagement";

// 스켈레톤 디자인
function DashBoardSkeleton() {
  return (
    <div
      data-testid="dashboard-skeleton"
      className="flex flex-col gap-4 border-2 rounded-lg p-[36px] w-full animate-pulse"
    >
      <div className="flex gap-[10px] items-center">
        <div className="w-[44px] h-[44px] bg-gray-100 rounded-[12px]" />
        <div className="h-5 w-28 bg-gray-100 rounded" />
      </div>
      <div className="h-9 w-24 bg-gray-100 rounded" />
      <div className="flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between w-full">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-4 w-8 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="h-4 w-16 bg-gray-100 rounded" />
    </div>
  );
}

function buildCards(
  members: MemberListResponse,
  admins: AdminListResponse,
  grades: Grade[],
): DashBoardProps[] {
  // 첫 페이지 content에서 상태별 회원 수 집계
  const activeCount = members.content.filter(
    (m) => m.status === "ACTIVE",
  ).length;
  const bannedCount = members.content.filter(
    (m) => m.status === "BANNED",
  ).length;

  // 첫 페이지 content에서 등급별 회원 수 집계
  const goldCount = members.content.filter((m) => m.grade === "GOLD").length;
  const silverCount = members.content.filter(
    (m) => m.grade === "SILVER",
  ).length;
  const bronzeCount = members.content.filter(
    (m) => m.grade === "BRONZE",
  ).length;

  // 무료배송 혜택이 있는 등급 수 (is_free_shipping: true)
  const freeShippingCount = grades.filter((g) => g.is_free_shipping).length;

  return [
    // 전체 회원 수 + 상태
    {
      dashBoardImage: "/admin/DashBoard/MemberList.svg",
      color: "blue",
      mainTitle: "회원 목록",
      mainValue: members.total_elements, // 서버에서 내려주는 전체 회원 수
      mainValueVariant: "명",
      firstTitle: "전체 페이지",
      firstValue: members.total_pages,
      secondTitle: "활성 회원",
      secondValue: activeCount, // 현재 페이지 기준
      thirdTitle: "차단 회원",
      thirdValue: bannedCount, // 현재 페이지 기준
      routeButton: "상세보기 →",
      route: "/admin/members",
    },
    // 관리자 현황
    {
      dashBoardImage: "/admin/DashBoard/Admin.svg",
      color: "purple",
      mainTitle: "관리자 현황",
      mainValue: admins.total_elements, // 전체 관리자 수
      mainValueVariant: "명",
      firstTitle: "전체 페이지",
      firstValue: admins.total_pages,
      secondTitle: "등록 관리자",
      secondValue: admins.total_elements,
      thirdTitle: "ROOT 관리자",
      thirdValue: admins.content.filter((a) => a.role === "ROOT").length,
      routeButton: "상세보기 →",
      route: "/admin/admin-management",
    },
    // 등급 관련
    {
      dashBoardImage: "/admin/DashBoard/Rank.svg",
      color: "orange",
      mainTitle: "등급 관리",
      mainValue: grades.length, // 전체 등급 종류 수
      mainValueVariant: "개",
      firstTitle: grades[0]?.name ?? "-", // 첫 번째 등급 이름 (없으면 "-")
      firstValue: `${grades[0]?.discount_rate ?? 0}%`,
      secondTitle: grades[1]?.name ?? "-", // 두 번째 등급 이름
      secondValue: `${grades[1]?.discount_rate ?? 0}%`,
      thirdTitle: "무료배송 등급",
      thirdValue: freeShippingCount,
      routeButton: "상세보기 →",
      route: "/admin/grades",
    },

    // 등급 분포
    {
      dashBoardImage: "/admin/DashBoard/MemberManagement.svg",
      color: "green",
      mainTitle: "회원 등급 분포",
      mainValue: members.total_elements,
      mainValueVariant: "명",
      firstTitle: "GOLD",
      firstValue: goldCount, // 현재 페이지 기준
      secondTitle: "SILVER",
      secondValue: silverCount,
      thirdTitle: "BRONZE",
      thirdValue: bronzeCount,
      routeButton: "상세보기 →",
      route: "/admin/member-management",
    },
  ];
}

export default function DashBoardPage() {
  // 사이드바에 표시할 관리자 기본 정보
  const { data: user } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 회원 목록
  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ["memberList"],
    queryFn: fetchMemberList,
  });

  // 관리자 목록
  const { data: admins, isLoading: isAdminsLoading } = useQuery({
    queryKey: ["adminList"],
    queryFn: fetchAdminList,
  });

  // 등급 목록
  const { data: grades = [], isLoading: isGradesLoading } = useQuery({
    queryKey: ["grades"],
    queryFn: fetchGrades,
  });

  // 3개 핵심 데이터 중 하나라도 로딩 중이면 로딩 상태로 처리
  const isLoading = isMembersLoading || isAdminsLoading || isGradesLoading;
  const cards =
    members && admins && grades.length > 0
      ? buildCards(members, admins, grades)
      : [];

  return (
    <div className="flex min-h-screen">
      <SideBar
        userName={user?.name ?? "관리자"}
        roleName={user?.role ?? "관리자"}
        roleLabel={user?.name ?? "관리자"}
      />

      <main className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-body5 text-primary-500">대시보드</span>
          <h1 className="text-h2 font-bold">대시보드</h1>
          <div className="text-body2 font-medium text-gray-300">
            관리자 시스템의 주요 지표를 확인해보세요
          </div>
        </div>
        {/* 모든 데이터 로드 완료 시 카드 그리드, 그 전에는 스켈레톤 카드 표시 */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 max-w-[960px] w-full mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <DashBoardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 max-w-[960px] w-full mx-auto">
            {cards.map((card) => (
              <DashBoard key={card.mainTitle} {...card} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
