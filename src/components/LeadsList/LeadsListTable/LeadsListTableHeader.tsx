import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import TableHeadCell from "./TableHeadCell";

export default function LeadsListTableHeader() {
  const columns = [
    "Name",
    "Company",
    "Score",
    <div className="flex gap-2 cursor-pointer">
      Status
      <ChevronUpDownIcon className="w-4" />
    </div>,
  ];

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
