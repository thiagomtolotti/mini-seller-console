import { render, screen } from "@testing-library/react";
import Backdrop from "./Backdrop";

vi.mock("@/hooks/useLockBodyOverflow", () => ({
  default: vi.fn(),
}));

describe("Backdrop", () => {
  it("renders children inside the portal", () => {
    render(
      <Backdrop data-testid="backdrop">
        <span data-testid="child">Child</span>
      </Backdrop>
    );

    const backdrop = screen.getByTestId("backdrop");
    const child = screen.getByTestId("child");

    expect(backdrop).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Backdrop className="custom-class" data-testid="backdrop">
        Content
      </Backdrop>
    );

    const backdrop = screen.getByTestId("backdrop");

    expect(backdrop).toHaveClass("custom-class");
  });

  it("spreads additional props", () => {
    render(
      <Backdrop data-testid="backdrop" aria-label="Backdrop Label">
        Content
      </Backdrop>
    );

    const backdrop = screen.getByTestId("backdrop");

    expect(backdrop).toHaveAttribute("aria-label", "Backdrop Label");
  });
});
