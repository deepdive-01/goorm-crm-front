import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Text, HStack, NavigationMenu, Menu } from "@vapor-ui/core";

import type { NavProps, MenuItem } from "../../../types/nav.types";

export default function Nav({
  items = [],
  avatarIcons = [],
  LogoTitle,
}: NavProps) {
  const navigate = useNavigate();
  // 현재 드롭다운이 열린 아바타 아이콘의 index (-1이면 모두 닫힘)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleLogoTitleClick = () => {
    if (LogoTitle?.href) {
      navigate(LogoTitle.href);
    }
  };

  // href → 페이지 이동, onClick → 커스텀 함수 실행 (로그아웃 등)
  const handleMenuItemClick = (menuItem: MenuItem) => {
    if (menuItem.href) {
      navigate(menuItem.href);
    } else if (menuItem.onClick) {
      menuItem.onClick();
    }
    setOpenMenuIndex(null);
  };

  return (
    <HStack
      $css={{
        width: "100%",
        justifyContent: "space-between",
        paddingInline: { lg: "$200", sm: "$100" },
        paddingBlock: { lg: "$100", sm: "$050" },
      }}
    >
      {/* 좌측: 로고 + 네비게이션 메뉴 */}
      <HStack $css={{ gap: "$200", alignItems: "center" }}>
        <Text
          className="text-black cursor-pointer text-h2"
          onClick={handleLogoTitleClick}
        >
          {LogoTitle?.LogoTitle}
        </Text>

        <NavigationMenu.Root aria-label="Main" className="navbar-desktop">
          <NavigationMenu.List>
            {items.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link href={item.href}>
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </HStack>

      {/* 우측: 아바타 아이콘 목록 */}
      <HStack $css={{ gap: "$100" }}>
        {avatarIcons.map(({ Icon, alt, menuItems }, index) => {
          // menuItems가 있으면 클릭 시 드롭다운 표시
          const hasMenu = !!menuItems && menuItems.length > 0;

          return (
            <div key={index} style={{ position: "relative" }}>
              {hasMenu ? (
                // 드롭다운이 있는 아이콘: Menu.Trigger로 Avatar를 감싸서 클릭 이벤트 연결
                <Menu.Root
                  open={openMenuIndex === index}
                  modal={false}
                  onOpenChange={(open) => {
                    setOpenMenuIndex(open ? index : null);
                  }}
                >
                  {/*
                   * Menu.Trigger: 메뉴를 여닫는 트리거 버튼
                   * - nativeButton={false}: 기본 button 태그 대신 render prop으로 커스텀 요소 사용
                   * - render: 트리거로 사용할 커스텀 요소 (Avatar를 button으로 감싸서 클릭 영역 지정)
                   */}
                  <Menu.Trigger
                    nativeButton={false}
                    render={
                      <div>
                        <Avatar.Root shape="circle" alt={alt}>
                          <Icon />
                        </Avatar.Root>
                      </div>
                    }
                  />

                  {/*
                   * Menu.PortalPrimitive: 메뉴 팝업을 document.body에 포털로 렌더링
                   * - z-index, overflow: hidden 등 부모 스타일 영향을 받지 않도록 분리
                   *
                   * Menu.PositionerPrimitive: 팝업의 위치를 지정
                   * - side: 트리거 기준 방향 ("top" | "bottom" | "left" | "right")
                   * - align: 정렬 기준 ("start" | "center" | "end")
                   * - sideOffset: 트리거와의 간격 (px)
                   *
                   * Menu.PopupPrimitive: 실제 팝업 컨테이너 (스타일/애니메이션 적용 대상)
                   */}
                  <Menu.PortalPrimitive>
                    <Menu.PositionerPrimitive
                      side="bottom"
                      align="end"
                      sideOffset={15}
                    >
                      <Menu.PopupPrimitive>
                        {menuItems!.map((menuItem, menuIndex) => (
                          <Menu.Item
                            key={menuIndex}
                            onClick={() => handleMenuItemClick(menuItem)}
                          >
                            {menuItem.label}
                          </Menu.Item>
                        ))}
                      </Menu.PopupPrimitive>
                    </Menu.PositionerPrimitive>
                  </Menu.PortalPrimitive>
                </Menu.Root>
              ) : (
                // 드롭다운이 없는 아이콘: Avatar만 렌더링
                <Avatar.Root shape="circle" alt={alt}>
                  <Icon />
                </Avatar.Root>
              )}
            </div>
          );
        })}
      </HStack>
    </HStack>
  );
}
