import { useContext } from "react";

import { Order } from "@/types/order.d";

import { LeadsListContext } from "@/contexts/LeadsListContext";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";

export default function ScoreHeaderCell() {
  const { scoreOrder, setScoreOrder } = useContext(LeadsListContext);

  const Icon = (() => {
    if (scoreOrder === Order.Ascending) return ChevronDownIcon;
    if (scoreOrder === Order.Descending) return ChevronUpIcon;

    return ChevronUpDownIcon;
  })();

  const order: Order[] = Object.values(Order).map((order) => order);

  return (
    <div className="flex gap-2 ">
      Score
      <Icon
        className="w-4 cursor-pointer"
        onClick={() =>
          setScoreOrder((cur) => order[(order.indexOf(cur) + 1) % 3])
        }
      />
    </div>
  );
}
