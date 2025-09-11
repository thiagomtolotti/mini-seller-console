import type { Lead } from "@/types/lead";

import { createContext } from "react";
import type { Filters } from "./LeadsListProvider";

interface ILeadsListContext {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  leads: Lead[] | undefined;
  pendingLeads: boolean;
  leadsStore: Lead[];
  setLeadsStore: React.Dispatch<React.SetStateAction<Lead[]>>;
}

export const LeadsListContext = createContext({} as ILeadsListContext);
