import { useContext, useState } from "react";
import type { Lead } from "@/types/lead";
import { LeadsListContext } from "@/contexts/LeadsListContext";
const PENDING_TIME = 750;

export default function useUpdateLead() {
  const { setLeadsStore } = useContext(LeadsListContext);
  const [pending, setPending] = useState(true);

  async function updateLead(lead: Lead) {
    await new Promise((res) => setTimeout(res, PENDING_TIME));

    setLeadsStore((cur) =>
      cur.map((item) => {
        if (item.id !== lead.id) return item;

        return lead;
      })
    );

    setPending(false);
  }

  return {
    pending,
    updateLead,
  };
}
