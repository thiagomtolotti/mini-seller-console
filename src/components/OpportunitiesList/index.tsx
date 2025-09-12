import { OpportunitiesProvider } from "@/contexts/OpportunitiesProvider";

import OpportunitiesListTable from "./OpportunitiesListTable";

export default function OpportunitiesList() {
  return (
    <OpportunitiesProvider>
      <OpportunitiesListTable />
    </OpportunitiesProvider>
  );
}
