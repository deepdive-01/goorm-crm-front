import { useEffect, useState } from "react";
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
import type { AdminUser } from "../../../types/DashBoardPage.types";

// 테이블 헤더
const TABLE_HEADINGS = ["ID", "등급", "회원 수"] as const;

export default function GradeManagementPage() {
  const [user, setUser] = useState<AdminUser | null>(null); // 로그인 유저 정보
  const [grades, setGrades] = useState<Grade[]>([]); //등급 목록
  const [selected, setSelected] = useState<Grade | null>(null); // 선택 등급
  const [isPanelOpen, setIsPanelOpen] = useState(false); // 패널 열림 여부

  // 데이터 로딩
  useEffect(() => {
    fetchAdminMe()
      .then(setUser)
      .catch(() => {});
    fetchGrades()
      .then(setGrades)
      .catch(() => {});
  }, []);

  // 패널 열기
  function handleRowClick(grade: Grade) {
    setSelected(grade);
    setIsPanelOpen(true);
  }

  // 등급 정보 업데이트
  async function handleSave(grade_id: number, payload: UpdateGradePayload) {
    await updateGrade(grade_id, payload);
    setGrades((prev) =>
      prev.map((g) => (g.grade_id === grade_id ? { ...g, ...payload } : g)),
    );
    setSelected((prev) =>
      prev?.grade_id === grade_id ? { ...prev, ...payload } : prev,
    );
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

        {/* 테이블 */}
        <div className="border border-gray-90 rounded-lg overflow-hidden">
          <VaporTable.Root $css={{ width: "100%", borderCollapse: "collapse" }}>
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
                    {grade.member_count.toLocaleString()}명
                  </VaporTable.Cell>
                </VaporTable.Row>
              ))}
            </VaporTable.Body>
          </VaporTable.Root>
        </div>

        {/* 등급 추가 링크 */}
        {/* API가 생기면 추가할 예정입니다. */}
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
