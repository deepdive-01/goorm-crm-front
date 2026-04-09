import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Input from "./Input";

describe("Input", () => {
  describe("렌더링", () => {
    it("label이 렌더링된다", () => {
      render(<Input label="이름" validationMode="onChange" />);
      expect(screen.getByText("이름")).toBeInTheDocument();
    });

    it("placeholder가 렌더링된다", () => {
      render(
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          validationMode="onChange"
        />,
      );
      expect(
        screen.getByPlaceholderText("이름을 입력하세요"),
      ).toBeInTheDocument();
    });

    it("description이 렌더링된다", () => {
      render(
        <Input
          label="이름"
          description="실명을 입력해주세요"
          validationMode="onChange"
        />,
      );
      expect(screen.getByText("실명을 입력해주세요")).toBeInTheDocument();
    });

    // Field.Error는 vapor-ui 내부에서 네이티브 HTML 유효성 검사 상태(ValidityState)에 따라
    // 조건부로 렌더링된다. jsdom에서는 폼 제출 시 네이티브 validation이 완전히 동작하지 않아
    // 실제 에러 메시지가 DOM에 나타나지 않으므로 E2E 테스트에서 검증한다.
    it.skip("requiredError 메시지가 렌더링된다", () => {
      render(
        <Input
          label="이름"
          name="required-field"
          requiredError="이름을 입력해주세요"
          validationMode="onChange"
        />,
      );
      expect(screen.getByText("이름을 입력해주세요")).toBeInTheDocument();
    });
  });

  describe("required-field", () => {
    it("name이 required-field이면 * 표시가 렌더링된다", () => {
      render(
        <Input label="이름" name="required-field" validationMode="onChange" />,
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("name이 required-field가 아니면 * 표시가 없다", () => {
      render(<Input label="이름" validationMode="onChange" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("type", () => {
    it("type이 email이면 input의 type이 email이다", () => {
      render(
        <Input
          label="이메일"
          type="email"
          placeholder="입력"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute(
        "type",
        "email",
      );
    });

    it("type이 password이면 input의 type이 password이다", () => {
      render(
        <Input
          label="비밀번호"
          type="password"
          placeholder="입력"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute(
        "type",
        "password",
      );
    });

    it("type이 tel이면 input의 type이 tel이다", () => {
      render(
        <Input
          label="전화번호"
          type="tel"
          placeholder="입력"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute(
        "type",
        "tel",
      );
    });
  });

  describe("pattern", () => {
    it("pattern이 input에 적용된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          pattern="[0-9]*"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute(
        "pattern",
        "[0-9]*",
      );
    });
  });

  describe("value / defaultValue", () => {
    it("value가 controlled input에 반영된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          value="초기값"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveValue("초기값");
    });

    it("defaultValue가 uncontrolled input에 반영된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          defaultValue="기본값"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveValue("기본값");
    });
  });

  describe("invalid", () => {
    it("invalid이면 input에 aria-invalid가 적용된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          invalid
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });

  describe("disabled / readonly", () => {
    it("disabled이면 input이 비활성화된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          disabled
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toBeDisabled();
    });

    it("readonly이면 input이 readOnly 상태다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          readonly
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveAttribute("readonly");
    });
  });

  describe("className", () => {
    it("inputClassName이 input에 적용된다", () => {
      render(
        <Input
          label="이름"
          placeholder="입력"
          inputClassName="custom-input"
          validationMode="onChange"
        />,
      );
      expect(screen.getByPlaceholderText("입력")).toHaveClass("custom-input");
    });

    it("descriptionClassName이 description에 적용된다", () => {
      render(
        <Input
          label="이름"
          description="설명입니다"
          descriptionClassName="custom-desc"
          validationMode="onChange"
        />,
      );
      expect(screen.getByText("설명입니다")).toHaveClass("custom-desc");
    });

    // Field.Error는 네이티브 유효성 검사 실패 시에만 DOM에 나타나므로
    // jsdom 환경에서는 검증 불가. E2E 테스트에서 검증한다.
    it.skip("errorClassName이 에러 메시지에 적용된다", () => {
      render(
        <Input
          label="이름"
          name="required-field"
          requiredError="필수 항목입니다"
          errorClassName="custom-error"
          validationMode="onChange"
        />,
      );
      expect(screen.getByText("필수 항목입니다")).toHaveClass("custom-error");
    });
  });

  describe("사용자 입력", () => {
    it("텍스트를 입력하면 input에 반영된다", async () => {
      const user = userEvent.setup();
      render(
        <Input label="이름" placeholder="입력" validationMode="onChange" />,
      );
      const input = screen.getByPlaceholderText("입력");
      await user.type(input, "홍길동");
      expect(input).toHaveValue("홍길동");
    });

    it("readonly이면 텍스트를 입력해도 값이 변경되지 않는다", async () => {
      const user = userEvent.setup();
      render(
        <Input
          label="이름"
          placeholder="입력"
          readonly
          defaultValue="고정값"
          validationMode="onChange"
        />,
      );
      const input = screen.getByPlaceholderText("입력");
      await user.type(input, "홍길동");
      expect(input).toHaveValue("고정값");
    });

    it("disabled이면 텍스트를 입력할 수 없다", async () => {
      const user = userEvent.setup();
      render(
        <Input
          label="이름"
          placeholder="입력"
          disabled
          validationMode="onChange"
        />,
      );
      const input = screen.getByPlaceholderText("입력");
      await user.type(input, "홍길동");
      expect(input).toHaveValue("");
    });
  });
});
