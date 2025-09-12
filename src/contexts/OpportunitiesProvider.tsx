import type { Opportunity } from "@/types/opportunity";
import { OpportunitiesContext } from "./OpportunitiesContext";
import { useState } from "react";

export const OpportunitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opportunitiesStore, setOpportunitiesStore] = useState<Opportunity[]>(
    []
  );

  return (
    <OpportunitiesContext.Provider
      value={{ opportunitiesStore, setOpportunitiesStore }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};
