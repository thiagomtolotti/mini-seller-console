import { useState } from "react";

import { LeadsListProvider } from "@/contexts/LeadsListProvider";

import type { Lead } from "@/types/lead";

import LeadsListTitle from "./LeadsListTitle";

import LeadsListTableFilters from "./LeadsListFilters";
import LeadsListTable from "./LeadsListTable";
import LeadDetailPanel from "../LeadDetailPanel";

export default function LeadsList() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <LeadsListProvider>
      <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
        <LeadsListTitle />

        <LeadsListTableFilters />

        <LeadsListTable selectLead={setSelectedLead} />

        <LeadDetailPanel
          selectedLead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      </div>
    </LeadsListProvider>
  );
}
