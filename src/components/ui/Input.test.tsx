import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("applies custom className", () => {
    render(<Input data-testid="input" className="custom-class" />);

    const input = screen.getByTestId("input");

    expect(input).toHaveClass("custom-class");
  });

  it("passes props to the input element", () => {
    render(<Input data-testid="input" type="email" placeholder="Email" />);

    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Email");
  });

  it("renders disabled input with correct style", () => {
    render(<Input data-testid="input" disabled />);

    const input = screen.getByTestId("input");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:bg-white/10");
  });

  it("calls onChange handler", () => {
    const handleChange = vi.fn();
    render(<Input data-testid="input" onChange={handleChange} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
