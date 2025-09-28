import { render, screen } from "@testing-library/react";
import TableEmpty from "./TableEmpty";

describe("TableEmpty", () => {
  it("renders the correct message with resourceName in lowercase", () => {
    render(
      <table>
        <tbody>
          <TableEmpty columns={3} resourceName="Products" />
        </tbody>
      </table>
    );

    const cell = screen.getByText("No products found.");

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute("colspan", "3");
    expect(cell).toHaveClass("text-center", "py-8", "text-gray-500");
  });

  it("renders the correct colSpan", () => {
    render(
      <table>
        <tbody>
          <TableEmpty columns={5} resourceName="Orders" />
        </tbody>
      </table>
    );

    const cell = screen.getByText("No orders found.");
    expect(cell).toHaveAttribute("colspan", "5");
  });
});
