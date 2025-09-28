import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { LeadsListContext } from "@/contexts/LeadsListContext";
import { LeadStatus, type Lead } from "@/types/lead.d";

import LeadsListTable from ".";

vi.mock("./LeadsListTableRow", () => ({
  _esModule: true,
  default: ({ lead, onClick, onOpportunityClick }: any) => (
    <tr data-testid="leads-list-table-row" onClick={onClick}>
      <td>{lead.name}</td>
      <td>
        <button
          data-testid="opportunity-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpportunityClick();
          }}
        >
          Opportunity
        </button>
      </td>
    </tr>
  ),
}));
vi.mock("./ScoreHeaderCell", () => ({
  _esModule: true,
  default: () => "Score",
}));

vi.mock("@/components/ui/TableHeader", () => ({
  _esModule: true,
  default: ({ columns }: any) => (
    <thead>
      <tr>
        {columns.map((col: any, index: number) => (
          <th key={index}>{col}</th>
        ))}
      </tr>
    </thead>
  ),
}));

vi.mock("@/components/ui/TableSkeleton", () => ({
  _esModule: true,
  default: () => (
    <tr data-testid="table-skeleton">
      <td colSpan={10}>Loading...</td>
    </tr>
  ),
}));
vi.mock("@/components/ui/TableEmpty", () => ({
  _esModule: true,
  default: () => (
    <tr data-testid="table-empty">
      <td colSpan={10}>No data</td>
    </tr>
  ),
}));
vi.mock("@/components/ui/TableError", () => ({
  _esModule: true,
  default: () => (
    <tr data-testid="table-error">
      <td colSpan={10}>Error</td>
    </tr>
  ),
}));

function renderWithContext(contextValue: any, props: any = {}) {
  return render(
    <LeadsListContext.Provider value={contextValue}>
      <LeadsListTable {...props} />
    </LeadsListContext.Provider>
  );
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    company: "Acme Inc",
    score: 80,
    status: LeadStatus.New,
    email: "test@test.com",
    source: "Source",
  },
];

describe("LeadsListTable", () => {
  it("renders table headers", () => {
    renderWithContext(
      { leads: [], pendingLeads: false, error: null },
      { selectLead: vi.fn(), selectOpportunity: vi.fn() }
    );

    screen.getByText("Name");
    screen.getByText("Company");
    screen.getByText("Status");
    screen.getByText("Actions");
  });

  it("renders TableEmpty when no leads and not loading or error", () => {
    renderWithContext(
      { leads: [], pendingLeads: false, error: null },
      { selectLead: vi.fn(), selectOpportunity: vi.fn() }
    );

    screen.getByTestId("table-empty");
  });

  it("renders TableError when error is present", () => {
    renderWithContext(
      { leads: [], pendingLeads: false, error: "Some error" },
      { selectLead: vi.fn(), selectOpportunity: vi.fn() }
    );

    screen.getByTestId("table-error");
  });

  it("renders TableSkeleton when pendingLeads is true", () => {
    renderWithContext(
      { leads: [], pendingLeads: true, error: null },
      { selectLead: vi.fn(), selectOpportunity: vi.fn() }
    );

    screen.getByTestId("table-skeleton");
  });

  it("renders LeadsListTableRow for each lead", () => {
    renderWithContext(
      { leads: mockLeads, pendingLeads: false, error: null },
      { selectLead: vi.fn(), selectOpportunity: vi.fn() }
    );

    screen.getByTestId("leads-list-table-row");
  });

  it("calls selectLead when row is clicked", () => {
    const selectLead = vi.fn();

    renderWithContext(
      { leads: mockLeads, pendingLeads: false, error: null },
      { selectLead, selectOpportunity: vi.fn() }
    );

    const row = screen.getByTestId("leads-list-table-row");

    fireEvent.click(row);

    expect(selectLead).toHaveBeenCalledWith(mockLeads[0]);
  });

  it("calls selectOpportunity when opportunity button is clicked", () => {
    const selectOpportunity = vi.fn();

    renderWithContext(
      { leads: mockLeads, pendingLeads: false, error: null },
      { selectLead: vi.fn(), selectOpportunity }
    );

    const opportunityBtn = screen.getByTestId("opportunity-btn");

    fireEvent.click(opportunityBtn);

    expect(selectOpportunity).toHaveBeenCalledWith(mockLeads[0]);
  });
});
