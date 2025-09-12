import { OpportunitiesProvider } from "@/contexts/OpportunitiesProvider";

import TableHeader from "../ui/TableHeader";

export default function OpportunitiesList() {
  return <OpportunitiesListTable />;
}

function OpportunitiesListTable() {
  const columns = ["Name", "Account", "Amount", "Stage"];

  return (
    <OpportunitiesProvider>
      <table className="w-full">
        <TableHeader columns={columns} />

        <tbody></tbody>
      </table>
    </OpportunitiesProvider>
  );
}
