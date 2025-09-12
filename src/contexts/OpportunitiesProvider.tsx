import type { Opportunity } from "@/types/opportunity";
import { OpportunitiesContext } from "./OpportunitiesContext";
import { useEffect, useState } from "react";
import useFetchOpportunities from "@/hooks/useFetchOpportunities";

export const OpportunitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { opportunities, pending } = useFetchOpportunities();
  const [opportunitiesStore, setOpportunitiesStore] = useState<Opportunity[]>(
    []
  );

  useEffect(() => {
    setOpportunitiesStore(opportunities ?? []);

    return () => setOpportunitiesStore([]);
  }, [opportunities]);

  return (
    <OpportunitiesContext.Provider
      value={{ opportunitiesStore, setOpportunitiesStore, pending }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};
