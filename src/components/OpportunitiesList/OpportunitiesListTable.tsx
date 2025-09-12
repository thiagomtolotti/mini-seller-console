import { useContext } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import TableHeader from "../ui/TableHeader";

import OpportunitiesListTableRow from "./OpportunitiesListTableRow";

export default function OpportunitiesListTable() {
  const columns = ["Name", "Account", "Amount", "Stage"];
  const { opportunitiesStore } = useContext(OpportunitiesContext);

  return (
    <table className="w-full">
      <TableHeader columns={columns} />

      <tbody>
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
