import type { LeadStatus } from "@/types/lead";
import clsx from "clsx";

export default function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const statusColors: Record<
    LeadStatus,
    React.HTMLProps<unknown>["className"]
  > = {
    New: "bg-violet-600",
    Contacted: "bg-violet-800",
    Qualified: "bg-violet-950",
  };

  return (
    <span
      className={clsx(
        "flex items-center justify-center w-fit py-1 px-4 text-center rounded-full font-semibold text-slate-50 text-sm shadow-md",
        statusColors[status]
      )}
    >
      {status}
    </span>
  );
}
