import type { Lead } from "@/types/lead";

import Modal from "../ui/Modal";

import ModalTitle from "../ui/ModalTitle";
import OpportunityForm from "./OpportunityForm";

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
    <Modal className="min-w-md" onClose={onClose}>
      <ModalTitle />

      <OpportunityForm
        defaultName={selectedLead.name}
        defaultAccount={selectedLead.company}
        onClose={onClose}
      />
    </Modal>
  );
}
