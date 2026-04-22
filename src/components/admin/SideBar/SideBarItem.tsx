interface SideBarItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SideBarItem({
  icon,
  label,
  isActive = false,
  onClick,
}: SideBarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors duration-150 text-body4 ${
        isActive
          ? "bg-gray-50 font-semibold"
          : " hover:bg-gray-50 hover:text-gray-400"
      }`}
    >
      <img src={icon} alt={label} />
      <span className="text-black">{label}</span>
    </button>
  );
}
