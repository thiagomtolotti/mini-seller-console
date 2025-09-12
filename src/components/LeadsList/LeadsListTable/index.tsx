import { useContext } from "react";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import type { Lead } from "@/types/lead";

import LeadsListTableRow from "./LeadsListTableRow";
import TableHeader from "@/components/ui/TableHeader";
import ScoreHeaderCell from "./ScoreHeaderCell";

import TableSkeleton from "../../ui/TableSkeleton";

interface LeadsListTableProps {
  selectLead: (lead: Lead) => void;
  selectOpportunity: (lead: Lead) => void;
}

export default function LeadsListTable({
  selectLead,
  selectOpportunity,
}: LeadsListTableProps) {
  const { leads, pendingLeads } = useContext(LeadsListContext);

  const columns = ["Name", "Company", <ScoreHeaderCell />, "Status", "Actions"];

  return (
    <table className="w-full">
      <TableHeader columns={columns} />

      <tbody>
        {pendingLeads && <TableSkeleton columns={columns.length} rows={50} />}

        {leads?.map((lead) => (
          <LeadsListTableRow
            key={lead.id}
            lead={lead}
            onClick={() => selectLead(lead)}
            onOpportunityClick={() => selectOpportunity(lead)}
          />
        ))}
      </tbody>
    </table>
  );
}
