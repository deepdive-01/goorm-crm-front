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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "tel") {
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
        <Text className={`text-body4 text-gray-400 ${textClassName ?? ""}`}>
          {label}
          {showRequiredMark && <Text className="text-semantic-red"> *</Text>}
        </Text>
        <div className="flex items-center w-full">
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
