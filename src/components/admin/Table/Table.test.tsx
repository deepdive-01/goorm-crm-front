import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Table from "./Table";
import type { MemberRow, SimpleUserRow } from "../../../types/table.types";

const memberData: MemberRow[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `이름${i + 1}`,
  email: `user${i + 1}@example.com`,
  grade: i % 2 === 0 ? "VIP" : "일반",
  status: i % 2 === 0 ? "active" : "inactive",
  joinDate: "2024-01-01",
}));

const simpleData: SimpleUserRow[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `이름${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

describe("Table - member variant", () => {
  it("헤더가 렌더링된다", () => {
    render(<Table variant="member" data={memberData} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("등급")).toBeInTheDocument();
    expect(screen.getByText("상태")).toBeInTheDocument();
    expect(screen.getByText("가입일")).toBeInTheDocument();
  });

  it("기본 10개 행만 렌더링된다", () => {
    render(<Table variant="member" data={memberData} />);
    expect(screen.getByText("이름1")).toBeInTheDocument();
    expect(screen.getByText("이름10")).toBeInTheDocument();
    expect(screen.queryByText("이름11")).not.toBeInTheDocument();
  });

  it("active 상태는 '활성' 배지로 렌더링된다", () => {
    render(<Table variant="member" data={memberData} />);
    const badges = screen.getAllByText("활성");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("inactive 상태는 '비활성' 배지로 렌더링된다", () => {
    render(<Table variant="member" data={memberData} />);
    const badges = screen.getAllByText("비활성");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("다음 페이지 버튼을 누르면 다음 데이터가 렌더링된다", () => {
    render(<Table variant="member" data={memberData} />);
    fireEvent.click(screen.getByRole("button", { name: "Next Page" }));
    expect(screen.getByText("이름11")).toBeInTheDocument();
    expect(screen.queryByText("이름1")).not.toBeInTheDocument();
  });

  it("페이지 번호 버튼을 누르면 해당 페이지로 이동한다", () => {
    render(<Table variant="member" data={memberData} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByText("이름11")).toBeInTheDocument();
  });

  it("첫 페이지에서 이전 버튼은 비활성화된다", () => {
    render(<Table variant="member" data={memberData} />);
    expect(
      screen.getByRole("button", { name: "Previous Page" }),
    ).toBeDisabled();
  });

  it("마지막 페이지에서 다음 버튼은 비활성화된다", () => {
    render(<Table variant="member" data={memberData} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByRole("button", { name: "Next Page" })).toBeDisabled();
  });

  it("defaultPageSize를 20으로 설정하면 20개 행이 렌더링된다", () => {
    render(<Table variant="member" data={memberData} defaultPageSize={20} />);
    expect(screen.getByText("이름20")).toBeInTheDocument();
    expect(screen.queryByText("이름21")).not.toBeInTheDocument();
  });

  it("데이터가 없을 때 테이블 헤더만 렌더링된다", () => {
    render(<Table variant="member" data={[]} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.queryByText("이름1")).not.toBeInTheDocument();
  });
});

describe("Table - simple variant", () => {
  it("헤더가 렌더링된다", () => {
    render(<Table variant="simple" data={simpleData} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("이메일")).toBeInTheDocument();
  });

  it("등급/상태/가입일 헤더가 렌더링되지 않는다", () => {
    render(<Table variant="simple" data={simpleData} />);
    expect(screen.queryByText("등급")).not.toBeInTheDocument();
    expect(screen.queryByText("상태")).not.toBeInTheDocument();
    expect(screen.queryByText("가입일")).not.toBeInTheDocument();
  });

  it("기본 10개 행만 렌더링된다", () => {
    render(<Table variant="simple" data={simpleData} />);
    expect(screen.getByText("이름10")).toBeInTheDocument();
    expect(screen.queryByText("이름11")).not.toBeInTheDocument();
  });

  it("다음 페이지 버튼을 누르면 다음 데이터가 렌더링된다", () => {
    render(<Table variant="simple" data={simpleData} />);
    fireEvent.click(screen.getByRole("button", { name: "Next Page" }));
    expect(screen.getByText("이름11")).toBeInTheDocument();
    expect(screen.queryByText("이름1")).not.toBeInTheDocument();
  });
});
