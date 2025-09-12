import { useState } from "react";

import { LeadsListProvider } from "@/contexts/LeadsListProvider";

import type { Lead } from "@/types/lead";

import LeadsListTableFilters from "./LeadsListFilters";
import LeadsListTable from "./LeadsListTable";
import LeadDetailPanel from "../LeadDetailPanel";

import OpportunityModal from "../OpportunityModal";

export default function LeadsList() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Lead | null>(
    null
  );

  return (
    <LeadsListProvider>
      <LeadsListTableFilters />

      <LeadsListTable
        selectLead={setSelectedLead}
        selectOpportunity={setSelectedOpportunity}
      />

      <LeadDetailPanel
        selectedLead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      <OpportunityModal
        onClose={() => setSelectedOpportunity(null)}
        selectedLead={selectedOpportunity}
      />
    </LeadsListProvider>
  );
}
