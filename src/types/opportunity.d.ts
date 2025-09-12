export enum OpportunityStage {
  Prospecting = "Prospecting",
  Negotiation = "Negotiation",
  "Closed Won" = "ClosedWon",
  "Closed Lost" = "ClosedLost",
}

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}
