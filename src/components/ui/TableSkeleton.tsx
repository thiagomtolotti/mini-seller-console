interface LeadsListTableSkeletonProps {
  columns: number;
  rows?: number;
}

export default function TableSkeleton({
  columns,
  rows = 5,
}: LeadsListTableSkeletonProps) {
  return Array.from({ length: rows }).map((_, index) => (
    <TableRowSkeleton key={index} columns={columns} />
  ));
}

function TableRowSkeleton({ columns }: LeadsListTableSkeletonProps) {
  return (
    <tr className="[&>td:first-child>div]:first:rounded-l-lg [&>td:last-child>div]:first:rounded-r-lg">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className=" py-2 ">
          <div className="h-16 bg-white/10 animate-pulse" />
        </td>
      ))}
    </tr>
  );
}
