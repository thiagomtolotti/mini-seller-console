import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { LeadsListContext } from "@/contexts/LeadsListContext";
import type { Lead } from "@/types/lead";

import LeadsListCards from ".";

vi.mock("./LeadsListCard", () => ({
  default: ({ lead, selectLead, selectOpportunity }: any) => (
    <div
      data-testid="leads-list-card"
      data-lead-id={lead.id}
      onClick={() => selectLead(lead)}
      onDoubleClick={() => selectOpportunity(lead)}
    />
  ),
}));
vi.mock("../../ui/CardsSkeleton", () => ({
  default: () => <div data-testid="cards-skeleton" />,
}));
vi.mock("@/components/ui/ErrorState", () => ({
  default: ({ resourceName }: { resourceName: string }) => (
    <div data-testid="error-state">{resourceName}</div>
  ),
}));

const mockLeads: Lead[] = [
  { id: "1", name: "Lead 1" } as Lead,
  { id: "2", name: "Lead 2" } as Lead,
];

const renderWithContext = (contextValue: any, props?: any) =>
  render(
    <LeadsListContext.Provider value={contextValue}>
      <LeadsListCards
        selectLead={props?.selectLead || vi.fn()}
        selectOpportunity={props?.selectOpportunity || vi.fn()}
      />
    </LeadsListContext.Provider>
  );

describe("LeadsListCards", () => {
  it("renders LeadsListCard for each lead", () => {
    renderWithContext({ leads: mockLeads, pendingLeads: false, error: false });

    const cards = screen.getAllByTestId("leads-list-card");

    expect(cards).toHaveLength(mockLeads.length);
    expect(cards[0]).toHaveAttribute("data-lead-id", "1");
    expect(cards[1]).toHaveAttribute("data-lead-id", "2");
  });

  it("renders CardsSkeleton when pendingLeads is true", () => {
    renderWithContext({ leads: [], pendingLeads: true, error: false });

    expect(screen.getByTestId("cards-skeleton")).toBeInTheDocument();
  });

  it("renders ErrorState when error is true", () => {
    renderWithContext({ leads: [], pendingLeads: false, error: true });

    expect(screen.getByTestId("error-state")).toHaveTextContent("leads");
  });

  it.todo("renders with empty state when there's no leads", () => {
    renderWithContext({ leads: [], pendingLeads: false, error: false });

    expect(screen.queryByTestId("leads-list-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cards-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
  });

  it("calls selectLead and selectOpportunity with correct lead", () => {
    const selectLead = vi.fn();
    const selectOpportunity = vi.fn();

    renderWithContext(
      { leads: mockLeads, pendingLeads: false, error: false },
      { selectLead, selectOpportunity }
    );

    const card = screen.getAllByTestId("leads-list-card")[0];

    card.click();
    card.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));

    expect(selectLead).toHaveBeenCalledWith(mockLeads[0]);
    expect(selectOpportunity).toHaveBeenCalledWith(mockLeads[0]);
  });
});
