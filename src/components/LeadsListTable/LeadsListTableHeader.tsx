import TableHeadCell from "./TableHeadCell";

export default function LeadsListTableHeader() {
  const columns = ["Name", "Company", "Score", "Status"];

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeadCell key={column}>{column}</TableHeadCell>
        ))}
      </tr>
    </thead>
  );
}
