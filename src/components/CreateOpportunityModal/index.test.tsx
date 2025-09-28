import { render, screen } from "@testing-library/react";
import type { Lead } from "@/types/lead.d";

import CreateOpportunityModal from ".";

vi.mock("../ui/Modal", () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="modal" {...props}>
      {children}
    </div>
  ),
}));
vi.mock("../ui/ModalTitle", () => ({
  default: () => <div data-testid="modal-title" />,
}));
vi.mock("./OpportunityForm", () => ({
  default: (props: any) => <form data-testid="opportunity-form" {...props} />,
}));

const mockLead: Lead = {
  id: "1",
  name: "John Doe",
  company: "Acme Inc",
} as Lead;

describe("CreateOpportunityModal", () => {
  it("renders nothing if selectedLead is null", () => {
    render(<CreateOpportunityModal selectedLead={null} onClose={vi.fn()} />);

    expect(screen.queryByTestId("modal")).toBeNull();
  });

  it("renders Modal, ModalTitle, and OpportunityForm when selectedLead is provided", () => {
    render(
      <CreateOpportunityModal selectedLead={mockLead} onClose={vi.fn()} />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-title")).toBeInTheDocument();
    expect(screen.getByTestId("opportunity-form")).toBeInTheDocument();
  });

  it("passes correct props to OpportunityForm", () => {
    render(
      <CreateOpportunityModal selectedLead={mockLead} onClose={vi.fn()} />
    );

    const form = screen.getByTestId("opportunity-form");
    expect(form).toHaveAttribute("defaultname", mockLead.name);
    expect(form).toHaveAttribute("defaultaccount", mockLead.company);
  });
});
