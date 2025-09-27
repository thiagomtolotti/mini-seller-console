import { render, screen } from "@testing-library/react";
import LeadStatusBadge from "./LeadStatusBadge";

import { LeadStatus } from "@/types/lead.d";

describe("LeadStatusBadge", () => {
  it("renders the correct status text", () => {
    Object.values(LeadStatus).forEach((value) => {
      render(<LeadStatusBadge status={value} />);

      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
