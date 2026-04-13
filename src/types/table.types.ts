export type MemberRow = {
  row_1: string | number;
  row_2: string | number;
  row_3: string | number;
  row_4: string | number;
  row_5: string | number;
  row_6: string | number;
};

export type SimpleUserRow = {
  row_1: string | number;
  row_2: string | number;
  row_3: string | number;
};

type PaginationConfig = {
  pageSizeOptions?: number[];
  defaultPageSize?: number;
};

export type TableProps =
  | ({
      variant: "member";
      data: MemberRow[];
      headings: [string, string, string, string, string, string];
    } & PaginationConfig)
  | ({
      variant: "simple";
      data: SimpleUserRow[];
      headings: [string, string, string];
    } & PaginationConfig);
