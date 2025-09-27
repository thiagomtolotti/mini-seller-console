import { useContext } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import OpportunitiesListCard from "./OpportunitiesListCard";

export default function OpportunitiesListCards() {
  const { opportunitiesStore } = useContext(OpportunitiesContext);

  return (
    <div className="md:hidden my-12 grid sm:grid-cols-2 gap-8">
      {/* {pendingLeads && <LeadsListCardsSkeleton />} */}

      {opportunitiesStore?.map((opportunity) => (
        <OpportunitiesListCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
