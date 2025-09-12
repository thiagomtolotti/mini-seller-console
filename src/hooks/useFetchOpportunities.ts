import type { Opportunity } from "@/types/opportunity";

import opportunitiesList from "@public/opportunities.json";

import { useEffect, useState } from "react";

export const PENDING_TIME = 750;

export default function useFetchOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchOpportunities() {
    await new Promise((res) => setTimeout(res, PENDING_TIME));

    return opportunitiesList as Opportunity[];
  }

  useEffect(() => {
    fetchOpportunities()
      .then((data) => {
        setOpportunities(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setPending(false);
      });

    return () => {
      setOpportunities(undefined);
      setError(null);
      setPending(true);
    };
  }, []);

  return { opportunities, pending, error };
}
