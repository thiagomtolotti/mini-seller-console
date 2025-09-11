import { useState } from "react";

import type { Lead, LeadStatus } from "@/types/lead";

import LeadDetailPanel from "../LeadDetailPanel";
import LeadsListTableFilters from "./LeadsListFilters";
import LeadsListTable from "./LeadsListTable";
import useLeadsList from "@/hooks/useLeadsList";

export default function LeadsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus[]>([]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { leads, pending } = useLeadsList();

  const filteredLeads = leads?.filter(
    (lead) =>
      (lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.name.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter.includes(lead.status) || statusFilter.length === 0)
  );

  return (
    <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
      <LeadsListTableFilters
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <LeadsListTable
        leads={filteredLeads}
        pending={pending}
        selectLead={setSelectedLead}
      />

      <LeadDetailPanel
        selectedLead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
