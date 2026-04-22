import { useEffect, useRef, useState } from "react";
import { VStack } from "@vapor-ui/core";

import { useUserContext } from "../../../context/UserContext";
import MyPageTitle from "./MyPageTitle";
import Tab from "../../../components/user/Tab/Tab";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import Grade from "./Grade/Grade";

export default function MyPage() {
  const { profile, isLoading } = useUserContext();
  const [navHeight, setNavHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const nav = document.querySelector(".fixed.z-50") as HTMLElement | null;
    if (!nav) return;

    observerRef.current = new ResizeObserver(([entry]) => {
      setNavHeight(entry.contentRect.height);
    });
    observerRef.current.observe(nav);

    return () => observerRef.current?.disconnect();
  }, []);

  const recipient = profile?.name ?? "";
  const email = profile?.email ?? "";
  const phone = profile?.phone ?? "";

  return (
    <div style={{ paddingTop: navHeight }}>
      <VStack $css={{ gap: "$500", alignItems: "center", paddingTop: "$500" }}>
        <VStack className="items-center w-full gap-12">
          <MyPageTitle
            recipient={recipient}
            email={email}
            isLoading={isLoading}
          />
          <Tab
            defaultValue="profileEdit"
            listItem={[
              {
                value: "profileEdit",
                title: "내 정보 수정",
                page: ProfileEdit,
              },
              { value: "grade", title: "등급", page: Grade },
            ]}
            recipient={recipient}
            email={email}
            phone={phone}
          />
        </VStack>
      </VStack>
    </div>
  );
}
