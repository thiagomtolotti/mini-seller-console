import { useContext } from "react";

import { Order } from "@/types/order.d";

import { LeadsListContext } from "@/contexts/LeadsListContext";

import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";

export default function ScoreHeaderCell() {
  const { filters, setFilters } = useContext(LeadsListContext);

  const Icon = (() => {
    if (filters.score === Order.Ascending) return ChevronDownIcon;
    if (filters.score === Order.Descending) return ChevronUpIcon;

    return ChevronUpDownIcon;
  })();

  const order: Order[] = Object.values(Order).map((order) => order);

  return (
    <div className="flex gap-2 ">
      Score
      <Icon
        className="w-4 cursor-pointer"
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            score: order[(order.indexOf(prev.score) + 1) % 3],
          }))
        }
      />
    </div>
  );
}
