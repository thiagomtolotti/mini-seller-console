import type { Lead } from "@/types/lead";

import LeadsListTableRow from "./LeadsListTableRow";
import LeadsListTableHeader from "./LeadsListTableHeader";
import LeadsListTableSkeleton from "./LeadsListTableSkeleton";

interface LeadsListTableProps {
  leads?: Lead[];
  pending: boolean;
  selectLead: (lead: Lead) => void;
}

export default function LeadsListTable({
  leads,
  pending,
  selectLead,
}: LeadsListTableProps) {
  return (
    <table className="w-full">
      <LeadsListTableHeader />

      <tbody>
        {pending && <LeadsListTableSkeleton />}

        {leads?.map((lead) => (
          <LeadsListTableRow
            key={lead.id}
            lead={lead}
            onClick={() => selectLead(lead)}
          />
        ))}
      </tbody>
    </table>
  );
}
