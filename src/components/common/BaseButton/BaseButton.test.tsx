import { fireEvent, render, screen } from "@testing-library/react";
import BaseButton from "./BaseButton";

describe("BaseButton", () => {
  describe("렌더링", () => {
    it("label이 렌더링된다", () => {
      render(<BaseButton label="저장" />);
      expect(screen.getByText("저장")).toBeInTheDocument();
    });

    it("아이콘이 없으면 label만 렌더링된다", () => {
      render(<BaseButton label="저장" />);
      expect(screen.getByText("저장")).toBeInTheDocument();
    });

    it("iconPosition이 left이면 아이콘이 label 앞에 렌더링된다", () => {
      const icon = <span data-testid="icon">★</span>;
      render(<BaseButton label="저장" icon={icon} iconPosition="left" />);
      const button = screen.getByRole("button");
      const children = Array.from(button.childNodes);
      const iconIndex = children.findIndex(
        (node) => (node as HTMLElement).dataset?.testid === "icon",
      );
      const labelIndex = children.findIndex((node) =>
        node.textContent?.includes("저장"),
      );
      expect(iconIndex).toBeLessThan(labelIndex);
    });

    it("iconPosition이 right이면 아이콘이 label 뒤에 렌더링된다", () => {
      const icon = <span data-testid="icon">★</span>;
      render(<BaseButton label="저장" icon={icon} iconPosition="right" />);
      const button = screen.getByRole("button");
      const children = Array.from(button.childNodes);
      const iconIndex = children.findIndex(
        (node) => (node as HTMLElement).dataset?.testid === "icon",
      );
      const labelIndex = children.findIndex((node) =>
        node.textContent?.includes("저장"),
      );
      expect(iconIndex).toBeGreaterThan(labelIndex);
    });
  });

  describe("클릭 이벤트", () => {
    it("클릭 시 onClick이 호출된다", () => {
      const handleClick = vi.fn();
      render(<BaseButton label="저장" onClick={handleClick} />);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled일 때 onClick이 호출되지 않는다", () => {
      const handleClick = vi.fn();
      render(<BaseButton label="저장" disabled onClick={handleClick} />);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
