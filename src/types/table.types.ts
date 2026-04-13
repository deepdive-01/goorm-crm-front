export type MemberRow = {
  id: number;
  name: string;
  email: string;
  grade: string;
  status: "active" | "inactive";
  joinDate: string;
};

export type SimpleUserRow = {
  id: number;
  name: string;
  email: string;
};

type PaginationConfig = {
  pageSizeOptions?: number[];
  defaultPageSize?: number;
};

export type TableProps =
  | ({ variant: "member"; data: MemberRow[] } & PaginationConfig)
  | ({ variant: "simple"; data: SimpleUserRow[] } & PaginationConfig);
