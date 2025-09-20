import clsx from "clsx";

import type { Opportunity } from "@/types/opportunity";

import TableCell from "../ui/TableCell";

interface OpportunitiesListTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  opportunity: Opportunity;
}

export default function OpportunitiesListTableRow({
  opportunity,
  className,
  ...props
}: OpportunitiesListTableRowProps) {
  return (
    <tr
      className={clsx(
        "border-b-white/10 border-b last-of-type:border-b-0 hover:bg-white/10 transition-all ease-in-out",
        className
      )}
      {...props}
    >
      <TableCell className="rounded-l-xl">{opportunity.name}</TableCell>

      <TableCell>{opportunity.accountName}</TableCell>

      <TableCell>{opportunity.amount}</TableCell>

      <TableCell className="rounded-r-xl">{opportunity.stage}</TableCell>
    </tr>
  );
}
