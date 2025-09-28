import { describe, it, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import OpportunityForm from "./OpportunityForm";

import useCreateOpportunity, * as useCreateOpportunityModule from "@/hooks/useCreateOpportunity";

import { OpportunityStage } from "@/types/opportunity.d";

vi.mock("@/hooks/useCreateOpportunity", () => ({
  default: () => ({
    createOpportunity: vi.fn(),
    pending: false,
  }),
}));
vi.mock("../ui/Button", () => ({
  default: ({
    children,
    pending,
    ...props
  }: {
    children: React.ReactNode;
    pending: boolean;
  }) => (
    <button disabled={pending} {...props}>
      {children}
    </button>
  ),
}));
vi.mock("../ui/Input", () => ({
  default: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

describe("OpportunityForm", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields and buttons", () => {
    render(<OpportunityForm onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Opportunity Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Account Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create opportunity/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "" })).toBeInTheDocument();
  });

  it("fills default values if provided", () => {
    render(
      <OpportunityForm
        defaultName="Test Opp"
        defaultAccount="Test Account"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByDisplayValue("Test Opp")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Account")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<OpportunityForm onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits the form and calls createOpportunity, then onClose", async () => {
    const createOpportunity = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(useCreateOpportunityModule, "default").mockReturnValue({
      createOpportunity,
      pending: false,
    });

    render(<OpportunityForm onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Opportunity Name"), {
      target: { value: "Opp 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Account Name"), {
      target: { value: "Account 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: OpportunityStage.Prospecting },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create opportunity/i })
    );

    await waitFor(() => {
      expect(createOpportunity).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("shows error message if createOpportunity throws", async () => {
    const createOpportunity = vi
      .fn()
      .mockRejectedValue(new Error("Failed to create"));
    vi.spyOn(useCreateOpportunityModule, "default").mockReturnValue({
      createOpportunity,
      pending: false,
    });

    render(<OpportunityForm onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Opportunity Name"), {
      target: { value: "Opp 2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Account Name"), {
      target: { value: "Account 2" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: OpportunityStage.Prospecting },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create opportunity/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/error: failed to create/i)).toBeInTheDocument();
    });
  });

  it("disables fields and buttons when pending is true", () => {
    (useCreateOpportunity as Mock).mockReturnValue({
      createOpportunity: vi.fn(),
      pending: true,
    });

    render(<OpportunityForm onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Opportunity Name")).toBeDisabled();
    expect(screen.getByPlaceholderText("Account Name")).toBeDisabled();
    expect(screen.getByPlaceholderText("Amount")).toBeDisabled();
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /create opportunity/i })
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).not.toBeDisabled();
  });
});
