import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeadDetailForm from "./LeadDetailForm";
import { LeadStatus, type Lead } from "@/types/lead.d";

const mockUpdateLead = vi.fn();
const mockOnClose = vi.fn();

vi.mocked = (mod: any) => mod.default();

vi.mock("@/hooks/useUpdateLead", () => ({
  default: () => ({
    updateLead: mockUpdateLead,
    pending: false,
  }),
}));
vi.mock("../ui/Input", () => ({
  __esModule: true,
  default: (props: any) => <input data-testid="input" {...props} />,
}));
vi.mock("../ui/Button", () => ({
  __esModule: true,
  default: (props: any) => (
    <button data-testid="button" {...props}>
      {props.children}
    </button>
  ),
}));
vi.mock("./LabelLine", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="label-line">
      <span>{props.label}</span>
      {props.children}
    </div>
  ),
}));

const lead: Lead = {
  id: "1",
  name: "John Doe",
  company: "Acme Inc",
  email: "john@acme.com",
  source: "Website",
  score: 42,
  status: LeadStatus.New,
};

describe("LeadDetailForm", () => {
  beforeEach(() => {
    mockUpdateLead.mockReset();
    mockOnClose.mockReset();
  });

  it("submits updated email and status and calls onClose on success", async () => {
    mockUpdateLead.mockResolvedValueOnce(undefined);

    render(<LeadDetailForm lead={lead} onClose={mockOnClose} />);

    fireEvent.change(document.querySelector("input[type='email']")!, {
      target: { value: "new@email.com" },
    });
    fireEvent.change(document.querySelector("select")!, {
      target: { value: LeadStatus.Contacted },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateLead).toHaveBeenCalledWith({
        ...lead,
        email: "new@email.com",
        status: LeadStatus.Contacted,
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("shows error message if updateLead throws", async () => {
    mockUpdateLead.mockRejectedValueOnce(new Error("Update failed"));

    render(<LeadDetailForm lead={lead} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/error: update failed/i)).toBeInTheDocument();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
