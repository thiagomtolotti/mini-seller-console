import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

interface LeadsListTableFiltersProps {
  setSearch: (search: string) => void;
}

export default function LeadsListTableFilters({
  setSearch,
}: LeadsListTableFiltersProps) {
  return (
    <div className="p-4 mb-4 flex gap-4 justify-end">
      <SearchButton setSearch={setSearch} />

      <FilterButton />
    </div>
  );
}
