import { render, screen, fireEvent } from "@testing-library/react";
import LeadsList from "./index";

// Mock child components with data-testid attributes
vi.mock("./LeadsListFilters", () => ({
  default: () => <div data-testid="leads-list-filters" />,
}));
vi.mock("./LeadsListTable", () => ({
  default: ({ selectLead, selectOpportunity }: any) => (
    <div data-testid="leads-list-table">
      <button
        data-testid="select-lead-btn"
        onClick={() => selectLead({ id: 1 })}
      >
        Select Lead
      </button>
      <button
        data-testid="select-opportunity-btn"
        onClick={() => selectOpportunity({ id: 2 })}
      >
        Select Opportunity
      </button>
    </div>
  ),
}));
vi.mock("./LeadsListCards", () => ({
  default: ({ selectLead, selectOpportunity }: any) => (
    <div data-testid="leads-list-cards">
      <button
        data-testid="cards-select-lead-btn"
        onClick={() => selectLead({ id: 3 })}
      >
        Cards Select Lead
      </button>
      <button
        data-testid="cards-select-opportunity-btn"
        onClick={() => selectOpportunity({ id: 4 })}
      >
        Cards Select Opportunity
      </button>
    </div>
  ),
}));
vi.mock("../LeadDetailPanel", () => ({
  default: ({ selectedLead, onClose }: any) =>
    selectedLead ? (
      <div data-testid="lead-detail-panel">
        <button data-testid="close-lead-detail" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));
vi.mock("../CreateOpportunityModal", () => ({
  default: ({ selectedLead, onClose }: any) =>
    selectedLead ? (
      <div data-testid="create-opportunity-modal">
        <button data-testid="close-opportunity-modal" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

describe("LeadsList", () => {
  it("renders all main child components", () => {
    render(<LeadsList />);

    expect(screen.getByTestId("leads-list-filters")).toBeInTheDocument();
    expect(screen.getByTestId("leads-list-table")).toBeInTheDocument();
    expect(screen.getByTestId("leads-list-cards")).toBeInTheDocument();
  });

  it("shows LeadDetailPanel when a lead is selected and closes it", () => {
    render(<LeadsList />);

    fireEvent.click(screen.getByTestId("select-lead-btn"));
    expect(screen.getByTestId("lead-detail-panel")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-lead-detail"));
    expect(screen.queryByTestId("lead-detail-panel")).not.toBeInTheDocument();
  });

  it("shows LeadDetailPanel when a lead is selected from cards and closes it", () => {
    render(<LeadsList />);

    fireEvent.click(screen.getByTestId("cards-select-lead-btn"));
    expect(screen.getByTestId("lead-detail-panel")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-lead-detail"));
    expect(screen.queryByTestId("lead-detail-panel")).not.toBeInTheDocument();
  });

  it("shows CreateOpportunityModal when an opportunity is selected and closes it", () => {
    render(<LeadsList />);

    fireEvent.click(screen.getByTestId("select-opportunity-btn"));
    expect(screen.getByTestId("create-opportunity-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-opportunity-modal"));
    expect(
      screen.queryByTestId("create-opportunity-modal")
    ).not.toBeInTheDocument();
  });

  it("shows CreateOpportunityModal when an opportunity is selected from cards and closes it", () => {
    render(<LeadsList />);

    fireEvent.click(screen.getByTestId("cards-select-opportunity-btn"));
    expect(screen.getByTestId("create-opportunity-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-opportunity-modal"));
    expect(
      screen.queryByTestId("create-opportunity-modal")
    ).not.toBeInTheDocument();
  });
});
