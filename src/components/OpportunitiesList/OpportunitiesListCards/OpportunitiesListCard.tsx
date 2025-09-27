import type { Opportunity } from "@/types/opportunity";

interface OpportunitiesListCardProps {
  opportunity: Opportunity;
}

export default function OpportunitiesListCard({
  opportunity,
}: OpportunitiesListCardProps) {
  return (
    <div className="border border-slate-800 bg-black/20 px-6 py-8 rounded-lg flex flex-col gap-2">
      <h3 className="font-bold text-lg mb-2">{opportunity.name}</h3>

      <p className="break-all">
        <span className="font-semibold">Account:</span>{" "}
        {opportunity.accountName}
      </p>

      <p>
        <span className="font-semibold">Amount:</span> USD ${opportunity.amount}
      </p>

      <p>
        <span className="font-semibold">Stage:</span> {opportunity.stage}
      </p>
    </div>
  );
}
