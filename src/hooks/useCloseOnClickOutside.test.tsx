import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import useCloseOnClickOutside from "./useCloseOnClickOutside";

function TestComponent({
  onClose,
  withException = false,
}: {
  onClose: () => void;
  withException?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const exceptionRefs = withException ? [ref] : [];
  useCloseOnClickOutside(onClose, exceptionRefs);

  return (
    <div>
      <div data-testid="outside">Outside</div>
      <div ref={ref} data-testid="exception">
        Exception
      </div>
    </div>
  );
}

describe("useCloseOnClickOutside", () => {
  it("calls onClose when clicking outside of exceptions", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} />);

    fireEvent.click(document.querySelector('[data-testid="outside"]')!);

    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside an exception", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} withException />);

    fireEvent.click(document.querySelector('[data-testid="exception"]')!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose if exception ref is null", () => {
    const onClose = vi.fn();

    function NullRefComponent() {
      useCloseOnClickOutside(onClose, [React.createRef()]);
      return <div data-testid="outside">Outside</div>;
    }

    render(<NullRefComponent />);

    fireEvent.click(document.querySelector('[data-testid="outside"]')!);

    expect(onClose).toHaveBeenCalled();
  });
});
