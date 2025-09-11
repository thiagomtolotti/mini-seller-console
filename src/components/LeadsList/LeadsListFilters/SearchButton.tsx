import type { Filters } from "@/contexts/LeadsListProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import debounce from "lodash.debounce";

interface SearchButtonProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function SearchButton({ setFilters }: SearchButtonProps) {
  return (
    <div className="rounded-xl shadow-sm w-fit flex gap-2 px-4 py-3 ">
      <MagnifyingGlassIcon className="w-6 text-slate-400" />

      <input
        placeholder="Search by name or company"
        className="w-68 focus:outline-none "
        onChange={debounce((ev) => {
          setFilters((filters) => ({ ...filters, search: ev.target.value }));
        }, 300)}
      />
    </div>
  );
}
