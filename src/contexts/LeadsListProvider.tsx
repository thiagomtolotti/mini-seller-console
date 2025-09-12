import { useLayoutEffect, useState } from "react";

import { LeadsListContext } from "./LeadsListContext";

import type { Lead, LeadStatus } from "@/types/lead";
import { Order } from "@/types/order.d";

import useLeadsList from "@/hooks/useLeadsList";

import useLeadsSearchFilter from "@/hooks/useLeadsSearchFilter";
import useLeadsStatusFilter from "@/hooks/useLeadsStatusFilter";
import useOrderLeadsByScore from "@/hooks/useOrderLeadsByScore";

export interface Filters {
  search: string;
  status: LeadStatus[];
  score: Order;
}

export const LeadsListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { leads, pending, error } = useLeadsList();

  const [leadsStore, setLeadsStore] = useState<Lead[]>([]);

  useLayoutEffect(() => {
    if (pending || error) {
      setLeadsStore([]);
    } else if (leads) {
      setLeadsStore(leads);
    }
  }, [leads, pending, error]);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: [],
    score: Order.None,
  });

  const searchFiltered = useLeadsSearchFilter(leadsStore, filters.search);
  const statusFiltered = useLeadsStatusFilter(searchFiltered, filters.status);
  const scoreOrdered = useOrderLeadsByScore(statusFiltered, filters.score);

  return (
    <LeadsListContext.Provider
      value={{
        filters,
        setFilters,
        leads: scoreOrdered,
        pendingLeads: pending,
        leadsStore,
        setLeadsStore,
        error,
      }}
    >
      {children}
    </LeadsListContext.Provider>
  );
};
