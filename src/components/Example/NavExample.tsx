import { useNavigate } from "react-router-dom";

import { VStack } from "@vapor-ui/core";
import { UserIcon } from "@vapor-ui/icons";

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
          { href: "/admin", label: "관리자 페이지" },
          { href: "/myPage", label: "마이 페이지" },
        ]}
        avatarIcons={[
          {
            Icon: UserIcon,
            alt: "사용자",
            menuItems: [
              { label: "로그아웃", onClick: handleLogout }, // onClick → 함수 실행
            ],
          },
        ]}
      />
    </VStack>
  );
}
