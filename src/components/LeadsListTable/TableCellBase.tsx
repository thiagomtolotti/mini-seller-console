import clsx from "clsx";

interface TableCellBaseProps extends React.HTMLProps<HTMLTableCellElement> {
  component: "th" | "td";
}

export default function TableCellBase({
  component,
  className,
  ...props
}: TableCellBaseProps) {
  const Tag = component;

  return <Tag className={clsx(className, "px-4 py-3")} {...props} />;
}
