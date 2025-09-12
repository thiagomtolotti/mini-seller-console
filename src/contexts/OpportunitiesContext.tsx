import type { Opportunity } from "@/types/opportunity";

import { createContext } from "react";

interface IOpportunitiesContext {
  opportunitiesStore: Opportunity[];
  setOpportunitiesStore: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  pending: boolean;
}

export const OpportunitiesContext = createContext({} as IOpportunitiesContext);
