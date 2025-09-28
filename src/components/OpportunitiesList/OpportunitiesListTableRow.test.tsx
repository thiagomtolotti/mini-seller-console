import { render, screen } from "@testing-library/react";
import OpportunitiesListTableRow from "./OpportunitiesListTableRow";
import type { Opportunity } from "@/types/opportunity";

vi.mock("../ui/TableCell", () => ({
  default: ({ children, className }: any) => (
    <td className={className} data-testid="table-cell">
      {children}
    </td>
  ),
}));

function renderComponent(opportunity: Opportunity, props = {}) {
  return render(
    <table>
      <tbody>
        <OpportunitiesListTableRow
          opportunity={opportunity}
          data-testid="opportunity-row"
          {...props}
        />
      </tbody>
    </table>
  );
}

const mockOpportunity: Opportunity = {
  id: "1",
  name: "Big Deal",
  accountName: "Acme Corp",
  amount: 5000,
  stage: "Negotiation",
} as Opportunity;

describe("OpportunitiesListTableRow", () => {
  it("renders opportunity data in table cells", () => {
    renderComponent(mockOpportunity);

    const row = screen.getByTestId("opportunity-row");

    expect(row).toBeInTheDocument();
    expect(screen.getByText("Big Deal")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
    expect(screen.getByText("Negotiation")).toBeInTheDocument();
  });

  it("applies additional className to the row", () => {
    renderComponent(mockOpportunity, {
      className: "bg-red-500",
      "data-testid": "opportunity-row",
    });

    const row = screen.getByTestId("opportunity-row");

    expect(row).toHaveClass("bg-red-500");
  });

  it("passes additional props to the row", () => {
    renderComponent(mockOpportunity, {
      "aria-label": "opportunity-row",
      "data-testid": "opportunity-row",
    });

    const row = screen.getByTestId("opportunity-row");

    expect(row).toHaveAttribute("aria-label", "opportunity-row");
  });
});
