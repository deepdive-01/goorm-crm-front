import { useNavigate } from "react-router-dom";

import { VStack } from "@vapor-ui/core";
import { BellOnIcon, UserIcon } from "@vapor-ui/icons";

import Nav from "../user/Nav/Nav";

export default function NavExample() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <VStack>
      {/* 다중 아이템 */}
      <Nav
        LogoTitle={{ LogoTitle: "Goorm", href: "/" }}
        items={[
          { href: "/admin/dashboard", label: "관리자 페이지" },
          { href: "/", label: "마이 페이지" },
        ]}
        avatarIcons={[
          { Icon: BellOnIcon, alt: "알림" },
          {
            Icon: UserIcon,
            alt: "사용자",
            menuItems: [
              { label: "로그인", href: "/login" }, // href → 페이지 이동
              { label: "회원가입", href: "/signup" }, // href → 페이지 이동
              { label: "로그아웃", onClick: handleLogout }, // onClick → 함수 실행
            ],
          },
        ]}
      />
    </VStack>
  );
}
