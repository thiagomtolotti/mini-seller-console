import clsx from "clsx";

interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function TabButton({
  label,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      className={clsx(
        "text-2xl font-bold mb-6 cursor-pointer transition-all px-4 pb-2 border-b-2",
        isActive
          ? " border-slate-50"
          : " text-gray-600 hover:text-gray-400 border-transparent"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
