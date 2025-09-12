import { useContext, useState } from "react";

import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";

import type { Lead } from "@/types/lead";

import { LeadsListContext } from "@/contexts/LeadsListContext";

const PENDING_TIME = 750;

export default function useUpdateLead() {
  const { shouldThrow } = useContext(ConfigurationsContext);

  const { setLeadsStore } = useContext(LeadsListContext);
  const [pending, setPending] = useState(false);

  async function updateLead(lead: Lead) {
    setPending(true);

    try {
      await new Promise((res) => setTimeout(res, PENDING_TIME));

      if (shouldThrow) {
        throw new Error("Failed to update lead");
      }

      setLeadsStore((cur) =>
        cur.map((item) => {
          if (item.id !== lead.id) return item;

          return lead;
        })
      );
    } finally {
      setPending(false);
    }
  }

  return {
    pending,
    updateLead,
  };
}
