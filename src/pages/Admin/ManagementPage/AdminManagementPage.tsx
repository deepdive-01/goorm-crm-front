import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table as VaporTable } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import UserDetailPanel from "../../../components/admin/UserDetailPanel/UserDetailPanel";
import { fetchAdminMe } from "../../../services/dashboard";
import {
  fetchManagedAdmins,
  updateAdminRole,
  type ManagedAdmin,
} from "../../../services/adminManagement";

const TABLE_HEADINGS = ["관리자ID", "이름", "이메일", "권한"] as const;

export default function AdminManagementPage() {
  // 선택한 관리자 (상세 패널에 표시)
  const [selected, setSelected] = useState<ManagedAdmin | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 사이드바에 표시할 관리자 기본 정보 (GET /api/v1/admin/me)
  const { data: user } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 관리자 목록 (GET /api/v1/root/accounts/admins)
  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["managedAdmins"],
    queryFn: fetchManagedAdmins,
  });

  const queryClient = useQueryClient();

  /**
   * useMutation: React Query의 데이터 변경(CUD) 훅
   *
   * - mutationFn : 실제 API 호출 함수
   * - onSuccess  : 성공 시 실행. invalidateQueries로 목록을 다시 조회해 최신 상태 유지
   */
  const { mutateAsync: saveAdmin } = useMutation({
    mutationFn: async ({
      user_id,
      payload,
    }: {
      user_id: number;
      payload: { role?: string };
    }) => {
      // 권한 변경 (PATCH /api/v1/root/accounts/{user_id}/role)
      if (payload.role) await updateAdminRole(user_id, payload.role);
    },
    onSuccess: () => {
      // 저장 성공 시 관리자 목록 캐시를 무효화해 자동 재조회
      queryClient.invalidateQueries({ queryKey: ["managedAdmins"] });
    },
  });

  // 테이블 행 클릭 → 상세 패널 열기
  function handleRowClick(admin: ManagedAdmin) {
    setSelected(admin);
    setIsPanelOpen(true);
  }

  // 상세 패널에서 저장 버튼 클릭
  async function handleSave(user_id: number, payload: { role?: string }) {
    await saveAdmin({ user_id, payload });
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
            특정 관리자의 상세 정보를 수정할 수 있는 기능입니다
          </p>
        </div>

        {/* 로딩 중에는 텍스트 표시, 완료 시 테이블 렌더링 */}
        {isLoading ? (
          <p className="text-body4 text-gray-300">불러오는 중...</p>
        ) : (
          <div className="border border-gray-90 rounded-lg overflow-hidden">
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
                    key={admin.user_id} // 실제 API: id가 아닌 user_id
                    className={`border-t border-gray-90 cursor-pointer transition-colors ${
                      selected?.user_id === admin.user_id && isPanelOpen
                        ? "bg-semantic-blueSoft"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleRowClick(admin)}
                  >
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.user_id}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.name}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.email}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {admin.role}
                    </VaporTable.Cell>
                  </VaporTable.Row>
                ))}
              </VaporTable.Body>
            </VaporTable.Root>
          </div>
        )}
      </main>

      {/* 우측 슬라이드 패널 */}
      {selected && (
        <UserDetailPanel
          variant="admin"
          data={selected}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
