import { useContext } from "react";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";
import { LeadsListContext } from "@/contexts/LeadsListContext";

export default function LeadsListTableFilters() {
  const { filters, setFilters } = useContext(LeadsListContext);

  return (
    <div className="md:p-4 mb-4 flex gap-2 md:gap-4 w-full sm:justify-end flex-wrap">
      <SearchButton setFilters={setFilters} search={filters.search} />

      <FilterButton statusFilter={filters.status} setFilters={setFilters} />
    </div>
  );
}
