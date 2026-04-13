import type { ComponentType } from "react";

interface SideBarItemProps {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SideBarItem({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: SideBarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors duration-150 text-body4 ${
        isActive
          ? "bg-primary-500 text-white font-semibold"
          : "text-gray-300 hover:bg-gray-50 hover:text-gray-400"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
