import {
  BellOnIcon,
  CaretDownIcon,
  ChevronLeftOutlineIcon,
  ChevronRightOutlineIcon,
  DashboardIcon,
  GroupIcon,
  SettingIcon,
  StarIcon,
  UserCheckIcon,
  UserIcon,
} from "@vapor-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import { useSidebar } from "./useSidebar";

const NAV_ITEMS = [
  { path: "/admin/notifications", label: "알림", icon: BellOnIcon },
  { path: "/admin/dashboard", label: "대시보드", icon: DashboardIcon },
  { path: "/admin/members", label: "회원 목록", icon: GroupIcon },
  { path: "/admin/member-management", label: "회원 관리", icon: UserCheckIcon },
  { path: "/admin/grade-management", label: "등급 관리", icon: StarIcon },
  { path: "/admin/admin-management", label: "관리자 관리", icon: SettingIcon },
] as const;

const SIDEBAR_WIDTH = "w-64"; // 256px

export default function SideBar() {
  const { isOpen, open, close } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* push layout 용 스페이서: 문서 흐름에 포함되어 메인 콘텐츠를 우측으로 밀어냄 */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${isOpen ? SIDEBAR_WIDTH : "w-0"}`}
      />

      {/* 고정 사이드바 패널 */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-90 flex flex-col z-40 transition-all duration-300 overflow-hidden ${
          isOpen ? SIDEBAR_WIDTH : "w-0"
        }`}
      >
        {/* 내부 콘텐츠는 항상 w-64를 유지 — 슬라이드 아웃 시 부모의 overflow-hidden으로 숨김 */}
        <div className="flex flex-col h-full w-69 gap-3">
          {/* 헤더: 브랜드명 + 닫기 버튼 */}
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
              <p className="text-h2 text-gray-400">관리자A</p>
            </div>
          </div>

          <hr className="mx-3 border-gray-90" />

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <SideBarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </nav>

          {/* 하단 고정 영역 */}
          <div className="px-5 py-5 border-t border-gray-90">
            {/* 역할 칩 */}
            <div className="flex items-center justify-between mb-4 border border-gray-50 rounded-lg px-8 py-3">
              <div className="text-body4">관리자</div>
              <div className="w-px bg-gray-90 self-stretch" />
              <div className="text-body4  text-gray-400 ">관리자A</div>
            </div>

            {/* 프로필 + 드롭다운 */}
            <button
              className="flex items-center gap-3 w-full rounded-lg p-2 hover:bg-gray-50 transition-colors"
              aria-label="프로필 메뉴"
            >
              <div className="w-9 h-9 rounded-full bg-semantic-blueSoft flex items-center justify-center flex-shrink-0">
                <UserIcon size={20} className="text-primary-500" />
              </div>
              <span className="flex-1 text-body4 text-gray-400 text-left truncate">
                관리자A
              </span>
              <CaretDownIcon
                size={16}
                className="text-gray-300 flex-shrink-0"
              />
            </button>
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
