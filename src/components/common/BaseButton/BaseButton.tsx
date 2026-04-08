import { Button, HStack } from "@vapor-ui/core";
import type { ReactNode } from "react";

type BaseButtonProps = {
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "fill" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function BaseButton({
  label,
  icon,
  iconPosition = "left",
  size = "md",
  variant = "fill",
  className,
  disabled = false,
  onClick,
}: BaseButtonProps) {
  return (
    <HStack $css={{ gap: "$100" }}>
      <Button
        size={size}
        variant={variant}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {icon && iconPosition === "left" && icon}
        {label}
        {icon && iconPosition === "right" && icon}
      </Button>
    </HStack>
  );
}
