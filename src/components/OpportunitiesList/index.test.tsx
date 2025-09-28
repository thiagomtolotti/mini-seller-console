import { render } from "@testing-library/react";
import OpportunitiesList from ".";

vi.mock("./OpportunitiesListCards", () => ({
  default: function MockedOpportunitiesListCards() {
    return <div data-testid="mocked-opportunities-list-cards" />;
  },
}));
vi.mock("./OpportunitiesListTable", () => ({
  default: function MockedOpportunitiesListTable() {
    return <div data-testid="mocked-opportunities-list-table" />;
  },
}));

describe("OpportunitiesList", () => {
  it("should render correclty", () => {
    render(<OpportunitiesList />);
  });
});
