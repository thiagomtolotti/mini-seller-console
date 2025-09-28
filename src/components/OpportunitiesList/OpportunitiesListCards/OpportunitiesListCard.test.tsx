import { render, screen } from "@testing-library/react";
import OpportunitiesListCard from "./OpportunitiesListCard";
import type { Opportunity } from "@/types/opportunity";

const mockOpportunity: Opportunity = {
  id: "1",
  name: "Big Deal",
  accountName: "Acme Corp",
  amount: 50000,
  stage: "Negotiation",
} as Opportunity;

it("renders opportunity name", () => {
  render(<OpportunitiesListCard opportunity={mockOpportunity} />);

  const name = screen.getByText(mockOpportunity.name);

  expect(name).toBeInTheDocument();
});

it("renders account name", () => {
  render(<OpportunitiesListCard opportunity={mockOpportunity} />);

  const account = screen.getByText(mockOpportunity.accountName);

  expect(account).toBeInTheDocument();
});

it("renders amount with USD prefix", () => {
  render(<OpportunitiesListCard opportunity={mockOpportunity} />);

  const amount = screen.getByText(`USD $${mockOpportunity.amount}`);

  expect(amount).toBeInTheDocument();
});

it("renders stage", () => {
  render(<OpportunitiesListCard opportunity={mockOpportunity} />);

  const stage = screen.getByText(mockOpportunity.stage);

  expect(stage).toBeInTheDocument();
});
