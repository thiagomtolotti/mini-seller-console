import type { Lead } from "@/types/lead";

export default function useLeadsSearchFilter(leads: Lead[], search: string) {
  const lowercaseSearch = search.toLowerCase();

  return leads.filter(
    (lead) =>
      lead.company.toLowerCase().includes(lowercaseSearch) ||
      lead.name.toLowerCase().includes(lowercaseSearch)
  );
}
