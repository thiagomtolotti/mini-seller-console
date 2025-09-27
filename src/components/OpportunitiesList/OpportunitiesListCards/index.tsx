import { useContext } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import OpportunitiesListCard from "./OpportunitiesListCard";
import CardsSkeleton from "@/components/ui/CardsSkeleton";

export default function OpportunitiesListCards() {
  const { opportunitiesStore, pending } = useContext(OpportunitiesContext);

  return (
    <div className="md:hidden my-12 grid sm:grid-cols-2 gap-8">
      {pending && <CardsSkeleton />}

      {opportunitiesStore?.map((opportunity) => (
        <OpportunitiesListCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
