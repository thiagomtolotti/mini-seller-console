import { render, screen } from "@testing-library/react";
import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";

import OpportunitiesListCards from ".";

function renderWithContext(contextValue: any) {
  return render(
    <OpportunitiesContext.Provider value={contextValue}>
      <OpportunitiesListCards />
    </OpportunitiesContext.Provider>
  );
}

const mockOpportunities = [
  { id: "1", name: "Opportunity 1" },
  { id: "2", name: "Opportunity 2" },
];

vi.mock("./OpportunitiesListCard", () => ({
  default: ({ opportunity }: { opportunity: { id: string } }) => (
    <div data-testid={`opportunity-card-${opportunity.id}`}></div>
  ),
}));

vi.mock("@/components/ui/CardsSkeleton", () => ({
  default: () => <div data-testid="cards-skeleton"></div>,
}));

vi.mock("@/components/ui/ErrorState", () => ({
  default: ({ resourceName }: { resourceName: string }) => (
    <div data-testid={`error-state-${resourceName}`}></div>
  ),
}));

describe("OpportunitiesListCards", () => {
  it("renders skeleton when pending", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: true,
      error: false,
    });

    expect(screen.getByTestId("cards-skeleton")).toBeInTheDocument();
  });

  it("renders error state when error", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: false,
      error: true,
    });

    expect(screen.getByTestId("error-state-opportunities")).toBeInTheDocument();
  });

  it("renders opportunity cards when data is present", () => {
    renderWithContext({
      opportunitiesStore: mockOpportunities,
      pending: false,
      error: false,
    });

    expect(screen.getByTestId("opportunity-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("opportunity-card-2")).toBeInTheDocument();
  });

  it("renders nothing when no data, not pending, and no error", () => {
    renderWithContext({
      opportunitiesStore: [],
      pending: false,
      error: false,
    });

    expect(screen.queryByTestId("cards-skeleton")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("error-state-opportunities")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("opportunity-card-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("opportunity-card-2")).not.toBeInTheDocument();
  });
});
