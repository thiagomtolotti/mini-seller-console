import useLeadsList from "@/hooks/useLeadsList";

import TableHeadCell from "./TableHeadCell";
import LeadsListTableRow from "./LeadsListTableRow";

export default function LeadsListTable() {
  const { leads, pending } = useLeadsList();
  const columns = ["Name", "Company", "Score", "Status"];

  return (
    <table>
      <tr>
        {columns.map((column) => (
          <TableHeadCell key={column}>{column}</TableHeadCell>
        ))}
      </tr>

      <tbody>
        {pending && <LeadsListTableSkeleton />}

        {leads?.map((lead) => (
          <LeadsListTableRow key={lead.id} lead={lead} />
        ))}
      </tbody>
    </table>
  );
}

function LeadsListTableSkeleton() {
  return <div>Loading...</div>;
}
