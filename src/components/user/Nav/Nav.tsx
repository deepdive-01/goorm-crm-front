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

      <HStack $css={{ gap: "$100" }}>
        {avatarIcons.map(({ Icon, alt, menuItems }, index) => {
          const hasMenu = !!menuItems && menuItems.length > 0;

          return (
            <div key={index} style={{ position: "relative" }}>
              {hasMenu ? (
                // 메뉴 있는 경우
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
                      <button>
                        <Avatar.Root shape="circle" alt={alt}>
                          <Icon />
                        </Avatar.Root>
                      </button>
                    }
                  />

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
                // 메뉴 없는 경우
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
