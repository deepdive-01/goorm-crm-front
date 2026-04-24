import { Table as VaporTable } from "@vapor-ui/core";

interface TableSkeletonProps {
  headings: readonly string[];
  rows?: number;
}

export default function TableSkeleton({
  headings,
  rows = 7,
}: TableSkeletonProps) {
  return (
    <div className="border border-gray-90 rounded-lg overflow-hidden">
      <VaporTable.Root $css={{ width: "100%", borderCollapse: "collapse" }}>
        <VaporTable.Header className="bg-gray-50">
          <VaporTable.Row>
            {headings.map((heading) => (
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
          {Array.from({ length: rows }).map((_, i) => (
            <VaporTable.Row
              key={i}
              className="border-t border-gray-90 animate-pulse"
            >
              {headings.map((heading) => (
                <VaporTable.Cell key={heading} className="px-4 py-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </VaporTable.Cell>
              ))}
            </VaporTable.Row>
          ))}
        </VaporTable.Body>
      </VaporTable.Root>
    </div>
  );
}
