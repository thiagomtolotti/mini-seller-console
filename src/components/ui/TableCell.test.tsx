import { render } from "@testing-library/react";
import TableCell from "./TableCell";

vi.mock("./TableCellBase", () => ({
  default: ({ component: Component, className, ...props }: any) => (
    <Component className={className} {...props} />
  ),
}));

describe("TableCell", () => {
  it("renders children inside a td element", () => {
    const { getByTestId } = render(
      <TableCell data-testid="table-cell">Content</TableCell>
    );

    const cell = getByTestId("table-cell");

    expect(cell.tagName).toBe("TD");
    expect(cell).toHaveTextContent("Content");
  });

  it("applies custom className and default py-4", () => {
    const { getByTestId } = render(
      <TableCell data-testid="table-cell" className="custom-class">
        Test
      </TableCell>
    );

    const cell = getByTestId("table-cell");

    expect(cell).toHaveClass("custom-class");
    expect(cell).toHaveClass("py-4");
  });

  it("passes other props to the underlying element", () => {
    const { getByTestId } = render(
      <TableCell data-testid="table-cell" colSpan={2}>
        Test
      </TableCell>
    );

    const cell = getByTestId("table-cell");

    expect(cell).toHaveAttribute("colspan", "2");
  });
});
