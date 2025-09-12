import type { Opportunity } from "@/types/opportunity";

import { createContext } from "react";

interface IOpportunitiesContext {
  opportunitiesStore: Opportunity[];
  setOpportunitiesStore: React.Dispatch<React.SetStateAction<Opportunity[]>>;
}

export const OpportunitiesContext = createContext({} as IOpportunitiesContext);
