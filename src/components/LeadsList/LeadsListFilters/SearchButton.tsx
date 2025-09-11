import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import debounce from "lodash.debounce";

interface SearchButtonProps {
  setSearch: (search: string) => void;
}

export default function SearchButton({ setSearch }: SearchButtonProps) {
  return (
    <div className="rounded-xl shadow-sm w-fit flex gap-2 px-4 py-3 ">
      <MagnifyingGlassIcon className="w-6 text-slate-400" />

      <input
        placeholder="Search by name or company"
        className="w-68 focus:outline-none "
        onChange={debounce((e) => setSearch(e.target.value), 300)}
      />
    </div>
  );
}
