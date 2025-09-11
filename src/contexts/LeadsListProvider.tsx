import { useState } from "react";

import { LeadsListContext } from "./LeadsListContext";

import type { LeadStatus } from "@/types/lead";
import { Order } from "@/types/order.d";

import useLeadsList from "@/hooks/useLeadsList";

export const LeadsListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { leads, pending } = useLeadsList();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus[]>([]);
  const [scoreOrder, setScoreOrder] = useState<Order>(Order.None);

  const filteredLeads = leads?.filter(
    (lead) =>
      (lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.name.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter.includes(lead.status) || statusFilter.length === 0)
  );

  const orderedLeads = (() => {
    if (scoreOrder === Order.Ascending) {
      return filteredLeads?.sort((a, b) => b.score - a.score);
    }

    if (scoreOrder === Order.Descending) {
      return filteredLeads?.sort((a, b) => a.score - b.score);
    }

    return filteredLeads;
  })();

  return (
    <LeadsListContext.Provider
      value={{
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        scoreOrder,
        setScoreOrder,
        leads: orderedLeads,
        pendingLeads: pending,
      }}
    >
      {children}
    </LeadsListContext.Provider>
  );
};
