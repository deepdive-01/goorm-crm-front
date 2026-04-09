import { Field, Text, TextInput } from "@vapor-ui/core";
import type { InputProps } from "../../../types/input.types";

export default function Input({
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
}: InputProps) {
  const isRequired = name === "required-field";

  return (
    <Field.Root
      name={name}
      validationMode={isRequired ? validationMode : undefined}
    >
      <Field.Label
        $css={{ gap: "$100", flexDirection: "column" }}
        className={labelClassName}
      >
        <Text className={`text-body4 text-gray-400 ${textClassName ?? ""}`}>
          {label}
          {isRequired && <Text foreground="danger-100"> *</Text>}
        </Text>
        <TextInput
          size={size}
          type={type}
          value={value}
          defaultValue={defaultValue}
          required={isRequired}
          placeholder={placeholder}
          className={`px-3 placeholder:text-gray-400 text-body4 ${readonly ? "text-gray-300" : "text-black"} ${inputClassName ?? ""}`}
          readOnly={readonly}
          disabled={disabled}
          invalid={invalid}
          pattern={pattern}
        />
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
