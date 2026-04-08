import { TextInput } from "@vapor-ui/core";
import { useState } from "react";
import type { ReactNode } from "react";
import { formatNumber } from "../../../utils/formatNumber";
import { formatTel } from "../../../utils/formatTel";

type BaseInputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url" | "tel" | "search" | "number";
  size?: "sm" | "md" | "lg" | "xl";
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
};

export default function BaseInput({
  value,
  defaultValue,
  placeholder,
  type = "text",
  size = "md",
  invalid = false,
  disabled = false,
  readOnly = false,
  className,
  suffix,
  onChange,
}: BaseInputProps) {
  // tel과 number 타입은 내부적으로 포맷팅된 값을 관리하기 위해 별도의 state를 사용
  const [telValue, setTelValue] = useState(
    defaultValue ? formatTel(defaultValue) : "",
  );
  const [numberValue, setNumberValue] = useState(
    defaultValue ? formatNumber(defaultValue) : "",
  );

  // 입력값이 변경될 때마다 포맷팅된 값을 상태로 관리하고, onChange 콜백을 호출 (실시간 렌더링)
  const handleChange = (val: string) => {
    if (type === "tel") {
      const formatted = formatTel(val);
      setTelValue(formatted);
      onChange?.(formatted);
    } else if (type === "number") {
      const formatted = formatNumber(val);
      setNumberValue(formatted);
      onChange?.(formatted);
    } else {
      onChange?.(val);
    }
  };

  const isCustomType = type === "tel" || type === "number";

  return (
    <div className="flex items-center gap-2">
      <TextInput
        value={
          type === "tel" ? telValue : type === "number" ? numberValue : value
        }
        defaultValue={isCustomType ? undefined : defaultValue}
        placeholder={placeholder}
        type={isCustomType ? "text" : type}
        size={size}
        invalid={invalid}
        disabled={disabled}
        readOnly={readOnly}
        className={className}
        onValueChange={handleChange}
      />
      {suffix}
    </div>
  );
}
