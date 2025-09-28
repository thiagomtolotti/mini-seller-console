import { render, screen } from "@testing-library/react";
import LabelLine from "./LabelLine";

describe("LabelLine", () => {
  it("renders the label and string children", () => {
    render(<LabelLine label="Test Label">Test Value</LabelLine>);

    const label = screen.getByText("Test Label");
    const value = screen.getByText("Test Value");

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it("renders the label and element children", () => {
    render(
      <LabelLine label="Another Label">
        <span data-testid="custom-child">Custom Child</span>
      </LabelLine>
    );

    const label = screen.getByText("Another Label");
    const customChild = screen.getByTestId("custom-child");

    expect(label).toBeInTheDocument();
    expect(customChild).toBeInTheDocument();
    expect(customChild).toHaveTextContent("Custom Child");
  });
});
