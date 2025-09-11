import { FunnelIcon } from "@heroicons/react/16/solid";

export default function FilterButton() {
  return (
    <button className="rounded-xl shadow-sm w-fit flex gap-2 px-4 py-3 hover:bg-slate-200 cursor-pointer font-semibold">
      <FunnelIcon className="w-4 text-slate-400" />

      <p>Filter</p>
    </button>
  );
}
