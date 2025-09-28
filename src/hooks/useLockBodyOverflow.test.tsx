import { render } from "@testing-library/react";
import useLockBodyOverflow from "./useLockBodyOverflow";

function TestComponent() {
  useLockBodyOverflow();
  return <div data-testid="test-component" />;
}

describe("useLockBodyOverflow", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("sets body overflow to hidden on mount and restores on unmount", () => {
    expect(document.body.style.overflow).toBe("");

    const { unmount } = render(<TestComponent />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });
});
