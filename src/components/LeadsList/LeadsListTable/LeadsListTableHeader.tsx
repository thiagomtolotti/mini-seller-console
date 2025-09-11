import TableHeadCell from "./TableHeadCell";
import ScoreHeaderCell from "./ScoreHeaderCell";

export default function LeadsListTableHeader() {
  const columns = ["Name", "Company", <ScoreHeaderCell />, "Status", "Actions"];

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
