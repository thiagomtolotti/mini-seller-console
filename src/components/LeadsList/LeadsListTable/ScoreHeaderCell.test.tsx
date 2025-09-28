import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { Order } from "@/types/order.d";
import { LeadsListContext } from "@/contexts/LeadsListContext";

import ScoreHeaderCell from "./ScoreHeaderCell";

vi.mock("@heroicons/react/16/solid", () => ({
  _esModule: true,
  ChevronDownIcon: (props: any) => (
    <svg {...props} data-testid="ChevronDownIcon" />
  ),
  ChevronUpDownIcon: (props: any) => (
    <svg {...props} data-testid="ChevronUpDownIcon" />
  ),
  ChevronUpIcon: (props: any) => <svg {...props} data-testid="ChevronUpIcon" />,
}));

function renderWithContext(
  filters = { score: Order.None },
  setFilters = vi.fn()
) {
  return render(
    <LeadsListContext.Provider value={{ filters, setFilters } as any}>
      <ScoreHeaderCell />
    </LeadsListContext.Provider>
  );
}

describe("ScoreHeaderCell", () => {
  it("renders Score text", () => {
    renderWithContext();

    const scoreText = screen.getByText("Score");

    expect(scoreText).toBeInTheDocument();
  });

  it("shows ChevronUpDownIcon when score order is None", () => {
    renderWithContext({ score: Order.None });

    const icon = screen.getByTestId("ChevronUpDownIcon")!;

    expect(icon).toBeInTheDocument();
  });

  it("shows ChevronDownIcon when score order is Ascending", () => {
    renderWithContext({ score: Order.Ascending });

    const icon = screen.getByTestId("ChevronDownIcon")!;

    expect(icon).toBeInTheDocument();
  });

  it("shows ChevronUpIcon when score order is Descending", () => {
    renderWithContext({ score: Order.Descending });

    const icon = screen.getByTestId("ChevronUpIcon")!;

    expect(icon).toBeInTheDocument();
  });

  it("cycles score order on icon click", () => {
    const setFilters = vi.fn();
    renderWithContext({ score: Order.None }, setFilters);

    const icon = document.querySelector("svg")!;
    fireEvent.click(icon);

    expect(setFilters).toHaveBeenCalled();
  });
});
