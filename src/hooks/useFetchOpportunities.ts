import type { Opportunity } from "@/types/opportunity";

import opportunitiesList from "@public/opportunities.json";

import { useEffect, useState } from "react";

export const PENDING_TIME = 750;

export default function useFetchOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpportunities(opportunitiesList as Opportunity[]);
      setPending(false);
    }, PENDING_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { opportunities, pending };
}
