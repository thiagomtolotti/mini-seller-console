import { render, screen } from "@testing-library/react";
import TableHeader from "./TableHeader";

function MockTableHeadCell({ children }: { children: React.ReactNode }) {
  return <th data-testid="table-head-cell">{children}</th>;
}

vi.mock("./TableHeadCell", () => ({
  default: MockTableHeadCell,
}));

describe("TableHeader", () => {
  it("renders a thead with a row of TableHeadCell for string columns", () => {
    const columns = ["Name", "Price", "Stock"];

    render(
      <table>
        <TableHeader columns={columns} />
      </table>
    );

    const cells = screen.getAllByTestId("table-head-cell");

    expect(cells).toHaveLength(columns.length);
    expect(cells[0]).toHaveTextContent("Name");
    expect(cells[1]).toHaveTextContent("Price");
    expect(cells[2]).toHaveTextContent("Stock");
  });

  it("renders TableHeadCell for React elements as columns", () => {
    const columns = [<span data-testid="custom-col">Custom</span>, "Regular"];

    render(
      <table>
        <TableHeader columns={columns} />
      </table>
    );

    const cells = screen.getAllByTestId("table-head-cell");

    expect(cells).toHaveLength(2);
    expect(screen.getByTestId("custom-col")).toBeInTheDocument();
    expect(cells[1]).toHaveTextContent("Regular");
  });
});
