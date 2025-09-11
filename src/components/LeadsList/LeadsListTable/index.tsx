import useLeadsList from "@/hooks/useLeadsList";

import type { Lead } from "@/types/lead";

import LeadsListTableRow from "./LeadsListTableRow";
import LeadsListTableHeader from "./LeadsListTableHeader";
import LeadsListTableSkeleton from "./LeadsListTableSkeleton";

interface LeadsListTableProps {
  setSelectedLead: (lead: Lead) => void;
}

export default function LeadsListTable({
  setSelectedLead,
}: LeadsListTableProps) {
  const { leads, pending } = useLeadsList();

  return (
    <table className="w-full">
      <LeadsListTableHeader />

      <tbody>
        {pending && <LeadsListTableSkeleton />}

        {leads?.map((lead) => (
          <LeadsListTableRow
            key={lead.id}
            lead={lead}
            onClick={() => setSelectedLead(lead)}
          />
        ))}
      </tbody>
    </table>
  );
}
