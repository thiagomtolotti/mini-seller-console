import { Order } from "@/types/order.d";
import type { Lead } from "@/types/lead";

export default function useOrderLeadsByScore(leads: Lead[], order: Order) {
  if (order === Order.Ascending) {
    return leads?.sort((a, b) => b.score - a.score);
  }

  if (order === Order.Descending) {
    return leads?.sort((a, b) => a.score - b.score);
  }

  return leads;
}
