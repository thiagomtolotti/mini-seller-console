import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchButton from "./SearchButton";

vi.mock("lodash.debounce", () => ({
  __esModule: true,
  default: (fn: any) => fn,
}));

describe("SearchButton", () => {
  it("renders input with placeholder and default value", () => {
    render(<SearchButton search="initial" setFilters={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      "Search by name or company"
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("initial");
  });

  it("calls setFilters with updated search value after debounce", async () => {
    const setFilters = vi.fn();

    render(<SearchButton search="" setFilters={setFilters} />);

    const input = screen.getByPlaceholderText("Search by name or company");

    fireEvent.change(input, { target: { value: "new search" } });

    await waitFor(() => {
      expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
