import { OpportunityStage } from "@/types/opportunity.d";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface OpportunityFormProps {
  defaultName?: string;
  defaultAccount?: string;
  onClose?: () => void;
}

export default function OpportunityForm({
  defaultName,
  defaultAccount,
  onClose,
}: OpportunityFormProps) {
  return (
    <form action="" className="flex flex-col gap-4 flex-wrap mt-12">
      <div className="flex gap-4">
        <Input
          type="text"
          name="name"
          placeholder="Opportunity Name"
          required
          defaultValue={defaultName}
        />

        <Input type="number" name="amount" placeholder="Amount" />
      </div>

      <div className="flex gap-4">
        <Input
          type="text"
          name="accountName"
          placeholder="Account Name"
          defaultValue={defaultAccount}
          required
        />

        <SelectStage />
      </div>

      <div className="mt-6 ml-auto flex gap-4">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit">Create Opportunity</Button>
      </div>
    </form>
  );
}

function SelectStage() {
  return (
    <select
      name="stage"
      required
      className="border border-slate-300 rounded-md px-3 py-2 w-full"
    >
      {Object.entries(OpportunityStage).map(([label, value]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
