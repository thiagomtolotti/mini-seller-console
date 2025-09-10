import clsx from "clsx";
import TableCellBase from "./TableCellBase";

interface TableHeadCellProps extends React.HTMLProps<HTMLTableCellElement> {
  children: React.ReactNode;
}

export default function TableHeadCell({
  className,
  ...props
}: TableHeadCellProps) {
  return (
    <TableCellBase
      component="th"
      className={clsx("text-left font-medium", className)}
      {...props}
    />
  );
}
