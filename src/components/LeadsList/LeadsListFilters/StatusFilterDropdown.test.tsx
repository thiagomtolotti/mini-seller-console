import { render, screen, fireEvent } from "@testing-library/react";
import StatusFilterDropdown from "./StatusFilterDropdown";
import { LeadStatus } from "@/types/lead.d";

describe("StatusFilterDropdown", () => {
  const setup = (statusFilter: LeadStatus[] = []) => {
    const setFilters = vi.fn();
    render(
      <StatusFilterDropdown
        statusFilter={statusFilter}
        setFilters={setFilters}
      />
    );
    return { setFilters };
  };

  it("renders all LeadStatus checkboxes", () => {
    setup();

    Object.values(LeadStatus).forEach((status) => {
      expect(screen.getByLabelText(status)).toBeInTheDocument();
      expect(screen.getByLabelText(status)).toHaveAttribute("type", "checkbox");
    });
  });

  it("checks checkboxes based on statusFilter prop", () => {
    setup([LeadStatus.New, LeadStatus.Contacted]);

    expect(screen.getByLabelText(LeadStatus.New)).toBeChecked();

    expect(screen.getByLabelText(LeadStatus.Contacted)).toBeChecked();

    Object.values(LeadStatus)
      .filter((s) => ![LeadStatus.New, LeadStatus.Contacted].includes(s))
      .forEach((status) => {
        expect(screen.getByLabelText(status)).not.toBeChecked();
      });
  });

  it("calls setFilters with correct status when a checkbox is checked", () => {
    const { setFilters } = setup([]);

    const checkbox = screen.getByLabelText(LeadStatus.New);

    fireEvent.click(checkbox);

    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });

  it("calls setFilters with correct status when a checkbox is unchecked", () => {
    const { setFilters } = setup([LeadStatus.New]);

    const checkbox = screen.getByLabelText(LeadStatus.New);

    fireEvent.click(checkbox);

    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });
});
