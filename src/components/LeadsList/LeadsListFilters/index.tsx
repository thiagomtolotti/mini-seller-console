import { useContext } from "react";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";
import { LeadsListContext } from "@/contexts/LeadsListContext";

export default function LeadsListTableFilters() {
  const { setSearch, statusFilter, setStatusFilter } =
    useContext(LeadsListContext);

  return (
    <div className="p-4 mb-4 flex gap-4 justify-end">
      <SearchButton setSearch={setSearch} />

      <FilterButton
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
  );
}
