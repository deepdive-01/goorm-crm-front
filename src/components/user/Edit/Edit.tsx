import { cloneElement, isValidElement, useState } from "react";

import { Button, Dialog, Field, HStack } from "@vapor-ui/core";
import { CloseOutlineIcon } from "@vapor-ui/icons";
import { ConfirmOutlineIcon } from "@vapor-ui/icons";
import { EditIcon } from "@vapor-ui/icons";

import type { InputProps } from "../../../types/input.types";
import Input from "../../common/Input/Input";

interface EditProps extends InputProps {
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  // modal이 있으면 인라인 편집 대신 모달을 열어 처리
  // Dialog.Header + Dialog.Body + Dialog.Footer 형태의 ReactNode을 전달
  // modal 컴포넌트는 onClose?: () => void prop을 받을 수 있음
  modal?: React.ReactNode;
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
  modal,
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
        {modal ? (
          // modal prop이 있으면 편집 버튼 클릭 시 인라인 편집 대신 모달을 열어 처리
          <Dialog.Root
            open={isEditing}
            onOpenChange={(open) => setIsEditing(open)}
          >
            <Dialog.Trigger
              render={
                <Button className="p-1 text-gray-300 border border-gray-300 w-fit">
                  <EditIcon size={iconSize} />
                </Button>
              }
            />
            <Dialog.PortalPrimitive>
              <Dialog.OverlayPrimitive />
              <Dialog.PopupPrimitive>
                {isValidElement(modal)
                  ? cloneElement(
                      modal as React.ReactElement<{ onClose?: () => void }>,
                      {
                        onClose: () => setIsEditing(false),
                      },
                    )
                  : modal}
              </Dialog.PopupPrimitive>
            </Dialog.PortalPrimitive>
          </Dialog.Root>
        ) : !isEditing ? (
          // modal이 없고 편집 중이 아니면 편집 버튼 표시
          <Button
            className="p-1 text-gray-300 border border-gray-300 w-fit"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon size={iconSize} />
          </Button>
        ) : (
          // 인라인 편집 모드
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
              className="p-1 border text-primary-500 border-primary-500 w-fit"
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
