import clsx from "clsx";
import { useState } from "react";

export default function SelectViewTabs() {
  const [currentView, setCurrentView] = useState<"leads" | "opportunities">(
    "leads"
  );

  return (
    <div className="flex gap-6">
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
          ? "text-slate-800 border-slate-800"
          : " text-slate-400 hover:text-slate-800 border-transparent"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
