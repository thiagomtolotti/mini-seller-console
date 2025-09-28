import { View } from "./types/View.d";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock child components to isolate App logic
vi.mock("./components/layout/SelectViewTabs", () => ({
  default: ({ currentView, setCurrentView }: any) => (
    <div>
      <button
        onClick={() => setCurrentView(View.Leads)}
        data-testid="leads-tab"
      />
      <button
        onClick={() => setCurrentView(View.Opportunities)}
        data-testid="opportunities-tab"
      />
      <span>Current: {currentView}</span>
    </div>
  ),
}));
vi.mock("./components/LeadsList", () => ({
  __esModule: true,
  default: () => <div data-testid="leads-list" />,
}));
vi.mock("./components/OpportunitiesList", () => ({
  __esModule: true,
  default: () => <div data-testid="opportunities-list" />,
}));

describe("App", () => {
  it("renders LeadsList by default", () => {
    render(<App />);

    expect(screen.getByTestId("leads-list")).toBeInTheDocument();
    expect(screen.queryByTestId("opportunities-list")).not.toBeInTheDocument();

    expect(screen.getByText(/Current: leads/i)).toBeInTheDocument();
  });

  it("switches to OpportunitiesList when tab is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("opportunities-tab"));

    expect(screen.queryByTestId("leads-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("opportunities-list")).toBeInTheDocument();

    expect(screen.getByText(/Current: opportunities/i)).toBeInTheDocument();
  });

  it("switches back to LeadsList when tab is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("opportunities-tab"));
    fireEvent.click(screen.getByTestId("leads-tab"));

    expect(screen.getByTestId("leads-list")).toBeInTheDocument();
    expect(screen.queryByTestId("opportunites-list")).not.toBeInTheDocument();
    expect(screen.getByText(/Current: leads/i)).toBeInTheDocument();
  });
});
