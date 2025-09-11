import { describe, it, expect } from "vitest";

import useLeadsStatusFilter from "./useLeadsStatusFilter";

import { LeadStatus } from "@/types/lead.d";
import type { Lead } from "@/types/lead.d";

describe("useLeadsStatusFilter", () => {
  const leads: Lead[] = [
    {
      id: "1",
      company: "Acme Corp",
      name: "Alice Smith",
      email: "alice@acme.com",
      source: "web",
      score: 80,
      status: LeadStatus.New,
    },
    {
      id: "2",
      company: "Beta LLC",
      name: "Bob Jones",
      email: "bob@beta.com",
      source: "referral",
      score: 60,
      status: LeadStatus.Contacted,
    },
    {
      id: "3",
      company: "Gamma Inc",
      name: "Charlie Brown",
      email: "charlie@gamma.com",
      source: "event",
      score: 90,
      status: LeadStatus.Qualified,
    },
  ];

  it("filters by single status", () => {
    const result = useLeadsStatusFilter(leads, [LeadStatus.New]);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe(LeadStatus.New);
  });

  it("filters by multiple statuses", () => {
    const result = useLeadsStatusFilter(leads, [
      LeadStatus.New,
      LeadStatus.Qualified,
    ]);

    expect(result).toHaveLength(2);
    expect(result.map((l) => l.status)).toEqual(
      expect.arrayContaining([LeadStatus.New, LeadStatus.Qualified])
    );
  });

  it("returns all leads for empty status array", () => {
    const result = useLeadsStatusFilter(leads, []);
    expect(result).toHaveLength(leads.length);
  });

  it("returns no leads for unmatched status", () => {
    const result = useLeadsStatusFilter(leads, ["Archived" as LeadStatus]);
    expect(result).toHaveLength(0);
  });
});
