import { renderHook, act } from "@testing-library/react";
import useCreateOpportunity from "./useCreateOpportunity";
import { OpportunitiesContext } from "@/contexts/OpportunitiesContext";
import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";
import type { Opportunity } from "@/types/opportunity";

function wrapperFactory({
  shouldThrow = false,
  setOpportunitiesStore = () => {},
}: {
  shouldThrow?: boolean;
  setOpportunitiesStore?: (fn: (cur: Opportunity[]) => Opportunity[]) => void;
}) {
  return ({ children }: { children: React.ReactNode }) => (
    <ConfigurationsContext.Provider
      value={{ shouldThrow }}
      data-testid="configurations-context"
    >
      <OpportunitiesContext.Provider
        value={{ setOpportunitiesStore } as any}
        data-testid="opportunities-context"
      >
        {children}
      </OpportunitiesContext.Provider>
    </ConfigurationsContext.Provider>
  );
}

const opportunity: Opportunity = {
  id: "1",
  name: "Test Opportunity",
} as Opportunity;

describe("useCreateOpportunity", () => {
  it("sets pending to true while creating and false after", async () => {
    let store: Opportunity[] = [];
    const setOpportunitiesStore = (
      fn: (cur: Opportunity[]) => Opportunity[]
    ) => {
      store = fn(store);
    };

    const { result } = renderHook(() => useCreateOpportunity(), {
      wrapper: wrapperFactory({ setOpportunitiesStore }),
    });

    expect(result.current.pending).toBe(false);

    act(() => {
      result.current.createOpportunity(opportunity);
    });

    expect(result.current.pending).toBe(true);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 800));
    });

    expect(result.current.pending).toBe(false);
    expect(store).toContainEqual(opportunity);
  });

  it("throws error and does not update store if shouldThrow is true", async () => {
    let store: Opportunity[] = [];
    const setOpportunitiesStore = (
      fn: (cur: Opportunity[]) => Opportunity[]
    ) => {
      store = fn(store);
    };

    const { result } = renderHook(() => useCreateOpportunity(), {
      wrapper: wrapperFactory({ shouldThrow: true, setOpportunitiesStore }),
    });

    let error: unknown;

    act(() => {
      result.current.createOpportunity(opportunity).catch((e) => {
        error = e;
      });
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 800));
    });

    expect(result.current.pending).toBe(false);
    expect(store).toHaveLength(0);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Failed to create opportunity");
  });
});
