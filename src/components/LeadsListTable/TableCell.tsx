import TableCellBase from "./TableCellBase";

export default function TableCell({
  ...props
}: React.HTMLProps<HTMLTableCellElement>) {
  return <TableCellBase component="td" {...props} />;
}
