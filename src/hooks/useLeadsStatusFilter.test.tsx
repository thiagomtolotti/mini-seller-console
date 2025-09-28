import { renderHook } from "@testing-library/react";
import useLeadsStatusFilter from "./useLeadsStatusFilter";
import { LeadStatus, type Lead } from "@/types/lead.d";

const mockLeads: Lead[] = [
  { id: "1", name: "Lead 1", status: LeadStatus.New },
  { id: "2", name: "Lead 2", status: LeadStatus.Contacted },
  { id: "3", name: "Lead 3", status: LeadStatus.Qualified },
] as Lead[];

describe("useLeadsStatusFilter", () => {
  it("returns all leads when status array is empty", () => {
    const { result } = renderHook(() => useLeadsStatusFilter(mockLeads, []));

    const filtered = result.current;

    expect(filtered).toHaveLength(3);
    expect(filtered).toEqual(mockLeads);
  });

  it("returns leads matching a single status", () => {
    const { result } = renderHook(() =>
      useLeadsStatusFilter(mockLeads, [LeadStatus.Contacted])
    );

    const filtered = result.current;

    expect(filtered).toHaveLength(1);
    expect(filtered[0].status).toBe(LeadStatus.Contacted);
  });

  it("returns leads matching multiple statuses", () => {
    const { result } = renderHook(() =>
      useLeadsStatusFilter(mockLeads, [LeadStatus.New, LeadStatus.Qualified])
    );

    const filtered = result.current;

    expect(filtered).toHaveLength(2);
    expect(filtered.map((l) => l.status)).toEqual([
      LeadStatus.New,
      LeadStatus.Qualified,
    ]);
  });

  it("returns empty array if no leads match the status", () => {
    const { result } = renderHook(() =>
      useLeadsStatusFilter(mockLeads, ["closed" as LeadStatus])
    );

    const filtered = result.current;

    expect(filtered).toHaveLength(0);
  });
});
