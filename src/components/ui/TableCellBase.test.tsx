import { render } from "@testing-library/react";
import TableCellBase from "./TableCellBase";

describe("TableCellBase", () => {
  it("renders as a <td> with default styles and props", () => {
    const { getByTestId } = render(
      <TableCellBase component="td" data-testid="cell">
        Cell Content
      </TableCellBase>
    );

    const cell = getByTestId("cell");

    expect(cell.tagName).toBe("TD");
    expect(cell).toHaveTextContent("Cell Content");
  });

  it("renders as a <th> with additional className", () => {
    const { getByTestId } = render(
      <TableCellBase component="th" className="font-bold" data-testid="cell">
        Header
      </TableCellBase>
    );

    const cell = getByTestId("cell");

    expect(cell.tagName).toBe("TH");
    expect(cell).toHaveClass("font-bold");
    expect(cell).toHaveTextContent("Header");
  });

  it("passes additional props to the element", () => {
    const { getByTestId } = render(
      <TableCellBase
        component="td"
        data-testid="cell"
        colSpan={2}
        aria-label="cell"
      >
        Data
      </TableCellBase>
    );

    const cell = getByTestId("cell");

    expect(cell).toHaveAttribute("colspan", "2");
    expect(cell).toHaveAttribute("aria-label", "cell");
  });
});
