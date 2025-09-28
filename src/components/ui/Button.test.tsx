import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with default (primary) variant", () => {
    render(<Button data-testid="button">Click me</Button>);

    const button = screen.getByTestId("button");

    expect(button).toHaveClass("bg-violet-600");
    expect(button).toHaveClass("text-white");
    expect(button).not.toBeDisabled();
  });

  it("renders with secondary variant", () => {
    render(
      <Button variant="secondary" data-testid="button">
        Secondary
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toHaveClass("text-violet-600");
    expect(button).not.toHaveClass("bg-violet-600");
  });

  it("applies custom className", () => {
    render(
      <Button className="custom-class" data-testid="button">
        Custom
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toHaveClass("custom-class");
  });

  it("is disabled when pending is true", () => {
    render(
      <Button pending data-testid="button">
        Pending
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("!cursor-progress");
    expect(button).toHaveClass("animate-pulse");
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button disabled data-testid="button">
        Disabled
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:cursor-not-allowed");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} data-testid="button">
        Clickable
      </Button>
    );

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick} data-testid="button">
        Disabled
      </Button>
    );

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("spreads additional props to the button", () => {
    render(
      <Button type="submit" data-testid="button">
        Submit
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toHaveAttribute("type", "submit");
  });
});
