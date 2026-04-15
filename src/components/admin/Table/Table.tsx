import { useState } from "react";
import { Pagination, Table as VaporTable } from "@vapor-ui/core";
import type { MemberRow, TableProps } from "../../../types/table.types";

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
          <Pagination.Previous>{"<"}</Pagination.Previous>

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

  const sliced = props.data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const cells = (row: (typeof sliced)[number]): (string | number)[] => {
    if (props.variant === "member") {
      const r = row as MemberRow;
      return [r.row_1, r.row_2, r.row_3, r.row_4, r.row_5, r.row_6];
    }
    return [row.row_1, row.row_2, row.row_3];
  };

  return (
    <div>
      <div className="border border-gray-90 rounded-lg overflow-hidden">
        <VaporTable.Root $css={{ width: "100%", borderCollapse: "collapse" }}>
          <VaporTable.Header className="bg-gray-50">
            <VaporTable.Row>
              {props.headings.map((heading) => (
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
            {sliced.map((row, i) => (
              <VaporTable.Row key={i} className="border-t border-gray-90">
                {cells(row).map((cell, j) => (
                  <VaporTable.Cell
                    key={j}
                    className="text-body4 text-gray-400 px-4 py-3"
                  >
                    {cell}
                  </VaporTable.Cell>
                ))}
              </VaporTable.Row>
            ))}
          </VaporTable.Body>
        </VaporTable.Root>
      </div>
      {renderPagination()}
    </div>
  );
}
