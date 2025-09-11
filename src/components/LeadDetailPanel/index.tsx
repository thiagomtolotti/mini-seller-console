import type { Lead } from "@/types/lead";

import SlideOverPanel from "./SlideOverPanel";

interface LeadDetailPanelProps {
  selectedLead: Lead | null;
  onClose?: () => void;
}

export default function LeadDetailPanel({
  selectedLead,
  onClose,
}: LeadDetailPanelProps) {
  if (!selectedLead) return null;

  return <SlideOverPanel onClose={onClose}>{selectedLead.name}</SlideOverPanel>;
}
