import { render } from "@testing-library/react";
import ModalTitle from "./ModalTitle";

describe("ModalTitle", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(<ModalTitle />);
    const titleElement = getByText("Create Opportunity");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");
  });
});
