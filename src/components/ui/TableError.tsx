import ErrorState from "./ErrorState";

interface TableErrorProps {
  columns: number;
  resourceName: string;
}

export default function TableError({ columns, resourceName }: TableErrorProps) {
  return (
    <tr>
      <td colSpan={columns} className="py-8">
        <ErrorState resourceName={resourceName} />
      </td>
    </tr>
  );
}
