import { useEffect, useState } from "react";

import leadsList from "@public/leads.json";

import type { Lead } from "@/types/lead";

export const PENDING_TIME = 750;

export default function useLeadsList() {
  const [leads, setLeads] = useState<Lead[]>();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchLeads() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return leadsList as Lead[];
  }

  useEffect(() => {
    fetchLeads()
      .then((data) => {
        setLeads(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setPending(false));

    return () => {
      setLeads(undefined);
      setError(null);
      setPending(true);
    };
  }, []);

  return { leads, pending, error };
}
