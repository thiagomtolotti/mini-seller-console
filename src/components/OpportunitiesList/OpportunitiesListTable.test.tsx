import { render } from "@testing-library/react";
import { vi } from "vitest";
import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";
import OpportunitiesListTable from "./OpportunitiesListTable";

vi.mock("./OpportunitiesListTableRow", () => ({
  default: ({ opportunity }: any) => (
    <tr data-testid={`opportunity-row-${opportunity.id}`}>
      <td>{opportunity.name}</td>
    </tr>
  ),
}));
vi.mock("../ui/TableHeader", () => ({
  default: ({ columns }: any) => (
    <thead data-testid="table-header">
      <tr>
        {columns.map((col: string) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
  ),
}));
vi.mock("../ui/TableSkeleton", () => ({
  default: ({ columns, rows }: any) => (
    <tr data-testid="table-skeleton">
      <td colSpan={columns}>Skeleton {rows}</td>
    </tr>
  ),
}));
vi.mock("../ui/TableEmpty", () => ({
  default: ({ columns, resourceName }: any) => (
    <tr data-testid="table-empty">
      <td colSpan={columns}>No {resourceName}</td>
    </tr>
  ),
}));
vi.mock("../ui/TableError", () => ({
  default: ({ columns, resourceName }: any) => (
    <tr data-testid="table-error">
      <td colSpan={columns}>Error {resourceName}</td>
    </tr>
  ),
}));

function renderWithContext(contextValue: any) {
  return render(
    <OpportunitiesContext.Provider value={contextValue}>
      <OpportunitiesListTable />
    </OpportunitiesContext.Provider>
  );
}

describe("OpportunitiesListTable", () => {
  it("renders table header", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: false,
      error: false,
    });

    expect(
      document.querySelector('[data-testid="table-header"]')
    ).toBeInTheDocument();
  });

  it("renders empty state when no opportunities", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: false,
      error: false,
    });

    expect(
      document.querySelector('[data-testid="table-empty"]')
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: false,
      error: true,
    });

    expect(
      document.querySelector('[data-testid="table-error"]')
    ).toBeInTheDocument();
  });

  it("renders skeleton when pending", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: true,
      error: false,
    });

    expect(
      document.querySelector('[data-testid="table-skeleton"]')
    ).toBeInTheDocument();
  });

  it("renders opportunity rows", () => {
    const opportunities = [
      { id: "1", name: "Opp 1" },
      { id: "2", name: "Opp 2" },
    ];
    renderWithContext({
      opportunitiesStore: opportunities,
      pending: false,
      error: false,
    });

    expect(
      document.querySelector('[data-testid="opportunity-row-1"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="opportunity-row-2"]')
    ).toBeInTheDocument();
  });
});
