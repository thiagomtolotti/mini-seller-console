interface TableErrorProps {
  columns: number;
  resourceName: string;
}

export default function TableError({ columns, resourceName }: TableErrorProps) {
  return (
    <tr>
      <td colSpan={columns} className="text-center py-8 text-red-500">
        There was an error loading {resourceName.toLowerCase()}.
      </td>
    </tr>
  );
}
