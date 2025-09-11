import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

export default function LeadsListTableFilters() {
  return (
    <div className="p-4 mb-4 flex gap-4 justify-end">
      <SearchButton />

      <FilterButton />
    </div>
  );
}
