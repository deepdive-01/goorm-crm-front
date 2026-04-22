import type { ComponentType } from "react";

export type NavItem = {
  href: string;
  label: string;
  /** 해당 링크 접근에 필요한 role 목록. 없으면 모두 접근 가능 */
  requiredRoles?: string[];
};

export type LogoTitleItem = {
  LogoTitle: string;
  href?: string;
};

export type MenuItem = {
  label: string;
  href?: string;
  onClick?: () => void; // 함수로 받아올 수도 있음
};

export type AvatarIconItem = {
  Icon: ComponentType;
  alt: string;
  menuItems?: MenuItem[];
};

export type NavProps = {
  items?: NavItem[];
  avatarIcons?: AvatarIconItem[];
  LogoTitle: LogoTitleItem;
  onClick?: () => void; // 함수로 받아올 수도 있음
};
