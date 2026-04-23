import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table as VaporTable } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import UserDetailPanel from "../../../components/admin/UserDetailPanel/UserDetailPanel";
import { fetchAdminMe } from "../../../services/dashboard";
import {
  fetchManagedMembers,
  updateMemberStatus,
  updateMemberGrade,
  type ManagedMember,
} from "../../../services/memberManagement";
import { updateAdminRole } from "../../../services/adminManagement";
import TableSkeleton from "../../../components/admin/Table/TableSkeleton";

const TABLE_HEADINGS = ["회원ID", "이름", "이메일", "등급", "상태"] as const;

export default function MemberManagementPage() {
  // 선택한 회원 (상세 패널에 표시)
  const [selected, setSelected] = useState<ManagedMember | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 사이드바에 표시할 관리자 기본 정보 (GET /api/v1/admin/me)
  const { data: user } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 회원 목록 (GET /api/v1/root/accounts/users)
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["managedMembers"],
    queryFn: fetchManagedMembers,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: saveMember } = useMutation({
    mutationFn: async ({
      user_id,
      payload,
    }: {
      user_id: number;
      payload: { grade?: string; status?: string; role?: string };
    }) => {
      if (payload.status) await updateMemberStatus(user_id, payload.status);
      if (payload.grade) await updateMemberGrade(user_id, payload.grade);
      if (payload.role) await updateAdminRole(user_id, payload.role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managedMembers"] });
    },
  });

  // 테이블 행 클릭 → 상세 패널 열기
  function handleRowClick(member: ManagedMember) {
    setSelected(member);
    setIsPanelOpen(true);
  }

  // 상세 패널에서 저장 버튼 클릭
  async function handleSave(
    user_id: number,
    payload: { grade?: string; status?: string; role?: string },
  ) {
    await saveMember({ user_id, payload });
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
            특정 사용자의 상세 정보를 수정할 수 있는 기능입니다
          </p>
        </div>

        {/* 로딩 중에는 스켈레톤 표시, 완료 시 테이블 렌더링 */}
        {isLoading ? (
          <TableSkeleton headings={TABLE_HEADINGS} />
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
                {members.map((member) => (
                  <VaporTable.Row
                    key={member.user_id} // 실제 API: id가 아닌 user_id
                    className={`border-t border-gray-90 cursor-pointer transition-colors ${
                      selected?.user_id === member.user_id && isPanelOpen
                        ? "bg-semantic-blueSoft"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleRowClick(member)}
                  >
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.user_id}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.name}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.email}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.grade}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {member.status}
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
          variant="member"
          data={selected}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          currentUserRole={user?.role}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
