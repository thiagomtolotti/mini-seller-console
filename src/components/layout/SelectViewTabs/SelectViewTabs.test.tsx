import { render, screen, fireEvent } from "@testing-library/react";
import { View } from "@/types/View.d";

import SelectViewTabs from ".";

vi.mock("./TabButton", () => ({
  default: vi.fn(({ label, ...props }: any) => (
    <button {...props}>{label}</button>
  )),
}));

describe("SelectViewTabs", () => {
  const setCurrentView = vi.fn();

  beforeEach(() => {
    setCurrentView.mockClear();
  });

  it("renders a tab button for each View", () => {
    render(
      <SelectViewTabs
        currentView={View.Leads}
        setCurrentView={setCurrentView}
      />
    );

    Object.entries(View).forEach(([key]) => {
      expect(screen.getByRole("button", { name: key })).toBeInTheDocument();
    });
  });

  it("calls setCurrentView when a tab is clicked", () => {
    render(
      <SelectViewTabs
        currentView={View.Leads}
        setCurrentView={setCurrentView}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Opportunities" }));
    expect(setCurrentView).toHaveBeenCalledWith(View.Opportunities);

    fireEvent.click(screen.getByRole("button", { name: "Leads" }));
    expect(setCurrentView).toHaveBeenCalledWith(View.Leads);
  });
});
