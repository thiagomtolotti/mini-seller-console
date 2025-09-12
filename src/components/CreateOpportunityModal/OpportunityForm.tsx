import { useState } from "react";

import clsx from "clsx";
import { v4 as uuid } from "uuid";

import { OpportunityStage, type Opportunity } from "@/types/opportunity.d";

import Button from "../ui/Button";
import Input from "../ui/Input";

import useCreateOpportunity from "@/hooks/useCreateOpportunity";

interface OpportunityFormProps {
  defaultName?: string;
  defaultAccount?: string;
  onClose: () => void;
}

export default function OpportunityForm({
  defaultName,
  defaultAccount,
  onClose,
}: OpportunityFormProps) {
  const [error, setError] = useState<Error | null>(null);
  const { createOpportunity, pending } = useCreateOpportunity();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const opportunity: Opportunity = {
      id: uuid(),
      name: formData.get("name") as string,
      accountName: formData.get("accountName") as string,
      amount: formData.get("amount")
        ? Number(formData.get("amount"))
        : undefined,
      stage: formData.get("stage") as OpportunityStage,
    };

    try {
      await createOpportunity(opportunity);

      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 flex-wrap mt-12"
    >
      <div className="flex gap-4">
        <Input
          type="text"
          name="name"
          placeholder="Opportunity Name"
          defaultValue={defaultName}
          required
          disabled={pending}
        />

        <Input
          type="text"
          name="accountName"
          placeholder="Account Name"
          defaultValue={defaultAccount}
          required
          disabled={pending}
        />
      </div>

      <div className="flex gap-4">
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          disabled={pending}
        />

        <SelectStage disabled={pending} />
      </div>

      {error && (
        <p className="text-red-500 text-sm ml-auto">Error: {error.message}</p>
      )}

      <div className="mt-6 ml-auto flex gap-4">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" pending={pending}>
          Create Opportunity
        </Button>
      </div>
    </form>
  );
}

function SelectStage({
  className,
  ...props
}: React.HTMLProps<HTMLSelectElement>) {
  return (
    <select
      name="stage"
      className={clsx(
        "border border-slate-300 rounded-md px-3 py-2 w-full",
        className
      )}
      required
      {...props}
    >
      {Object.entries(OpportunityStage).map(([label, value]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
