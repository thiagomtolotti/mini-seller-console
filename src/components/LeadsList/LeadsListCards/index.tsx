import { useContext } from "react";

import type { Lead } from "@/types/lead";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import LeadsListCard from "./LeadsListCard";

interface LeadsListCardsProps {
  selectLead: (lead: Lead) => void;
  selectOpportunity: (lead: Lead) => void;
}

export default function LeadsListCards({
  selectLead,
  selectOpportunity,
}: LeadsListCardsProps) {
  const { leads } = useContext(LeadsListContext);

  return (
    <div className="md:hidden my-12 grid sm:grid-cols-2 gap-4">
      {leads?.map((lead) => (
        <LeadsListCard
          key={lead.id}
          selectLead={() => selectLead(lead)}
          selectOpportunity={() => selectOpportunity(lead)}
          lead={lead}
        />
      ))}
    </div>
  );
}
