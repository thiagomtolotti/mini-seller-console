import type { Lead } from "@/types/lead";

import TableCell from "../../ui/TableCell";
import clsx from "clsx";

import LeadStatusBadge from "../LeadStatusBadge";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

interface LeadsListTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  lead: Lead;
  onOpportunityClick?: () => void;
}

export default function LeadsListTableRow({
  lead,
  className,
  onOpportunityClick,
  ...props
}: LeadsListTableRowProps) {
  return (
    <tr
      className={clsx(
        "border-b-white/10 border-b last-of-type:border-b-0 hover:bg-white/10 transition-all ease-in-out cursor-pointer",
        className
      )}
      {...props}
    >
      <TableCell className="rounded-l-xl">{lead.name}</TableCell>

      <TableCell>{lead.company}</TableCell>

      <TableCell>{lead.score}</TableCell>

      <TableCell>
        <LeadStatusBadge status={lead.status} />
      </TableCell>

      <TableCell
        className="rounded-r-xl cursor-default w-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CurrencyDollarIcon
          onClick={onOpportunityClick}
          className="ml-auto w-10 p-2 hover:bg-white/20 rounded-full transition-all cursor-pointer"
        />
      </TableCell>
    </tr>
  );
}
