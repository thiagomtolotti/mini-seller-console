import { View } from "@/types/View.d";
import TabButton from "./TabButton";

interface SelectViewTabsProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function SelectViewTabs({
  currentView,
  setCurrentView,
}: SelectViewTabsProps) {
  return (
    <div className="flex gap-6 justify-center md:justify-start">
      {Object.entries(View).map(([key, value]) => (
        <TabButton
          key={key}
          label={key}
          isActive={currentView === value}
          onClick={() => setCurrentView(value)}
        />
      ))}
    </div>
  );
}
