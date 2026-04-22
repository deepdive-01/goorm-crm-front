import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GradeBar from "./GradeBar";

const GRADES = ["MEMBER", "BRONZE", "SILVER", "GOLD"];

describe("GradeBar", () => {
  describe("렌더링", () => {
    it("4개의 등급 라벨이 모두 표시된다", () => {
      render(<GradeBar grade="BRONZE" />);
      GRADES.forEach((grade) => {
        expect(screen.getByText(grade)).toBeInTheDocument();
      });
    });

    it("현재 등급 텍스트에 font-semibold 클래스가 적용된다", () => {
      render(<GradeBar grade="SILVER" />);
      expect(screen.getByText("SILVER")).toHaveClass("font-semibold");
    });

    it("현재 등급이 아닌 라벨에는 font-semibold가 없다", () => {
      render(<GradeBar grade="SILVER" />);
      ["MEMBER", "BRONZE", "GOLD"].forEach((grade) => {
        expect(screen.getByText(grade)).not.toHaveClass("font-semibold");
      });
    });
  });

  describe("진행 바", () => {
    it("MEMBER 등급이면 진행 바 너비가 0%이다", () => {
      const { container } = render(<GradeBar grade="MEMBER" />);
      // 진행 바: bg-gray-300 클래스를 가진 div (MEMBER 등급 색)
      const progressBar = container.querySelector(".bg-gray-300");
      expect(progressBar).toHaveStyle({ width: "0%" });
    });

    it("GOLD 등급이면 진행 바 너비가 100%이다", () => {
      const { container } = render(<GradeBar grade="GOLD" />);
      // 진행 바: bg-primary-500 클래스를 가진 div (GOLD 등급 색)
      const progressBar = container.querySelector(".bg-primary-500");
      expect(progressBar).toHaveStyle({ width: "100%" });
    });

    it("알 수 없는 등급이면 진행 바 너비가 0%이다", () => {
      const { container } = render(<GradeBar grade="UNKNOWN" />);
      // 알 수 없는 등급은 fallback bg-gray-300 적용
      const progressBar = container.querySelector(".bg-gray-300");
      expect(progressBar).toHaveStyle({ width: "0%" });
    });
  });
});
