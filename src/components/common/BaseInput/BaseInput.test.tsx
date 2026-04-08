import { fireEvent, render, screen } from "@testing-library/react";
import BaseInput from "./BaseInput";

describe("BaseInput", () => {
  describe("렌더링", () => {
    it("input이 렌더링된다", () => {
      render(<BaseInput />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("placeholder가 렌더링된다", () => {
      render(<BaseInput placeholder="입력하세요" />);
      expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
    });

    it("defaultValue가 렌더링된다", () => {
      render(<BaseInput defaultValue="기본값" />);
      expect(screen.getByDisplayValue("기본값")).toBeInTheDocument();
    });

    it("suffix가 렌더링된다", () => {
      render(<BaseInput suffix={<button>검색</button>} />);
      expect(screen.getByText("검색")).toBeInTheDocument();
    });

    it("disabled일 때 input이 비활성화된다", () => {
      render(<BaseInput disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("입력 이벤트", () => {
    it("값 입력 시 onChange가 호출된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "테스트" },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("number 포맷", () => {
    it("1000 입력 시 1,000 형식으로 반환된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="number" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "1000" },
      });
      expect(handleChange).toHaveBeenCalledWith("1,000");
    });

    it("100000000 입력 시 100,000,000 형식으로 반환된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="number" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "100000000" },
      });
      expect(handleChange).toHaveBeenCalledWith("100,000,000");
    });

    it("숫자 외 문자는 제거된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="number" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "1,000원" },
      });
      expect(handleChange).toHaveBeenCalledWith("1,000");
    });
  });

  describe("tel 포맷", () => {
    it("010 입력 시 그대로 반환된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="tel" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "010" },
      });
      expect(handleChange).toHaveBeenCalledWith("010");
    });

    it("01012 입력 시 010-12 형식으로 반환된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="tel" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "01012" },
      });
      expect(handleChange).toHaveBeenCalledWith("010-12");
    });

    it("01012345678 입력 시 010-1234-5678 형식으로 반환된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="tel" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "01012345678" },
      });
      expect(handleChange).toHaveBeenCalledWith("010-1234-5678");
    });

    it("숫자 외 문자는 제거된다", () => {
      const handleChange = vi.fn();
      render(<BaseInput type="tel" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "010-1234-5678" },
      });
      expect(handleChange).toHaveBeenCalledWith("010-1234-5678");
    });
  });
});
