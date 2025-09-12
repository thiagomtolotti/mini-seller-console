import { useContext, useState } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import type { Opportunity } from "@/types/opportunity";

const PENDING_TIME = 750;

export default function useCreateOpportunity() {
  const { setOpportunitiesStore } = useContext(OpportunitiesContext);
  const [pending, setPending] = useState(true);

  async function createOpportunity(opportunity: Opportunity) {
    await new Promise((res) => setTimeout(res, PENDING_TIME));

    setOpportunitiesStore((cur) => [...cur, opportunity]);

    setPending(false);
  }

  return {
    pending,
    createOpportunity,
  };
}
