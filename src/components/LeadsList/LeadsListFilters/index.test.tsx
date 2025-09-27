import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import { LeadStatus } from "@/types/lead.d";
import type { Filters } from "@/contexts/LeadsListProvider";

import LeadsListFilters from ".";

vi.mock("./SearchButton", () => ({
  default: ({ setFilters, search }: any) => (
    <button
      data-testid="search-button"
      data-search={search}
      onClick={() => setFilters({})}
    >
      SearchButton
    </button>
  ),
}));
vi.mock("./FilterButton", () => ({
  default: ({ statusFilter, setFilters }: any) => (
    <button
      data-testid="filter-button"
      data-status={statusFilter}
      onClick={() => setFilters({})}
    >
      FilterButton
    </button>
  ),
}));

describe("LeadsListTableFilters", () => {
  const mockSetFilters = vi.fn();
  const filters: Filters = {
    search: "test",
    status: [LeadStatus.New],
  } as Filters;

  function renderWithContext() {
    return render(
      <LeadsListContext.Provider
        value={{ filters, setFilters: mockSetFilters } as any}
      >
        <LeadsListFilters />
      </LeadsListContext.Provider>
    );
  }

  it("renders SearchButton with correct props", () => {
    renderWithContext();

    const searchButton = screen.getByTestId("search-button");

    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveAttribute("data-search", "test");
  });

  it("renders FilterButton with correct props", () => {
    renderWithContext();

    const filterButton = screen.getByTestId("filter-button");

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute("data-status", LeadStatus.New);
  });
});
