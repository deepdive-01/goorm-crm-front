import { useEffect, useState } from "react";
import { Table as VaporTable } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import UserDetailPanel from "../../../components/admin/UserDetailPanel/UserDetailPanel";
import { fetchAdminMe } from "../../../services/dashboard";
import {
  fetchManagedAdmins,
  updateManagedAdmin,
  type ManagedAdmin,
} from "../../../services/adminManagement";
import type { AdminUser } from "../../../types/DashBoardPage.types";

const TABLE_HEADINGS = ["번호", "이름", "이메일"] as const;

export default function AdminManagementPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [admins, setAdmins] = useState<ManagedAdmin[]>([]);
  const [selected, setSelected] = useState<ManagedAdmin | null>(null);

  useEffect(() => {
    fetchAdminMe()
      .then(setUser)
      .catch(() => {});
    fetchManagedAdmins()
      .then((data) => {
        setAdmins(data);
        setSelected(data[0] ?? null);
      })
      .catch(() => {});
  }, []);

  async function handleSave(
    id: string,
    payload: Partial<Pick<ManagedAdmin, "grade" | "phone">>,
  ) {
    await updateManagedAdmin(id, payload);
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...payload } : a)),
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
          <span className="text-body5 text-primary-500">관리자 관리</span>
          <h1 className="text-h2 font-bold">관리자 관리</h1>
          <p className="text-body2 font-medium text-gray-300 mb-4">
            관리자 정보를 조회하고 권한을 수정할 수 있습니다
          </p>
        </div>

        {/* 분할 레이아웃 */}
        <div className="flex gap-4 flex-1">
          {/* 좌측: 관리자 목록 테이블 */}
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
                {admins.map((admin) => (
                  <VaporTable.Row
                    key={admin.id}
                    className={`border-t border-gray-90 cursor-pointer transition-colors ${
                      selected?.id === admin.id
                        ? "bg-semantic-blueSoft"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelected(admin)}
                  >
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.id}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.name}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.email}
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
                variant="admin"
                data={selected}
                onSave={handleSave}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-body4 text-gray-300">
                관리자를 선택하세요
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
