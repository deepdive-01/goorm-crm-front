import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SideBar from "../../../components/admin/SideBar/SideBar";
import Table from "../../../components/admin/Table/Table";
import TableFilter from "../../../components/admin/TableFilter/TableFilter";
import { fetchAdminMe } from "../../../services/dashboard";
import { fetchMembers } from "../../../services/members";

// 테이블 헤더 정의
const TABLE_HEADINGS: [string, string, string, string, string, string] = [
  "회원 ID",
  "이름",
  "이메일",
  "등급",
  "상태",
  "가입일",
];

export default function MemberListPage() {
  // 검색어 상태 (이름 기준 필터링)
  const [search, setSearch] = useState("");

  // 필터 상태 — value는 실제 API 응답값과 동일하게 유지 ("ACTIVE", "GOLD" 등)
  const [filters, setFilters] = useState({
    status: "all",
    grade: "all",
    attribute: "all",
  });

  // 사이드바에 표시할 관리자 기본 정보 (GET /api/v1/admin/me)
  const { data: user } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
  });

  // 회원 목록 (GET /api/v1/admin/users)
  // data가 undefined일 때 빈 배열을 기본값으로 사용해 이후 filter/map 에러 방지
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["memberList"],
    queryFn: fetchMembers,
  });

  // 필터 변경 핸들러
  function handleFilterChange(
    type: "status" | "grade" | "attribute",
    value: string,
  ) {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }

  function handleAdd() {
    console.log("회원 추가");
  }

  // 클라이언트 사이드 필터링
  // row_2: 이름, row_4: 등급 (GOLD/SILVER/BRONZE/MEMBER), row_5: 상태 (ACTIVE/BANNED)
  const filteredData = members.filter((row) => {
    // 이름 검색 — 검색어가 포함된 항목만 표시
    const matchesSearch = search === "" || String(row.row_2).includes(search);

    // 상태 필터 — "all"이면 전체, 아니면 실제 API 값과 직접 비교
    const matchesStatus =
      filters.status === "all" || row.row_5 === filters.status;

    // 등급 필터 — "all"이면 전체, 아니면 실제 API 값과 직접 비교
    const matchesGrade =
      filters.grade === "all" || row.row_4 === filters.grade;

    return matchesSearch && matchesStatus && matchesGrade;
  });

  return (
    <div className="flex min-h-screen">
      <SideBar
        userName={user?.name ?? "관리자"}
        roleName={user?.role ?? "관리자"}
        roleLabel={user?.name ?? "관리자"}
      />

      <main className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-body5 text-primary-500">회원 목록</span>
          <h1 className="text-h2 font-bold">회원 목록</h1>
          <p className="text-body2 font-medium text-gray-300 mb-4">
            전체 회원 현황을 조회하고 상세 정보를 확인해보세요
          </p>
        </div>

        <TableFilter
          onSearch={setSearch}
          onFilterChange={handleFilterChange}
          onAdd={handleAdd}
        />
        <span className="border border-gray-50 mb-1"></span>

        {/* 로딩 중에는 텍스트 표시, 완료 시 테이블 렌더링 */}
        {isLoading ? (
          <p className="text-body4 text-gray-300">불러오는 중...</p>
        ) : (
          <Table variant="member" headings={TABLE_HEADINGS} data={filteredData} />
        )}
      </main>
    </div>
  );
}
