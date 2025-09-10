import type { Lead } from "@/types/lead";

import TableCell from "./TableCell";

interface LeadsListTableRowProps {
  lead: Lead;
}

export default function LeadsListTableRow({ lead }: LeadsListTableRowProps) {
  return (
    <tr>
      <TableCell>{lead.name}</TableCell>
      <TableCell>{lead.company}</TableCell>
      <TableCell>{lead.score}</TableCell>
      <TableCell>{lead.status}</TableCell>
    </tr>
  );
}
