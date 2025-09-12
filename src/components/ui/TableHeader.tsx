import TableHeadCell from "./TableHeadCell";

interface TableHeaderProps {
  columns: (React.ReactElement | string)[];
}

export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeadCell key={column.toString()}>{column}</TableHeadCell>
        ))}
      </tr>
    </thead>
  );
}
