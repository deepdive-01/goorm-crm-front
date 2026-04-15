import { useState } from "react";

import { Field, Text, TextInput } from "@vapor-ui/core";

import type { InputProps } from "../../../types/input.types";
import { formatNumber } from "../../../utils/formatNumber";
import { formatTel } from "../../../utils/formatTel";

export default function Input({
  id,
  label,
  size,
  type,
  name,
  validationMode,
  match,
  readonly,
  disabled,
  invalid,
  pattern,
  defaultValue,
  value,
  placeholder,
  description,
  requiredError,
  labelClassName,
  textClassName,
  inputClassName,
  descriptionClassName,
  suffixClassName,
  errorClassName,
  suffix,
  showRequiredMark,
  onChange,
}: InputProps) {
  const isRequired = name === "required-field";
  const isFormatted = type === "tel" || type === "number";

  const [internalValue, setInternalValue] = useState(() => {
    const initial = value ?? defaultValue ?? "";
    if (type === "tel") return formatTel(initial);
    if (type === "number") return formatNumber(initial);
    return initial;
  });

  const [telError, setTelError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "tel") {
      const hasNonDigit = /\D/.test(e.target.value.replace(/-/g, ""));
      setTelError(hasNonDigit);
      const formatted = formatTel(e.target.value);
      setInternalValue(formatted);
      onChange?.({ ...e, target: { ...e.target, value: formatted } });
    } else if (type === "number") {
      const formatted = formatNumber(e.target.value);
      setInternalValue(formatted);
      onChange?.({ ...e, target: { ...e.target, value: formatted } });
    } else {
      onChange?.(e);
    }
  };

  const inputValue = isFormatted ? internalValue : value;
  const inputDefaultValue = isFormatted ? undefined : defaultValue;
  const inputType = type === "number" ? "text" : type;

  return (
    <Field.Root name={name} validationMode={validationMode}>
      <Field.Label
        $css={{ gap: "$100", flexDirection: "column" }}
        className={labelClassName}
      >
        <Text
          className={`flex w-full justify-between items-center text-body4 text-gray-400 ${textClassName ?? ""}`}
        >
          <div className="flex items-center gap-1">
            {label}
            {showRequiredMark && <Text className="text-semantic-red"> *</Text>}
          </div>
          {telError && (
            <p className="flex text-body5 text-semantic-red">
              숫자만 입력 가능합니다
            </p>
          )}
        </Text>
        <div className={`flex items-center w-full ${suffixClassName ?? ""}`}>
          <TextInput
            id={id}
            size={size}
            type={inputType}
            value={inputValue}
            defaultValue={inputDefaultValue}
            required={isRequired}
            placeholder={placeholder}
            className={`px-3 placeholder:text-gray-400 text-body4 ${readonly ? "text-gray-300" : "text-black"} ${suffix ? "flex-1" : "w-full"} ${inputClassName ?? ""}`}
            readOnly={readonly}
            disabled={disabled}
            invalid={invalid}
            pattern={pattern}
            onChange={handleChange}
          />
          {suffix}
        </div>
      </Field.Label>
      <Field.Description
        className={`text-body5 text-gray-300 ${descriptionClassName ?? ""}`}
      >
        {description}
      </Field.Description>
      <Field.Error match={match} className={errorClassName}>
        {requiredError}
      </Field.Error>
    </Field.Root>
  );
}
