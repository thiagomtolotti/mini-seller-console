import type { Lead, LeadStatus } from "@/types/lead";
import type { Order } from "@/types/order";

import { createContext } from "react";

interface ILeadsListContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: LeadStatus[];
  setStatusFilter: React.Dispatch<React.SetStateAction<LeadStatus[]>>;
  scoreOrder: Order;
  setScoreOrder: React.Dispatch<React.SetStateAction<Order>>;
  leads: Lead[] | undefined;
  pendingLeads: boolean;
}

export const LeadsListContext = createContext({} as ILeadsListContext);
