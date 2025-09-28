import { render } from "@testing-library/react";
import TableHeadCell from "./TableHeadCell";

vi.mock("./TableCellBase", () => ({
  default: ({ children, className, ...props }: any) => (
    <th data-testid="table-head-cell" className={className} {...props}>
      {children}
    </th>
  ),
}));

describe("TableHeadCell", () => {
  it("renders children", () => {
    const { getByTestId } = render(
      <TableHeadCell data-testid="th-cell">Header</TableHeadCell>
    );

    const cell = getByTestId("th-cell");

    expect(cell).toHaveTextContent("Header");
  });

  it("applies additional className", () => {
    const { getByTestId } = render(
      <TableHeadCell data-testid="th-cell" className="custom-class">
        Header
      </TableHeadCell>
    );

    const cell = getByTestId("th-cell");

    expect(cell).toHaveClass("custom-class");
  });

  it("renders as a th element", () => {
    const { getByTestId } = render(
      <TableHeadCell data-testid="th-cell">Header</TableHeadCell>
    );

    const cell = getByTestId("th-cell");

    expect(cell.tagName).toBe("TH");
  });
});
