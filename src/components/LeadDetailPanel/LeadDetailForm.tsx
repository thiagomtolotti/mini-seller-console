import { useState } from "react";

import { LeadStatus, type Lead } from "@/types/lead.d";

import useUpdateLead from "@/hooks/useUpdateLead";

import Button from "../ui/Button";
import LabelLine from "./LabelLine";
import Input from "../ui/Input";

interface LeadDetailFormProps {
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetailForm({ lead, onClose }: LeadDetailFormProps) {
  const [error, setError] = useState<Error | null>(null);
  const { updateLead, pending } = useUpdateLead();

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement);

    try {
      await updateLead({
        ...lead,
        email: formData.get("email") as string,
        status: formData.get("status") as LeadStatus,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
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
          className="md:text-right"
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
          defaultValue={lead.status}
        >
          {Object.values(LeadStatus).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </LabelLine>

      {error && (
        <div className="ml-auto text-red-600 text-sm ">
          Error: {error.message}
        </div>
      )}

      <div className="flex gap-4 ml-auto mt-6 flex-wrap">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="grow"
        >
          Cancel
        </Button>

        <Button pending={pending} className="grow min-w-40">
          Save
        </Button>
      </div>
    </form>
  );
}
