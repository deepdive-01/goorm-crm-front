import { UserOutlineIcon } from "@vapor-ui/icons";
import Nav from "../../../components/user/Nav/Nav";
import { useMainNav } from "../../../hooks/useMainNav";

export default function UserNav() {
  const { navItems, menuItems } = useMainNav();

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl border-white/15"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <Nav
        LogoTitle={{ LogoTitle: "Goorm", href: "/" }}
        items={navItems}
        avatarIcons={[{ Icon: UserOutlineIcon, alt: "사용자 메뉴", menuItems }]}
      />
    </div>
  );
}
