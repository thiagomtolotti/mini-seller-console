import { useContext } from "react";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

export default function LeadsListFilters() {
  const { filters, setFilters } = useContext(LeadsListContext);

  return (
    <div className="md:p-4 mb-4 flex gap-2 md:gap-4 w-full sm:justify-end flex-wrap">
      <SearchButton setFilters={setFilters} search={filters.search} />

      <FilterButton statusFilter={filters.status} setFilters={setFilters} />
    </div>
  );
}
