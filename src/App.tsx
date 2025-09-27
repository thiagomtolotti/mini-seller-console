import { useState } from "react";

import { OpportunitiesProvider } from "./contexts/OpportunitiesProvider";
import { LeadsListProvider } from "./contexts/LeadsListProvider";

import SelectViewTabs from "./components/layout/SelectViewTabs";

import LeadsList from "./components/LeadsList";
import OpportunitiesList from "./components/OpportunitiesList";
import { ConfigurationsProvider } from "./contexts/ConfigurationsProvider";

function App() {
  const [currentView, setCurrentView] = useState<"leads" | "opportunities">(
    "leads"
  );

  return (
    <Providers>
      <div className="fixed top-0 left-0 w-full h-full bg-blue-950" />
      <div className="fixed top-0 left-0 w-full h-full bg-linear-to-t to-70% from-black/30 to-black/80" />

      <div className="mx-auto w-full max-w-4xl h-full bg-black/40 border border-slate-800 p-6 md:p-10 m-12 rounded-xl drop-shadow-lg text-slate-50">
        <SelectViewTabs
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {currentView === "leads" && <LeadsList />}

        {currentView === "opportunities" && <OpportunitiesList />}
      </div>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigurationsProvider>
      <LeadsListProvider>
        <OpportunitiesProvider>{children}</OpportunitiesProvider>
      </LeadsListProvider>
    </ConfigurationsProvider>
  );
}

export default App;
