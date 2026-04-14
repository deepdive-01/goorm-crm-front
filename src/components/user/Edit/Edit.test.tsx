import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Edit from "./Edit";

const defaultProps = {
  validationMode: "onChange" as const,
};

describe("Edit", () => {
  describe("렌더링", () => {
    it("초기에 수정 버튼이 렌더링된다", () => {
      render(<Edit {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("초기에 Input이 보이지 않는다", () => {
      render(<Edit {...defaultProps} placeholder="입력" />);
      expect(screen.queryByPlaceholderText("입력")).not.toBeInTheDocument();
    });

    it("초기에 버튼이 1개만 렌더링된다", () => {
      render(<Edit {...defaultProps} />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });
  });

  describe("편집 모드 진입", () => {
    it("수정 버튼 클릭 시 Input이 나타난다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("입력")).toBeInTheDocument();
    });

    it("수정 버튼 클릭 시 수정 버튼이 사라진다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} />);
      const editButton = screen.getByRole("button");
      await user.click(editButton);
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("수정 버튼 클릭 시 닫기·확인 버튼 2개가 나타난다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });

  describe("props 전달", () => {
    it("placeholder가 Input에 전달된다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="이름을 입력하세요" />);
      await user.click(screen.getByRole("button"));
      expect(
        screen.getByPlaceholderText("이름을 입력하세요"),
      ).toBeInTheDocument();
    });

    it("value가 Input에 전달된다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" value="홍길동" />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("입력")).toHaveValue("홍길동");
    });

    it("disabled이면 Input이 비활성화된다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" disabled />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("입력")).toBeDisabled();
    });

    it("onChange가 Input에 전달된다", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" onChange={onChange} />);
      await user.click(screen.getByRole("button"));
      await user.type(screen.getByPlaceholderText("입력"), "a");
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("확인 버튼 (onConfirm)", () => {
    it("확인 버튼 클릭 시 onConfirm이 현재 입력값과 함께 호출된다", async () => {
      const onConfirm = vi.fn();
      const user = userEvent.setup();
      render(
        <Edit {...defaultProps} placeholder="입력" onConfirm={onConfirm} />,
      );
      await user.click(screen.getByRole("button"));
      await user.type(screen.getByPlaceholderText("입력"), "홍길동");
      await user.click(screen.getAllByRole("button")[1]);
      expect(onConfirm).toHaveBeenCalledWith("홍길동");
    });

    it("확인 버튼 클릭 시 편집 모드가 닫힌다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" />);
      await user.click(screen.getByRole("button"));
      await user.click(screen.getAllByRole("button")[1]);
      expect(screen.queryByPlaceholderText("입력")).not.toBeInTheDocument();
    });
  });

  describe("닫기 버튼 (onCancel)", () => {
    it("닫기 버튼 클릭 시 onCancel이 호출된다", async () => {
      const onCancel = vi.fn();
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" onCancel={onCancel} />);
      await user.click(screen.getByRole("button"));
      await user.click(screen.getAllByRole("button")[0]);
      expect(onCancel).toHaveBeenCalled();
    });

    it("닫기 버튼 클릭 시 편집 모드가 닫힌다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" />);
      await user.click(screen.getByRole("button"));
      await user.click(screen.getAllByRole("button")[0]);
      expect(screen.queryByPlaceholderText("입력")).not.toBeInTheDocument();
    });

    it("닫기 버튼 클릭 시 입력값이 원래 값으로 복원된다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" value="원래값" />);
      await user.click(screen.getByRole("button"));
      await user.clear(screen.getByPlaceholderText("입력"));
      await user.type(screen.getByPlaceholderText("입력"), "수정값");
      await user.click(screen.getAllByRole("button")[0]);
      await user.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("입력")).toHaveValue("원래값");
    });
  });

  describe("tel 숫자 검증", () => {
    it("type=tel에서 숫자 외 문자 입력 시 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" type="tel" />);
      await user.click(screen.getByRole("button"));
      await user.type(screen.getByPlaceholderText("입력"), "abc");
      expect(screen.getByText("숫자만 입력 가능합니다")).toBeInTheDocument();
    });

    it("type=tel에서 숫자만 입력하면 에러 메시지가 표시되지 않는다", async () => {
      const user = userEvent.setup();
      render(<Edit {...defaultProps} placeholder="입력" type="tel" />);
      await user.click(screen.getByRole("button"));
      await user.type(screen.getByPlaceholderText("입력"), "010");
      expect(
        screen.queryByText("숫자만 입력 가능합니다"),
      ).not.toBeInTheDocument();
    });
  });
});
