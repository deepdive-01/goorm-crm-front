import { useEffect, useState } from "react";
import { Table as VaporTable } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import UserDetailPanel from "../../../components/admin/UserDetailPanel/UserDetailPanel";
import { fetchAdminMe } from "../../../services/dashboard";
import {
  fetchManagedMembers,
  updateManagedMember,
  type ManagedMember,
} from "../../../services/memberManagement";
import type { AdminUser } from "../../../types/DashBoardPage.types";

const TABLE_HEADINGS = ["번호", "이름", "이메일"] as const;

export default function MemberManagementPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [members, setMembers] = useState<ManagedMember[]>([]);
  const [selected, setSelected] = useState<ManagedMember | null>(null);

  useEffect(() => {
    fetchAdminMe()
      .then(setUser)
      .catch(() => {});
    fetchManagedMembers()
      .then((data) => {
        setMembers(data);
        setSelected(data[0] ?? null);
      })
      .catch(() => {});
  }, []);

  async function handleSave(
    id: string,
    payload: Partial<
      Pick<ManagedMember, "grade" | "status" | "address" | "phone">
    >,
  ) {
    await updateManagedMember(id, payload);
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...payload } : m)),
    );
    setSelected((prev) => (prev?.id === id ? { ...prev, ...payload } : prev));
  }

  return (
    <div className="flex min-h-screen">
      <SideBar
        userName={user?.name ?? "관리자"}
        roleName={user?.role ?? "관리자"}
        roleLabel={user?.name ?? "관리자"}
      />

      <main className="flex-1 p-8 flex flex-col gap-6">
        {/* 페이지 헤더 */}
        <div className="flex flex-col gap-2">
          <span className="text-body5 text-primary-500">회원 관리</span>
          <h1 className="text-h2 font-bold">회원 관리</h1>
          <p className="text-body2 font-medium text-gray-300 mb-4">
            회원 정보를 조회하고 등급 및 상태를 수정할 수 있습니다
          </p>
        </div>

        {/* 분할 레이아웃 */}
        <div className="flex gap-4 flex-1">
          {/* 좌측: 회원 목록 테이블 */}
          <div className="flex-1 border border-gray-90 rounded-lg overflow-hidden self-start">
            <VaporTable.Root
              $css={{ width: "100%", borderCollapse: "collapse" }}
            >
              <VaporTable.Header className="bg-gray-50">
                <VaporTable.Row>
                  {TABLE_HEADINGS.map((heading) => (
                    <VaporTable.Heading
                      key={heading}
                      className="text-body3 text-gray-300 px-4 py-3 text-left"
                    >
                      {heading}
                    </VaporTable.Heading>
                  ))}
                </VaporTable.Row>
              </VaporTable.Header>
              <VaporTable.Body>
                {members.map((member) => (
                  <VaporTable.Row
                    key={member.id}
                    className={`border-t border-gray-90 cursor-pointer transition-colors ${
                      selected?.id === member.id
                        ? "bg-semantic-blueSoft"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelected(member)}
                  >
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.id}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.name}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.email}
                    </VaporTable.Cell>
                  </VaporTable.Row>
                ))}
              </VaporTable.Body>
            </VaporTable.Root>
          </div>

          {/* 우측: 상세 편집 패널 */}
          <div className="w-80 border border-gray-90 rounded-lg flex-shrink-0">
            {selected ? (
              <UserDetailPanel
                variant="member"
                data={selected}
                onSave={handleSave}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-body4 text-gray-300">
                회원을 선택하세요
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
