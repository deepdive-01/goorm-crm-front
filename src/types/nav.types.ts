import type { ComponentType } from "react";

export type NavItem = {
  href: string;
  label: string;
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
};
