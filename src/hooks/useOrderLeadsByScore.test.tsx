import { describe, it, expect } from "vitest";
import useOrderLeadsByScore from "./useOrderLeadsByScore";
import { Order } from "@/types/order.d";
import type { Lead } from "@/types/lead";

const leads: Lead[] = [
  { id: "1", name: "Alice", score: 10 },
  { id: "2", name: "Bob", score: 30 },
  { id: "3", name: "Carol", score: 20 },
] as Lead[];

describe("useOrderLeadsByScore", () => {
  it("returns leads sorted by score descending when order is Ascending", () => {
    const input = [...leads];

    const result = useOrderLeadsByScore(input, Order.Ascending);

    expect(result.map((l) => l.id)).toEqual(["2", "3", "1"]);
  });

  it("returns leads sorted by score ascending when order is Descending", () => {
    const input = [...leads];

    const result = useOrderLeadsByScore(input, Order.Descending);

    expect(result.map((l) => l.id)).toEqual(["1", "3", "2"]);
  });

  it("returns leads as is when order is neither Ascending nor Descending", () => {
    const input = [...leads];

    // @ts-expect-error testing fallback
    const result = useOrderLeadsByScore(input, "Other");

    expect(result).toEqual(input);
  });

  it("returns empty array when leads is empty", () => {
    const input: Lead[] = [];

    const result = useOrderLeadsByScore(input, Order.Ascending);

    expect(result).toEqual([]);
  });
});
