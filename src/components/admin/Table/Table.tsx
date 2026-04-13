import { useState } from "react";
import { Badge, Pagination, Table as VaporTable } from "@vapor-ui/core";
import type { TableProps } from "../../../types/table.types";

// 상태에 따른 색상 매핑
const STATUS_COLOR = {
  active: "success",
  inactive: "hint",
} as const;

export default function Table(props: TableProps) {
  // 페이지네이션 설정, 기본 페이지 크기는 10으로 설정
  const { defaultPageSize = 10 } = props;

  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = defaultPageSize;

  // 전체 페이지 수
  const totalPages = Math.ceil(props.data.length / pageSize);

  // 하단 페이지네이션 렌더 함수
  const renderPagination = () => (
    <div className="flex justify-center mt-4">
      <Pagination.Root
        totalPages={totalPages}
        page={currentPage}
        siblingCount={2}
        boundaryCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      >
        <Pagination.ListPrimitive
          style={{
            display: "flex",
            gap: "4px",
            listStyle: "none",
            alignItems: "center",
          }}
        >
          <Pagination.ItemPrimitive>
            <Pagination.Previous>{"<"}</Pagination.Previous>
          </Pagination.ItemPrimitive>

          <Pagination.Items>
            {(pages) =>
              pages.map((page) => (
                <Pagination.ItemPrimitive key={`${page.type}-${page.value}`}>
                  {page.type === "ellipsis" ? (
                    <span className="px-2">...</span>
                  ) : (
                    <Pagination.ButtonPrimitive
                      page={page.value}
                      className={
                        page.value === currentPage
                          ? "w-8 h-8 rounded-md bg-semantic-blueSoft text-primary-500 font-semibold"
                          : "w-8 h-8 text-gray-400"
                      }
                    >
                      {page.value}
                    </Pagination.ButtonPrimitive>
                  )}
                </Pagination.ItemPrimitive>
              ))
            }
          </Pagination.Items>

          <Pagination.ItemPrimitive>
            <Pagination.Next>{">"}</Pagination.Next>
          </Pagination.ItemPrimitive>
        </Pagination.ListPrimitive>
      </Pagination.Root>
    </div>
  );

  // variant에 따라 다른 테이블 렌더링
  if (props.variant === "member") {
    const sliced = props.data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    return (
      <div>
        <VaporTable.Root $css={{ width: "100%" }}>
          <VaporTable.Header>
            <VaporTable.Row>
              <VaporTable.Heading>ID</VaporTable.Heading>
              <VaporTable.Heading>이름</VaporTable.Heading>
              <VaporTable.Heading>이메일</VaporTable.Heading>
              <VaporTable.Heading>등급</VaporTable.Heading>
              <VaporTable.Heading>상태</VaporTable.Heading>
              <VaporTable.Heading>가입일</VaporTable.Heading>
            </VaporTable.Row>
          </VaporTable.Header>
          <VaporTable.Body>
            {sliced.map((row, i) => (
              <VaporTable.Row key={i}>
                <VaporTable.Cell>{row.id}</VaporTable.Cell>
                <VaporTable.Cell>{row.name}</VaporTable.Cell>
                <VaporTable.Cell>{row.email}</VaporTable.Cell>
                <VaporTable.Cell>{row.grade}</VaporTable.Cell>
                <VaporTable.Cell>
                  <Badge colorPalette={STATUS_COLOR[row.status]} shape="pill">
                    {row.status === "active" ? "활성" : "비활성"}
                  </Badge>
                </VaporTable.Cell>
                <VaporTable.Cell>{row.joinDate}</VaporTable.Cell>
              </VaporTable.Row>
            ))}
          </VaporTable.Body>
        </VaporTable.Root>
        {renderPagination()}
      </div>
    );
  }

  // simple variant는 ID, 이름, 이메일만 렌더링
  const sliced = props.data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div>
      <VaporTable.Root $css={{ width: "100%" }}>
        <VaporTable.Header>
          <VaporTable.Row>
            <VaporTable.Heading>ID</VaporTable.Heading>
            <VaporTable.Heading>이름</VaporTable.Heading>
            <VaporTable.Heading>이메일</VaporTable.Heading>
          </VaporTable.Row>
        </VaporTable.Header>
        <VaporTable.Body>
          {sliced.map((row, i) => (
            <VaporTable.Row key={i}>
              <VaporTable.Cell>{row.id}</VaporTable.Cell>
              <VaporTable.Cell>{row.name}</VaporTable.Cell>
              <VaporTable.Cell>{row.email}</VaporTable.Cell>
            </VaporTable.Row>
          ))}
        </VaporTable.Body>
      </VaporTable.Root>
      {renderPagination()}
    </div>
  );
}
