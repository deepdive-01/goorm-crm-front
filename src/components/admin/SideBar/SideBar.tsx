import React from "react";
import {
  CaretDownIcon,
  ChevronLeftOutlineIcon,
  ChevronRightOutlineIcon,
  UserIcon,
} from "@vapor-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import { useSidebar } from "./useSidebar";
import { useState } from "react";

// 네비게이션 아이템 정의: 경로, 레이블, 아이콘
const NAV_ITEMS = [
  {
    path: "/admin/notifications",
    label: "알림",
    icon: "/admin/SideBar/BellOnOutlineIcon.svg",
  },
  {
    path: "/admin",
    label: "대시보드",
    icon: "/admin/SideBar/HomeOutlineIcon.svg",
  },
  {
    path: "/admin/members",
    label: "회원 목록",
    icon: "/admin/SideBar/GroupOutlineIcon.svg",
  },
  {
    path: "/admin/member-management",
    label: "회원 관리",
    icon: "/admin/SideBar/AssignmentOutlineIcon.svg",
  },
  {
    path: "/admin/grade-management",
    label: "등급 관리",
    icon: "/admin/SideBar/CertificateOutlineIcon.svg",
  },
  {
    path: "/admin/admin-management",
    label: "관리자 관리",
    icon: "/admin/SideBar/BuildOutlineIcon.svg",
  },
] as const;

const SIDEBAR_WIDTH = "w-64"; // 256px

interface SideBarProps {
  userName: string;
  roleName: string; // 역할 표시명 (예: "관리자")
  roleLabel?: string; // 칩 우측 레이블 (생략 시 userName으로 표시)
}

export default function SideBar({
  userName,
  roleName,
  roleLabel,
}: SideBarProps) {
  // 사이드바 열림/닫힘 상태 관리 훅
  const { isOpen, open, close } = useSidebar();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // 프로필 드롭다운 및 로그아웃 메뉴 상태

  // 추후 넣을 네비게이션 훅
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`flex-shrink-0 transition-all duration-300 ${isOpen ? SIDEBAR_WIDTH : "w-0"}`}
      />

      {/* 고정 사이드바 패널 */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-90 flex flex-col z-40 transition-all duration-300 overflow-hidden ${
          isOpen ? SIDEBAR_WIDTH : "w-0"
        }`}
      >
        <div className="flex flex-col h-full w-69 gap-3">
          {/* 헤더 */}
          <div>
            <div className="flex items-center justify-between px-6 py-6">
              <div className="flex items-center gap-2">
                <span>
                  <img
                    src="/admin/SideBar/OrganizationIcon.svg"
                    alt="조직이미지"
                  />
                </span>
                <span className="text-body4 text-gray-400">management</span>
              </div>

              <button
                onClick={close}
                aria-label="사이드바 닫기"
                className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-gray-400 transition-colors"
              >
                <ChevronLeftOutlineIcon size={20} />
              </button>
            </div>
            <div className="px-6 pb-6 flex gap-2">
              <UserIcon size={32} />
              <p className="text-h2 text-gray-400">{userName}</p>
            </div>
          </div>

          <hr className="mx-3 border-gray-90" />

          {/* 네비게이션 메뉴 */}
          {/* NAV_ITEMS를 불러와서 사이드바 아이템에 넣음 */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <React.Fragment key={item.path}>
                <SideBarItem
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
                {index === 0 && <hr className="border-gray-90 my-1 mt-3" />}
              </React.Fragment>
            ))}
          </nav>

          {/* 하단 고정 영역 */}
          <div className="px-5 py-5 border-t border-gray-90">
            <div className="flex items-center justify-between mb-4 border border-gray-50 rounded-lg px-8 py-3">
              <div className="text-body4">{roleName}</div>
              <div className="w-px bg-gray-90 self-stretch" />
              <div className="text-body4 text-gray-400">
                {roleLabel ?? userName}
              </div>
            </div>

            <div className="relative">
              {isProfileOpen && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border border-gray-90 rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full text-left px-4 py-2.5 text-body4 text-gray-400 hover:bg-gray-50 transition-colors"
                    onClick={() => navigate("/admin/my-page")}
                  >
                    마이 페이지
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 text-body4 text-red-400 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      // 로그아웃 로직 추가
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              )}
              {/* 프로필 + 드롭다운 */}
              <button
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                aria-label="프로필 메뉴"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <div className="w-9 h-9 rounded-full bg-semantic-blueSoft flex items-center justify-center flex-shrink-0">
                  <UserIcon size={20} className="text-primary-500" />
                </div>
                <CaretDownIcon
                  size={16}
                  className="text-gray-300 flex-shrink-0"
                />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 사이드바 닫힌 상태일 때 좌측 가장자리에 열기 버튼 */}
      <button
        onClick={open}
        aria-label="사이드바 열기"
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-gray-90 rounded-r-lg p-2 text-gray-300 hover:text-primary-500 hover:border-primary-500 shadow-sm transition-all duration-300 ${
          isOpen
            ? "opacity-0 pointer-events-none -translate-x-full"
            : "opacity-100 translate-x-0"
        }`}
      >
        <ChevronRightOutlineIcon size={20} />
      </button>
    </>
  );
}
