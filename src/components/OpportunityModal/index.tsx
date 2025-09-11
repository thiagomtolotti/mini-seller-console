import type { Lead } from "@/types/lead";

import Modal from "./Modal";

interface OpportunityModalProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

export default function OpportunityModal({
  selectedLead,
  onClose,
}: OpportunityModalProps) {
  if (!selectedLead) return null;

  return (
    <Modal className="w-md" onClose={onClose}>
      Create Opportunity
    </Modal>
  );
}
