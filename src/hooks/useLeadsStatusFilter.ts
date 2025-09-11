import type { Lead, LeadStatus } from "@/types/lead";

export default function useLeadsStatusFilter(
  leads: Lead[],
  status: LeadStatus[]
) {
  return leads.filter(
    (lead) => status.includes(lead.status) || status.length === 0
  );
}
