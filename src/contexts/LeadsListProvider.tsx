import { useEffect, useLayoutEffect, useState } from "react";

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

  const { scoreOrdered, filters, setFilters } = useFilters(leadsStore);

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

function useFilters(leads: Lead[]) {
  const [filters, setFilters] = useState<Filters>(() => {
    const filtersInStorage = localStorage.getItem("filters");

    if (filtersInStorage) {
      return JSON.parse(filtersInStorage) as Filters;
    }

    return { search: "", status: [], score: Order.None };
  });

  const searchFiltered = useLeadsSearchFilter(leads, filters.search);
  const statusFiltered = useLeadsStatusFilter(searchFiltered, filters.status);
  const scoreOrdered = useOrderLeadsByScore(statusFiltered, filters.score);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));

    return () => {
      localStorage.removeItem("filters");
    };
  }, [filters]);

  return { scoreOrdered, filters, setFilters };
}
