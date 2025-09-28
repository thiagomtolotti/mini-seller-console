import { render, screen } from "@testing-library/react";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders the error message with the resource name in lowercase", () => {
    render(<ErrorState resourceName="Products" />);

    const errorMessage = screen.getByText(
      /there was an error loading products\./i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the error message correctly for a single word resource", () => {
    render(<ErrorState resourceName="Order" />);

    const errorMessage = screen.getByText(
      /there was an error loading order\./i
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
