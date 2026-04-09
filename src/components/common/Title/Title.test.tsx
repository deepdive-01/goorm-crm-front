import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Title from "./Title";

describe("Title", () => {
  it("title이 렌더링된다", () => {
    render(<Title title="페이지 제목" />);
    expect(screen.getByText("페이지 제목")).toBeInTheDocument();
  });

  it("describe가 렌더링된다", () => {
    render(<Title describe="페이지 설명" />);
    expect(screen.getByText("페이지 설명")).toBeInTheDocument();
  });

  it("title과 describe가 함께 렌더링된다", () => {
    render(<Title title="페이지 제목" describe="페이지 설명" />);
    expect(screen.getByText("페이지 제목")).toBeInTheDocument();
    expect(screen.getByText("페이지 설명")).toBeInTheDocument();
  });

  it("DesClassName이 describe에 적용된다", () => {
    render(<Title describe="페이지 설명" DesClassName="text-gray-300" />);
    expect(screen.getByText("페이지 설명")).toHaveClass("text-gray-300");
  });

  it("props가 없으면 빈 상태로 렌더링된다", () => {
    const { container } = render(<Title />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
