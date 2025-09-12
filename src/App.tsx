import { useState } from "react";
import SelectViewTabs from "./components/layout/SelectViewTabs";

import LeadsList from "./components/LeadsList";
import OpportunitiesList from "./components/OpportunitiesList";

function App() {
  const [currentView, setCurrentView] = useState<"leads" | "opportunities">(
    "leads"
  );

  return (
    <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
      <SelectViewTabs
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {currentView === "leads" && <LeadsList />}

      {currentView === "opportunities" && <OpportunitiesList />}
    </div>
  );
}

export default App;
