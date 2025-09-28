import { render, screen, fireEvent } from "@testing-library/react";
import TabButton from ".";

describe("TabButton", () => {
  it("renders the label", () => {
    render(<TabButton label="Tab 1" />);

    expect(screen.getByRole("button", { name: "Tab 1" })).toBeInTheDocument();
  });

  it("applies different styles to active and inactive buttons", () => {
    render(<TabButton label="Inactive Tab" />);
    render(<TabButton label="Active Tab" isActive />);

    const inactiveButton = screen.getByRole("button", { name: "Inactive Tab" });
    const activeButton = screen.getByRole("button", { name: "Active Tab" });

    expect(
      activeButton.classList.toString() === inactiveButton.classList.toString()
    ).toBe(false);
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<TabButton label="Clickable Tab" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Clickable Tab" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
