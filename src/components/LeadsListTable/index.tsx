import useLeadsList from "@/hooks/useLeadsList";

import LeadsListTableRow from "./LeadsListTableRow";
import LeadsListTableHeader from "./LeadsListTableHeader";
import LeadsListTableSkeleton from "./LeadsListTableSkeleton";

export default function LeadsListTable() {
  const { leads, pending } = useLeadsList();

  return (
    <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
      <table className="w-full">
        <LeadsListTableHeader />

        <tbody>
          {pending && <LeadsListTableSkeleton />}

          {leads?.map((lead) => (
            <LeadsListTableRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
