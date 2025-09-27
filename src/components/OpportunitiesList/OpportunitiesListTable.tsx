import { useContext } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import OpportunitiesListTableRow from "./OpportunitiesListTableRow";

import TableHeader from "../ui/TableHeader";
import TableSkeleton from "../ui/TableSkeleton";
import TableEmpty from "../ui/TableEmpty";
import TableError from "../ui/TableError";

export default function OpportunitiesListTable() {
  const columns = ["Name", "Account", "Amount", "Stage"];
  const { opportunitiesStore, pending, error } =
    useContext(OpportunitiesContext);

  return (
    <table className="w-full max-md:hidden">
      <TableHeader columns={columns} />

      <tbody>
        {opportunitiesStore?.length === 0 && !pending && !error && (
          <TableEmpty columns={columns.length} resourceName="opportunities" />
        )}

        {error && (
          <TableError columns={columns.length} resourceName={"opportunities"} />
        )}

        {pending && <TableSkeleton columns={columns.length} rows={20} />}

        {opportunitiesStore.map((opportunity) => (
          <OpportunitiesListTableRow
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}
      </tbody>
    </table>
  );
}
