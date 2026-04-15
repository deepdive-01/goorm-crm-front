import { useNavigate } from "react-router-dom";
import { VStack } from "@vapor-ui/core";
import { UserIcon } from "@vapor-ui/icons";

import { useUserContext } from "../../../context/UserContext";
import { logout } from "../../../services/auth";
import Nav from "../../../components/user/Nav/Nav";
import MyPageTitle from "./MyPageTitle";
import Tab from "../../../components/user/Tab/Tab";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import Grade from "./Grade/Grade";

export default function MyPage() {
  const navigate = useNavigate();
  const { profile } = useUserContext();

  const recipient = profile?.name ?? "";
  const email = profile?.email ?? "";
  const phone = profile?.phone ?? "";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <VStack $css={{ gap: "$500", alignItems: "center" }}>
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

      <VStack className="items-center w-full gap-12">
        <MyPageTitle recipient={recipient} email={email} />
        <Tab
          defaultValue="profileEdit"
          listItem={[
            { value: "profileEdit", title: "내 정보 수정", page: ProfileEdit },
            { value: "grade", title: "등급", page: Grade },
          ]}
          recipient={recipient}
          email={email}
          phone={phone}
        />
      </VStack>
    </VStack>
  );
}
