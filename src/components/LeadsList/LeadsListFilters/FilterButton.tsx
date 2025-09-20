import { useRef, useState } from "react";

import { LeadStatus } from "@/types/lead.d";

import useCloseOnClickOutside from "@/hooks/useCloseOnClickOutside";

import StatusFilterDropdown from "./StatusFilterDropdown";

import { FunnelIcon } from "@heroicons/react/16/solid";
import type { Filters } from "@/contexts/LeadsListProvider";

export interface FilterButtonProps {
  statusFilter: LeadStatus[];
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function FilterButton({
  statusFilter,
  setFilters,
}: FilterButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useCloseOnClickOutside(() => setIsOpen(false), [containerRef]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl shadow-sm w-fit flex gap-2 px-4 py-3 hover:bg-white/20 cursor-pointer font-semibold"
      >
        <FunnelIcon className="w-4 text-slate-400" />

        <p>Filter {statusFilter.length > 0 && `(${statusFilter.length})`}</p>
      </button>

      {isOpen && (
        <StatusFilterDropdown
          statusFilter={statusFilter}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}
