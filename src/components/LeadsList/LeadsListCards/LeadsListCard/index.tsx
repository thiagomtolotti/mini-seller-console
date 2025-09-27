import type { Lead } from "@/types/lead";

import Button from "@/components/ui/Button";
import LeadStatusBadge from "../../LeadStatusBadge";

interface LeadsListCardProps {
  lead: Lead;
  selectLead: () => void;
  selectOpportunity: () => void;
}

export default function LeadsListCard({
  lead,
  selectLead,
  selectOpportunity,
}: LeadsListCardProps) {
  return (
    <div className="border border-slate-800 bg-black/20 px-6 py-8 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg mb-2">{lead.name}</h3>

        <LeadStatusBadge status={lead.status} />
      </div>

      <p className="break-all">
        <span className="font-semibold">Email:</span> {lead.email}
      </p>

      <p>
        <span className="font-semibold">Company:</span> {lead.company}
      </p>

      <p>
        <span className="font-semibold">Score:</span> {lead.score}
      </p>

      <div className="md:mt-4 ml-auto flex flex-wrap gap-4 justify-center mt-auto max-md:pt-4">
        <Button variant="secondary" className="grow" onClick={selectLead}>
          Edit lead
        </Button>

        <Button className="grow" onClick={selectOpportunity}>
          Convert lead
        </Button>
      </div>
    </div>
  );
}
