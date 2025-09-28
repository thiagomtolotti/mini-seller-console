import { render, fireEvent } from "@testing-library/react";
import SlideOverPanel from "./SlideOverPanel";

vi.mock("./Backdrop", () => {
  return {
    default: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: (ev: React.MouseEvent) => void;
    }) => (
      <div data-testid="backdrop" onClick={onClick}>
        {children}
      </div>
    ),
  };
});

function setup(props = {}) {
  return render(
    <SlideOverPanel data-testid="slide-over-panel" {...props}>
      <div data-testid="panel-content">Panel Content</div>
    </SlideOverPanel>
  );
}

describe("SlideOverPanel", () => {
  it("renders children inside the panel", async () => {
    const { findByTestId } = setup();

    const content = await findByTestId("panel-content");

    expect(content).toBeInTheDocument();
  });

  it("applies custom className", async () => {
    const { findByTestId } = setup({ className: "custom-class" });

    const panel = await findByTestId("slide-over-panel");

    expect(panel.className).toMatch(/custom-class/);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    const { findByTestId } = setup({ onClose });

    const backdrop = await findByTestId("backdrop");
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when panel itself is clicked", async () => {
    const onClose = vi.fn();
    const { findByTestId } = setup({ onClose });

    const panel = await findByTestId("slide-over-panel");
    fireEvent.click(panel.firstChild as HTMLElement);

    expect(onClose).not.toHaveBeenCalled();
  });
});
