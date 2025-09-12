import type { Lead } from "@/types/lead.d";

import SlideOverPanel from "../ui/SlideOverPanel";
import { XMarkIcon } from "@heroicons/react/16/solid";
import LeadDetailForm from "./LeadDetailForm";

interface LeadDetailPanelProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

export default function LeadDetailPanel({
  selectedLead,
  onClose,
}: LeadDetailPanelProps) {
  if (!selectedLead) return null;

  return (
    <SlideOverPanel onClose={onClose} className="w-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Lead Details</h2>

        <XMarkIcon className="w-6 mb-auto cursor-pointer" onClick={onClose} />
      </div>

      <LeadDetailForm lead={selectedLead} onClose={onClose} />
    </SlideOverPanel>
  );
}
