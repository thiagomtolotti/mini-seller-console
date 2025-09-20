import clsx from "clsx";

interface SelectViewTabsProps {
  currentView: "leads" | "opportunities";
  setCurrentView: (view: "leads" | "opportunities") => void;
}

export default function SelectViewTabs({
  currentView,
  setCurrentView,
}: SelectViewTabsProps) {
  return (
    <div className="flex gap-6 justify-center md:justify-start">
      <TabButton
        label="Leads"
        isActive={currentView === "leads"}
        onClick={() => setCurrentView("leads")}
      />
      <TabButton
        label="Opportunities"
        isActive={currentView === "opportunities"}
        onClick={() => setCurrentView("opportunities")}
      />
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
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
