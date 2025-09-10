import { useEffect, useState } from "react";

import leadsList from "@public/leads.json";

import type { Lead } from "@/types/lead";

export const PENDING_TIME = 750;

export default function useLeadsList() {
  const [leads, setLeads] = useState<Lead[]>();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeads(leadsList);
      setPending(false);
    }, PENDING_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { leads, pending };
}
