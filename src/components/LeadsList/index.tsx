import { useState } from "react";

import type { Lead } from "@/types/lead";

import LeadsListTableFilters from "./LeadsListFilters";
import LeadsListTable from "./LeadsListTable";
import LeadDetailPanel from "../LeadDetailPanel";

import CreateOpportunityModal from "../CreateOpportunityModal";
import LeadsListCards from "./LeadsListCards";

export default function LeadsList() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Lead | null>(
    null
  );

  return (
    <>
      <LeadsListTableFilters />

      <LeadsListTable
        selectLead={setSelectedLead}
        selectOpportunity={setSelectedOpportunity}
      />

      <LeadsListCards
        selectLead={setSelectedLead}
        selectOpportunity={setSelectedOpportunity}
      />

      <LeadDetailPanel
        selectedLead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      <CreateOpportunityModal
        onClose={() => setSelectedOpportunity(null)}
        selectedLead={selectedOpportunity}
      />
    </>
  );
}
