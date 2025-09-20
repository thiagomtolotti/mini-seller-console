import { LeadStatus } from "@/types/lead.d";

import type { FilterButtonProps } from "./FilterButton";

export default function StatusFilterDropdown({
  statusFilter,
  setFilters,
}: FilterButtonProps) {
  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.checked) {
      setFilters((prev) => ({
        ...prev,
        status: [...prev.status, ev.target.value as LeadStatus],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        status: prev.status.filter((s) => s !== ev.target.value),
      }));
    }
  }

  return (
    <div className="absolute mt-4 bg-slate-900 border border-slate-800 right-0 p-4 rounded-xl shadow-sm">
      <p className="font-semibold mb-4">Status</p>

      <div className="flex flex-col gap-2">
        {Object.values(LeadStatus).map((status) => (
          <div key={status} className="flex items-center gap-2 text-base">
            <input
              checked={statusFilter?.includes(status)}
              type="checkbox"
              value={status}
              name={status}
              id={status}
              onChange={handleChange}
            />
            <label htmlFor={status} className="capitalize">
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
