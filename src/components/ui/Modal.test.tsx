import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "./Modal";

// Mock Backdrop to simplify test queries
vi.mock("./Backdrop", () => ({
  default: ({ children, onClick }: any) => (
    <div data-testid="backdrop" onClick={onClick}>
      {children}
    </div>
  ),
}));

describe("Modal", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Modal>
        <span data-testid="modal-content">Hello Modal</span>
      </Modal>
    );

    expect(getByText("Hello Modal")).toBeInTheDocument();
  });

  it("calls onClose when clicking on backdrop", () => {
    const onClose = vi.fn();

    const { getByTestId } = render(
      <Modal onClose={onClose}>
        <span data-testid="modal-content">Modal</span>
      </Modal>
    );

    fireEvent.click(getByTestId("backdrop"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside modal", () => {
    const onClose = vi.fn();

    const { getByTestId } = render(
      <Modal onClose={onClose}>
        <span data-testid="modal-content">Modal</span>
      </Modal>
    );

    fireEvent.click(getByTestId("modal-content"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { getByTestId } = render(
      <Modal className="custom-class">
        <span data-testid="modal-content">Modal</span>
      </Modal>
    );

    const modalDiv = getByTestId("modal-content").parentElement as HTMLElement;

    expect(modalDiv.className).toContain("custom-class");
  });
});
