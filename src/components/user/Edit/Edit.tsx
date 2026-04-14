import { useState } from "react";

import { Button, Field, HStack } from "@vapor-ui/core";
import { EditIcon } from "@vapor-ui/icons";
import { CloseOutlineIcon } from "@vapor-ui/icons";
import { ConfirmOutlineIcon } from "@vapor-ui/icons";

import Input from "../../common/Input/Input";
import type { InputProps } from "../../../types/input.types";

interface EditProps extends InputProps {
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
}

export default function Edit({
  id,
  size,
  type,
  name,
  match,
  readonly,
  disabled,
  invalid,
  pattern,
  defaultValue,
  value,
  placeholder,
  requiredError,
  labelClassName,
  textClassName,
  inputClassName,
  errorClassName,
  onChange,
  onConfirm,
  onCancel,
}: EditProps) {
  const iconSize = 22;
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(
    value ?? defaultValue ?? "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleConfirm = () => {
    onConfirm?.(internalValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInternalValue(value ?? defaultValue ?? "");
    onCancel?.();
    setIsEditing(false);
  };

  return (
    <Field.Root name={name}>
      <Field.Label
        $css={{ gap: "$100" }}
        className={`flex items-center ${labelClassName ?? ""}`}
      >
        {!isEditing ? (
          <Button
            className="p-1 text-gray-300 border border-gray-300 w-fit"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon size={iconSize} />
          </Button>
        ) : (
          <HStack $css={{ alignItems: "center", gap: "$150" }}>
            <Input
              id={id}
              size={size}
              type={type}
              name={name}
              match={match}
              readonly={readonly}
              disabled={disabled}
              invalid={invalid}
              pattern={pattern}
              value={internalValue}
              placeholder={placeholder}
              requiredError={requiredError}
              errorClassName={errorClassName}
              textClassName={textClassName}
              inputClassName={inputClassName}
              onChange={handleChange}
            />

            <Button
              className="p-1 text-gray-400 bg-gray-90 w-fit"
              onClick={handleCancel}
            >
              <CloseOutlineIcon size={iconSize} />
            </Button>

            <Button
              className="p-1 text-blue-500 border border-blue-500 w-fit"
              onClick={handleConfirm}
            >
              <ConfirmOutlineIcon size={iconSize} />
            </Button>
          </HStack>
        )}
      </Field.Label>
      <Field.Error match={match} className={errorClassName}>
        {requiredError}
      </Field.Error>
    </Field.Root>
  );
}
