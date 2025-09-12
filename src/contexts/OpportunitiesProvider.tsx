import { useEffect, useState } from "react";

import type { Opportunity } from "@/types/opportunity";

import { OpportunitiesContext } from "./OpportunitiesContext";

import useFetchOpportunities from "@/hooks/useFetchOpportunities";

export const OpportunitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { opportunities, pending, error } = useFetchOpportunities();
  const [opportunitiesStore, setOpportunitiesStore] = useState<Opportunity[]>(
    []
  );

  useEffect(() => {
    setOpportunitiesStore(opportunities ?? []);

    return () => setOpportunitiesStore([]);
  }, [opportunities]);

  return (
    <OpportunitiesContext.Provider
      value={{ opportunitiesStore, setOpportunitiesStore, pending, error }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};
