import { describe, it, expect } from "vitest";

import { LeadStatus, type Lead } from "@/types/lead.d";
import useLeadsSearchFilter from "./useLeadsSearchFilter";

describe("useLeadsSearchFilter", () => {
  const leads: Lead[] = [
    {
      id: "1",
      company: "Acme Corp",
      email: "alice.smith@acme.com",
      source: "website",
      name: "Alice Smith",
      status: LeadStatus.New,
      score: 80,
    },
    {
      id: "2",
      company: "Beta LLC",
      email: "bob.jones@beta.com",
      source: "referral",
      name: "Bob Jones",
      status: LeadStatus.Contacted,
      score: 60,
    },
    {
      id: "3",
      company: "Gamma Inc",
      email: "charlie.brown@gamma.com",
      source: "event",
      name: "Charlie Brown",
      status: LeadStatus.Qualified,
      score: 90,
    },
  ];

  it("filters by company name", () => {
    const result = useLeadsSearchFilter(leads, "acme");

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Acme Corp");
  });

  it("filters by lead name", () => {
    const result = useLeadsSearchFilter(leads, "bob");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bob Jones");
  });

  it("is case insensitive", () => {
    const result = useLeadsSearchFilter(leads, "GAMMA");

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Gamma Inc");
  });

  it("returns all leads for empty search string", () => {
    const result = useLeadsSearchFilter(leads, "");

    expect(result).toHaveLength(leads.length);
  });

  it("returns no leads for unmatched search", () => {
    const result = useLeadsSearchFilter(leads, "xyz");

    expect(result).toHaveLength(0);
  });
});
