import { render, screen, fireEvent } from "@testing-library/react";

import FilterButton from "./FilterButton";
import type { FilterButtonProps } from "./FilterButton";

import { LeadStatus } from "@/types/lead.d";
vi.mock("./StatusFilterDropdown", () => ({
  __esModule: true,
  default: () => <div data-testid="status-filter-dropdown" />,
}));

const defaultProps: FilterButtonProps = {
  statusFilter: [],
  setFilters: vi.fn(),
};

describe("FilterButton", () => {
  it("renders button with 'Filter' text", () => {
    render(<FilterButton {...defaultProps} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Filter");
  });

  it("shows filter count when statusFilter has items", () => {
    render(
      <FilterButton
        {...defaultProps}
        statusFilter={["NEW" as LeadStatus, "CONTACTED" as LeadStatus]}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Filter (2)");
  });

  it("does not show filter count when statusFilter is empty", () => {
    render(<FilterButton {...defaultProps} />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(/^Filter$/);
  });

  it("opens StatusFilterDropdown on button click", () => {
    render(<FilterButton {...defaultProps} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    const dropdown = screen.getByTestId("status-filter-dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("closes StatusFilterDropdown when clicking outside", async () => {
    render(
      <>
        <div data-testid="outside-element">outside</div>
        <FilterButton {...defaultProps} />
      </>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByTestId("status-filter-dropdown")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("outside-element"));

    expect(
      screen.queryByTestId("status-filter-dropdown")
    ).not.toBeInTheDocument();
  });
});
