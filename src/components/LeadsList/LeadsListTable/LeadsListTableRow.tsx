import type { Lead, LeadStatus } from "@/types/lead";

import TableCell from "./TableCell";
import clsx from "clsx";

interface LeadsListTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  lead: Lead;
}

export default function LeadsListTableRow({
  lead,
  className,
  ...props
}: LeadsListTableRowProps) {
  return (
    <tr
      className={clsx(
        "border-b-gray-100 border-b-2 text-slate-800 last-of-type:border-b-0 hover:bg-slate-200 transition-all ease-in-out cursor-pointer",
        className
      )}
      {...props}
    >
      <TableCell className="rounded-l-xl">{lead.name}</TableCell>
      <TableCell>{lead.company}</TableCell>
      <TableCell>{lead.score}</TableCell>
      <TableCell className="rounded-r-xl">
        <LeadStatusBadge status={lead.status} />
      </TableCell>
    </tr>
  );
}

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={clsx(
        "block w-fit py-1 px-4 text-center rounded-full font-semibold text-slate-50 text-sm shadow-md bg-violet-600"
      )}
    >
      {status}
    </span>
  );
}
