import clsx from "clsx";
import TableCellBase from "./TableCellBase";

export default function TableCell({
  className,
  ...props
}: React.HTMLProps<HTMLTableCellElement>) {
  return (
    <TableCellBase
      component="td"
      className={clsx(className, "py-4")}
      {...props}
    />
  );
}
