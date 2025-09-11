import { describe, it, expect } from "vitest";

import useOrderLeadsByScore from "./useOrderLeadsByScore";

import { Order } from "@/types/order.d";
import { LeadStatus, type Lead } from "@/types/lead.d";

describe("useOrderLeadsByScore", () => {
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

  it("sorts leads by score ascending", () => {
    const sorted = useOrderLeadsByScore([...leads], Order.Ascending);

    expect(sorted.map((l) => l.score)).toEqual([90, 80, 60]);
  });

  it("sorts leads by score descending", () => {
    const sorted = useOrderLeadsByScore([...leads], Order.Descending);

    expect(sorted.map((l) => l.score)).toEqual([60, 80, 90]);
  });

  it("returns original order for unknown order value", () => {
    const sorted = useOrderLeadsByScore([...leads], "Unknown" as Order);

    expect(sorted.map((l) => l.id)).toEqual(["1", "2", "3"]);
  });
});
