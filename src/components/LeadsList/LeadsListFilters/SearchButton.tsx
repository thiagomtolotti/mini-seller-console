import type { Filters } from "@/contexts/LeadsListProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import debounce from "lodash.debounce";

interface SearchButtonProps {
  search: string;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function SearchButton({
  search,
  setFilters,
}: SearchButtonProps) {
  return (
    <div className="rounded-xl shadow-sm xs:max-w-68 flex-grow flex gap-2 px-4 py-3 ">
      <MagnifyingGlassIcon className="w-6 text-slate-50" />

      <input
        placeholder="Search by name or company"
        className="w-full truncate focus:outline-none placeholder:text-slate-400"
        onChange={debounce((ev) => {
          setFilters((filters) => ({ ...filters, search: ev.target.value }));
        }, 300)}
        defaultValue={search}
      />
    </div>
  );
}
