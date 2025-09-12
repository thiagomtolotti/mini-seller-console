import type { Lead } from "@/types/lead";

import Modal from "../ui/Modal";

import ModalTitle from "../ui/ModalTitle";
import OpportunityForm from "./OpportunityForm";

interface CreateOpportunityModalProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

export default function CreateOpportunityModal({
  selectedLead,
  onClose,
}: CreateOpportunityModalProps) {
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
