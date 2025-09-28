import { describe, it, expect } from "vitest";
import useLeadsSearchFilter from "./useLeadsSearchFilter";
import type { Lead } from "@/types/lead";

const leads: Lead[] = [
  { id: "1", name: "Alice Johnson", company: "Acme Corp" },
  { id: "2", name: "Bob Smith", company: "Beta LLC" },
  { id: "3", name: "Charlie Brown", company: "Acme Corp" },
] as Lead[];

describe("useLeadsSearchFilter", () => {
  it("returns all leads when search is empty", () => {
    const result = useLeadsSearchFilter(leads, "");

    expect(result).toEqual(leads);
  });

  it("filters leads by company name (case-insensitive)", () => {
    const result = useLeadsSearchFilter(leads, "acme");

    expect(result).toEqual([
      { id: "1", name: "Alice Johnson", company: "Acme Corp" },
      { id: "3", name: "Charlie Brown", company: "Acme Corp" },
    ]);
  });

  it("filters leads by lead name (case-insensitive)", () => {
    const result = useLeadsSearchFilter(leads, "bob");

    expect(result).toEqual([
      { id: "2", name: "Bob Smith", company: "Beta LLC" },
    ]);
  });

  it("returns empty array if no leads match search", () => {
    const result = useLeadsSearchFilter(leads, "xyz");

    expect(result).toEqual([]);
  });

  it("matches partial strings in name or company", () => {
    const result = useLeadsSearchFilter(leads, "john");

    expect(result).toEqual([
      { id: "1", name: "Alice Johnson", company: "Acme Corp" },
    ]);
  });
});
