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

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleLogoTitleClick = () => {
    if (LogoTitle?.href) {
      navigate(LogoTitle.href);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
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
                <NavigationMenu.Link
                  href={item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                >
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
          const hasMenu = !!menuItems && menuItems.length > 0;

          return (
            <div key={index} style={{ position: "relative" }}>
              {hasMenu ? (
                <Menu.Root
                  open={openMenuIndex === index}
                  modal={false}
                  onOpenChange={(open) => {
                    setOpenMenuIndex(open ? index : null);
                  }}
                >
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

                  <Menu.PortalPrimitive>
                    <Menu.PositionerPrimitive
                      side="bottom"
                      align="end"
                      sideOffset={15}
                      style={{ zIndex: 100 }}
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
