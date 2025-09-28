import { render } from "@testing-library/react";
import TableSkeleton from "./TableSkeleton";

describe("TableRowSkeleton", () => {
  it("renders the correct number of rows and columns", () => {
    render(
      <table>
        <tbody>
          <TableSkeleton columns={4} rows={5} />
        </tbody>
      </table>
    );

    const rows = document.querySelectorAll("tr");
    const cells = rows[0].querySelectorAll("td");

    expect(rows).toHaveLength(5);
    expect(cells).toHaveLength(4);
  });
});
