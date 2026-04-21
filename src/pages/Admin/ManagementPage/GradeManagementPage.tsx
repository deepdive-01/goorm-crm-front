import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table as VaporTable } from "@vapor-ui/core";
import SideBar from "../../../components/admin/SideBar/SideBar";
import GradeDetailPanel from "../../../components/admin/GradeDetailPanel/GradeDetailPanel";
import { fetchAdminMe } from "../../../services/dashboard";
import {
  fetchGrades,
  updateGrade,
  type Grade,
  type UpdateGradePayload,
} from "../../../services/gradeManagement";

const TABLE_HEADINGS = [
  "ID",
  "등급명",
  "최소 구매금액",
  "할인율",
  "무료배송",
] as const;

export default function GradeManagementPage() {
  const [selected, setSelected] = useState<Grade | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 사이드바에 표시할 관리자 기본 정보 (GET /api/v1/admin/me)
  const { data: user } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 등급 목록 (GET /api/v1/root/grades)
  const { data: grades = [], isLoading } = useQuery({
    queryKey: ["grades"],
    queryFn: fetchGrades,
  });

  const queryClient = useQueryClient();

  // 등급 혜택 수정 (PATCH /api/v1/root/grades/{grade_id})
  const { mutateAsync: saveGrade } = useMutation({
    mutationFn: ({
      grade_id,
      payload,
    }: {
      grade_id: number;
      payload: UpdateGradePayload;
    }) => updateGrade(grade_id, payload),
    onSuccess: () => {
      // 저장 성공 시 등급 목록 + 대시보드 캐시 무효화해 최신 상태 유지
      queryClient.invalidateQueries({ queryKey: ["grades"] });
    },
  });

  // 테이블 행 클릭 → 상세 패널 열기
  function handleRowClick(grade: Grade) {
    setSelected(grade);
    setIsPanelOpen(true);
  }

  // 상세 패널에서 저장 버튼 클릭
  async function handleSave(grade_id: number, payload: UpdateGradePayload) {
    await saveGrade({ grade_id, payload });
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
          <span className="text-body5 text-primary-500">등급 관리</span>
          <h1 className="text-h2 font-bold">등급 관리</h1>
          <p className="text-body2 font-medium text-gray-300 mb-4">
            회원 등급을 조회하고 승급 조건과 혜택을 관리해보세요
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
                {grades.map((grade) => (
                  <VaporTable.Row
                    key={grade.grade_id}
                    className={`border-t border-gray-90 cursor-pointer transition-colors ${
                      selected?.grade_id === grade.grade_id && isPanelOpen
                        ? "bg-semantic-blueSoft"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleRowClick(grade)}
                  >
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {grade.grade_id}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {grade.name}
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {grade.min_purchase_amount.toLocaleString()}원
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {grade.discount_rate}%
                    </VaporTable.Cell>
                    <VaporTable.Cell className="text-body4 text-gray-400 px-4 py-3">
                      {grade.is_free_shipping ? "✓" : "-"}
                    </VaporTable.Cell>
                  </VaporTable.Row>
                ))}
              </VaporTable.Body>
            </VaporTable.Root>
          </div>
        )}

        {/* 등급 추가 — API 명세에 없으므로 추후 추가 예정 */}
        <button
          type="button"
          className="text-body4 text-primary-500 hover:text-primary-400 transition-colors text-left w-fit"
        >
          + 등급 추가하기
        </button>
      </main>

      {/* 우측 슬라이드 패널 */}
      {selected && (
        <GradeDetailPanel
          data={selected}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
