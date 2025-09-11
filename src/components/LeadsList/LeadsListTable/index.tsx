import { useContext } from "react";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import type { Lead } from "@/types/lead";

import LeadsListTableRow from "./LeadsListTableRow";
import LeadsListTableHeader from "./LeadsListTableHeader";
import LeadsListTableSkeleton from "./LeadsListTableSkeleton";

interface LeadsListTableProps {
  selectLead: (lead: Lead) => void;
}

export default function LeadsListTable({ selectLead }: LeadsListTableProps) {
  const { leads, pendingLeads } = useContext(LeadsListContext);

  return (
    <table className="w-full">
      <LeadsListTableHeader />

      <tbody>
        {pendingLeads && <LeadsListTableSkeleton />}

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
