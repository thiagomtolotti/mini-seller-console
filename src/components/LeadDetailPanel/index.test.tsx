import { render, screen, fireEvent } from "@testing-library/react";
import LeadDetailPanel from "./index";
import type { Lead } from "@/types/lead.d";

vi.mock("../ui/SlideOverPanel", () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="slide-over-panel" {...props}>
      {children}
    </div>
  ),
}));

vi.mock("./LeadDetailForm", () => ({
  default: ({ lead }: any) => (
    <div data-testid="lead-detail-form">{lead?.name}</div>
  ),
}));

const mockLead: Lead = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
} as Lead;

describe("LeadDetailPanel", () => {
  it("renders nothing when selectedLead is null", () => {
    render(<LeadDetailPanel selectedLead={null} onClose={vi.fn()} />);

    expect(screen.queryByTestId("slide-over-panel")).toBeNull();
  });

  it("renders SlideOverPanel and LeadDetailForm when selectedLead is provided", () => {
    render(<LeadDetailPanel selectedLead={mockLead} onClose={vi.fn()} />);

    expect(screen.getByTestId("slide-over-panel")).toBeInTheDocument();
    expect(screen.getByTestId("lead-detail-form")).toHaveTextContent(
      "John Doe"
    );
  });

  it("calls onClose when XMarkIcon is clicked", () => {
    const onClose = vi.fn();
    render(<LeadDetailPanel selectedLead={mockLead} onClose={onClose} />);

    const closeIcon = document.querySelector("svg")!;
    fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalled();
  });
});
