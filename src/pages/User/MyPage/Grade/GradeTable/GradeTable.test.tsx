import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GradeTable from "./GradeTable";

describe("GradeTable", () => {
  describe("헤딩", () => {
    it("등급·선정기준·할인적립·무료배송 헤딩이 표시된다", () => {
      render(<GradeTable />);
      expect(screen.getByText("등급")).toBeInTheDocument();
      expect(screen.getByText("선정기준")).toBeInTheDocument();
      expect(screen.getByText("할인/적립")).toBeInTheDocument();
      expect(screen.getByText("무료배송")).toBeInTheDocument();
    });
  });

  describe("등급 행", () => {
    it("4개 등급이 모두 표시된다", () => {
      render(<GradeTable />);
      ["MEMBER", "BRONZE", "SILVER", "GOLD"].forEach((grade) => {
        expect(screen.getByText(grade)).toBeInTheDocument();
      });
    });

    it("각 등급의 선정기준이 표시된다", () => {
      render(<GradeTable />);
      expect(screen.getByText("가입시")).toBeInTheDocument();
      expect(
        screen.getByText("누적 구매금액 10만원 이상 시"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("누적 구매금액 20만원 이상 시"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("누적 구매금액 50만원 이상 시"),
      ).toBeInTheDocument();
    });

    it("각 등급의 할인/적립 혜택이 표시된다", () => {
      render(<GradeTable />);
      expect(screen.getByText("3%")).toBeInTheDocument();
      expect(screen.getByText("5%")).toBeInTheDocument();
      expect(screen.getByText("7%")).toBeInTheDocument();
      expect(screen.getByText("할인 10% / 적립 7%")).toBeInTheDocument();
    });
  });

  describe("무료배송", () => {
    it("MEMBER는 무료배송이 '-'로 표시된다", () => {
      render(<GradeTable />);
      // MEMBER 행의 무료배송 셀 확인
      // '-'가 하나만 존재하면 MEMBER에만 해당 (나머지는 'O')
      expect(screen.getByText("-")).toBeInTheDocument();
    });

    it("BRONZE·SILVER·GOLD는 무료배송이 'O'로 표시된다", () => {
      render(<GradeTable />);
      // BRONZE, SILVER, GOLD 3개 등급에 'O'가 3개 표시됨
      expect(screen.getAllByText("O")).toHaveLength(3);
    });
  });
});
