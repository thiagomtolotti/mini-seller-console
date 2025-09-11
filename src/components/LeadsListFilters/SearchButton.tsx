import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function SearchButton() {
  return (
    <div className="rounded-xl shadow-sm w-fit flex gap-2 px-4 py-3 ">
      <MagnifyingGlassIcon className="w-6 text-slate-400" />

      <input
        placeholder="Search by name or company"
        className="w-68 focus:outline-none "
      />
    </div>
  );
}
