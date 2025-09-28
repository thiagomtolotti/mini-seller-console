import { render, screen, fireEvent } from "@testing-library/react";

import LeadsListTableRow from "./LeadsListTableRow";

import { LeadStatus, type Lead } from "@/types/lead.d";

vi.mock("../LeadStatusBadge", () => ({
  default: ({ status }: { status: string }) => (
    <span data-testid="lead-status-badge">{status}</span>
  ),
}));

vi.mock("../../ui/TableCell", () => ({
  default: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <td data-testid="table-cell" {...props}>
      {children}
    </td>
  ),
}));

const lead: Lead = {
  id: "1",
  name: "John Doe",
  company: "Acme Corp",
  score: 85,
  status: LeadStatus.New,
  email: "test@test.com",
  source: "Google",
};

describe("LeadsListTableRow", () => {
  it("renders lead data in table cells", () => {
    render(<LeadsListTableRow lead={lead} />);

    const cells = screen.getAllByTestId("table-cell");

    expect(cells[0]).toHaveTextContent(lead.name);
    expect(cells[1]).toHaveTextContent(lead.company);
    expect(cells[2]).toHaveTextContent(String(lead.score));
  });

  it("renders LeadStatusBadge with correct status", () => {
    render(<LeadsListTableRow lead={lead} />);

    const badge = screen.getByTestId("lead-status-badge");

    expect(badge).toHaveTextContent(lead.status);
  });

  it("calls onOpportunityClick when CurrencyDollarIcon is clicked", () => {
    const onOpportunityClick = vi.fn();
    render(
      <LeadsListTableRow lead={lead} onOpportunityClick={onOpportunityClick} />
    );

    const icon = document.querySelector("svg")!;
    fireEvent.click(icon);

    expect(onOpportunityClick).toHaveBeenCalled();
  });

  it("does not call onOpportunityClick when row is clicked", () => {
    const onOpportunityClick = vi.fn();
    render(
      <LeadsListTableRow lead={lead} onOpportunityClick={onOpportunityClick} />
    );

    const row = screen.getByRole("row");
    fireEvent.click(row);

    expect(onOpportunityClick).not.toHaveBeenCalled();
  });

  it("applies custom className to the row", () => {
    render(<LeadsListTableRow lead={lead} className="custom-class" />);

    const row = screen.getByRole("row");

    expect(row).toHaveClass("custom-class");
  });
});
