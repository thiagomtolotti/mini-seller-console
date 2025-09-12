import { LeadStatus, type Lead } from "@/types/lead.d";

import Button from "../ui/Button";
import LabelLine from "./LabelLine";
import useUpdateLead from "@/hooks/useUpdateLead";
import Input from "../ui/Input";

interface LeadDetailFormProps {
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetailForm({ lead, onClose }: LeadDetailFormProps) {
  const { updateLead, pending } = useUpdateLead();

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement);

    await updateLead({
      ...lead,
      email: formData.get("email") as string,
      status: formData.get("status") as LeadStatus,
    });

    onClose();
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-6"
    >
      <LabelLine label="Name">{lead.name}</LabelLine>

      <LabelLine label="Company">{lead.company}</LabelLine>

      <LabelLine label="Email">
        <Input
          type="email"
          name="email"
          defaultValue={lead.email}
          className="text-right"
          disabled={pending}
        />
      </LabelLine>

      <LabelLine label="Source">{lead.source}</LabelLine>

      <LabelLine label="Score">{lead.score}</LabelLine>

      <LabelLine label="Status">
        <select
          className="border-slate-300 border rounded-md py-1"
          name="status"
          disabled={pending}
        >
          {Object.values(LeadStatus).map((value) => (
            <option key={value} value={value} selected={lead.status === value}>
              {value}
            </option>
          ))}
        </select>
      </LabelLine>

      <div className="flex gap-4 ml-auto mt-6">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button pending={pending}>Save</Button>
      </div>
    </form>
  );
}
