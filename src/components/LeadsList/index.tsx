import { useState } from "react";

import type { Lead } from "@/types/lead";

import LeadDetailPanel from "../LeadDetailPanel";
import LeadsListTableFilters from "./LeadsListFilters";
import LeadsListTable from "./LeadsListTable";

export default function LeadsList() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
      <LeadsListTableFilters />

      <LeadsListTable setSelectedLead={setSelectedLead} />

      <LeadDetailPanel
        selectedLead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
