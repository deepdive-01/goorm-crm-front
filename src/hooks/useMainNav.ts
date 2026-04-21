import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { logout } from "../services/auth";

export function useMainNav() {
  const navigate = useNavigate();
  const { profile, clearProfile } = useUserContext();
  const isAdmin = profile?.role === "ADMIN" || profile?.role === "ROOT";

  const handleLogout = async () => {
    await logout();
    clearProfile();
    navigate("/login");
  };

  const navItems = isAdmin
    ? [
        { href: "/admin", label: "관리자 페이지" },
        { href: "/myPage", label: "마이 페이지" },
      ]
    : profile
      ? [{ href: "/myPage", label: "마이 페이지" }]
      : [];

  const menuItems = profile
    ? [{ label: "로그아웃", onClick: handleLogout }]
    : [
        { label: "로그인", href: "/login" },
        { label: "회원가입", href: "/signup" },
      ];

  return { navItems, menuItems };
}
