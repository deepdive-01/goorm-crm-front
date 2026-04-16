import { useEffect, useState } from "react";
import SideBar from "../../../components/admin/SideBar/SideBar";
import Table from "../../../components/admin/Table/Table";
import TableFilter from "../../../components/admin/TableFilter/TableFilter";
import { fetchAdminMe } from "../../../services/dashboard";
import { fetchMembers } from "../../../services/members";
import type { AdminUser } from "../../../types/DashBoardPage.types";
import type { MemberRow } from "../../../types/table.types";

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
  const [user, setUser] = useState<AdminUser | null>(null);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    grade: "all",
    attribute: "all",
  });

  // 관리자 정보와 회원 리스트를 가져옴
  useEffect(() => {
    fetchAdminMe()
      .then(setUser)
      .catch(() => {});
    fetchMembers()
      .then(setMembers)
      .catch(() => {});
  }, []);

  // 필터 변경 핸들러
  function handleFilterChange(
    type: "status" | "grade" | "attribute",
    value: string,
  ) {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }

  function handleAdd() {
    // 버튼 눌렀을때 로직 (추후 예정)
    console.log("회원 추가");
  }

  // 필터 계산
  const filteredData = members.filter((row) => {
    const matchesSearch = search === "" || String(row.row_2).includes(search); // 이름을 검색했을 때 검색어가 포함되는 지를 확인

    // 상태 필터링
    const statusMap: Record<string, string> = {
      active: "활성",
      dormant: "휴면",
    };

    // 등급 필터링
    const matchesStatus =
      filters.status === "all" || row.row_5 === statusMap[filters.status];
    const matchesGrade = filters.grade === "all" || row.row_4 === filters.grade;

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
        <Table variant="member" headings={TABLE_HEADINGS} data={filteredData} />
      </main>
    </div>
  );
}
