import { useContext } from "react";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import type { Lead } from "@/types/lead";

import LeadsListTableRow from "./LeadsListTableRow";
import ScoreHeaderCell from "./ScoreHeaderCell";

import TableHeader from "@/components/ui/TableHeader";
import TableSkeleton from "@/components/ui/TableSkeleton";
import TableEmpty from "@/components/ui/TableEmpty";
import TableError from "@/components/ui/TableError";

interface LeadsListTableProps {
  selectLead: (lead: Lead) => void;
  selectOpportunity: (lead: Lead) => void;
}

export default function LeadsListTable({
  selectLead,
  selectOpportunity,
}: LeadsListTableProps) {
  const { leads, pendingLeads, error } = useContext(LeadsListContext);

  const columns = ["Name", "Company", <ScoreHeaderCell />, "Status", "Actions"];

  return (
    <table className="w-full max-md:hidden">
      <TableHeader columns={columns} />

      <tbody>
        {leads?.length === 0 && !pendingLeads && !error && (
          <TableEmpty columns={columns.length} resourceName="leads" />
        )}

        {error && <TableError columns={columns.length} resourceName="leads" />}

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
