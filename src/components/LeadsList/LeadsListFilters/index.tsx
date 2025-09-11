import type { LeadStatus } from "@/types/lead";

import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

interface LeadsListTableFiltersProps {
  setSearch: (search: string) => void;
  statusFilter: LeadStatus[];
  setStatusFilter: React.Dispatch<React.SetStateAction<LeadStatus[]>>;
}

export default function LeadsListTableFilters({
  setSearch,
  statusFilter,
  setStatusFilter,
}: LeadsListTableFiltersProps) {
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
