interface TableEmptyProps {
  columns: number;
  resourceName: string;
}

export default function TableEmpty({ columns, resourceName }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={columns} className="text-center py-8 text-gray-500">
        No {resourceName.toLowerCase()} found.
      </td>
    </tr>
  );
}
