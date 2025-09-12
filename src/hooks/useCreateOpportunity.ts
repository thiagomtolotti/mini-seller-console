import { useContext, useState } from "react";

import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import type { Opportunity } from "@/types/opportunity";
import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";

const PENDING_TIME = 750;

export default function useCreateOpportunity() {
  const { shouldThrow } = useContext(ConfigurationsContext);
  const { setOpportunitiesStore } = useContext(OpportunitiesContext);

  const [pending, setPending] = useState(false);

  async function createOpportunity(opportunity: Opportunity) {
    setPending(true);

    try {
      await new Promise((res) => setTimeout(res, PENDING_TIME));

      if (shouldThrow) {
        throw new Error("Failed to create opportunity");
      }

      setOpportunitiesStore((cur) => [...cur, opportunity]);
    } finally {
      setPending(false);
    }
  }

  return {
    pending,
    createOpportunity,
  };
}
