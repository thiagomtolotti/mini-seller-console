import { LeadStatus, type Lead } from "@/types/lead.d";
import { render, screen, fireEvent } from "@testing-library/react";
import LeadsListCard from "./index";

const mockLead: Lead = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc.",
  score: 85,
  status: LeadStatus.New,
  source: "Website",
};

vi.mock("@/components/ui/Button", () => ({
  default: (props: any) => <button {...props} />,
}));
vi.mock("../../LeadStatusBadge", () => ({
  default: ({ status }: { status: LeadStatus }) => (
    <div data-testid="lead-status-badge">{status}</div>
  ),
}));

describe("LeadsListCard", () => {
  it("renders lead information correctly", () => {
    render(
      <LeadsListCard
        lead={mockLead}
        selectLead={vi.fn()}
        selectOpportunity={vi.fn()}
      />
    );

    expect(screen.getByText(mockLead.name)).toBeInTheDocument();
    expect(screen.getByText(`Email:`)).toBeInTheDocument();

    expect(screen.getByText(mockLead.email)).toBeInTheDocument();
    expect(screen.getByText(`Company:`)).toBeInTheDocument();

    expect(screen.getByText(mockLead.company)).toBeInTheDocument();
    expect(screen.getByText(`Score:`)).toBeInTheDocument();

    expect(screen.getByTestId("lead-status-badge")).toHaveTextContent(
      mockLead.status
    );
    expect(screen.getByText(String(mockLead.score))).toBeInTheDocument();
  });

  it("calls selectLead when Edit lead button is clicked", () => {
    const selectLead = vi.fn();

    render(
      <LeadsListCard
        lead={mockLead}
        selectLead={selectLead}
        selectOpportunity={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit lead/i }));

    expect(selectLead).toHaveBeenCalledTimes(1);
  });

  it("calls selectOpportunity when Convert lead button is clicked", () => {
    const selectOpportunity = vi.fn();
    render(
      <LeadsListCard
        lead={mockLead}
        selectLead={vi.fn()}
        selectOpportunity={selectOpportunity}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /convert lead/i }));

    expect(selectOpportunity).toHaveBeenCalledTimes(1);
  });
});
