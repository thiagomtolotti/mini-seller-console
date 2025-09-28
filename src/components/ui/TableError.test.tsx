import { render, screen } from "@testing-library/react";
import TableError from "./TableError";

vi.mock("./ErrorState", () => ({
  __esModule: true,
  default: ({ resourceName }: { resourceName: string }) => (
    <div data-testid="error-state">{resourceName}</div>
  ),
}));

describe("TableError", () => {
  it("renders a table row with correct colSpan and ErrorState", () => {
    render(<TableError columns={5} resourceName="orders" />);

    const row = screen.getByRole("row");
    const cell = screen.getByRole("cell");
    const errorState = screen.getByTestId("error-state");

    expect(cell).toHaveAttribute("colSpan", "5");
    expect(errorState).toHaveTextContent("orders");
    expect(cell).toContainElement(errorState);
    expect(row).toContainElement(cell);
  });
});
