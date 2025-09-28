import { renderHook, act } from "@testing-library/react";
import useUpdateLead from "./useUpdateLead";
import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";
import { LeadsListContext } from "@/contexts/LeadsListContext";
import type { Lead } from "@/types/lead";

function wrapperFactory({
  shouldThrow = false,
  leads = [],
  setLeadsStore = () => {},
}: {
  shouldThrow?: boolean;
  leads?: Lead[];
  setLeadsStore?: (fn: (cur: Lead[]) => Lead[]) => void;
}) {
  return ({ children }: { children: React.ReactNode }) => (
    <ConfigurationsContext.Provider value={{ shouldThrow }}>
      <LeadsListContext.Provider
        value={{ leadsStore: leads, setLeadsStore } as any}
      >
        {children}
      </LeadsListContext.Provider>
    </ConfigurationsContext.Provider>
  );
}

const leadA: Lead = { id: "1", name: "Lead A" } as Lead;
const leadB: Lead = { id: "2", name: "Lead B" } as Lead;

describe("useUpdateLead", () => {
  it("sets pending to true while updating and false after", async () => {
    const setLeadsStore = vi.fn();
    vi.useFakeTimers();

    const wrapper = wrapperFactory({ setLeadsStore, leads: [leadA, leadB] });

    const { result } = renderHook(() => useUpdateLead(), { wrapper });

    act(() => {
      result.current.updateLead({ ...leadA, name: "Updated Lead A" });
    });

    expect(result.current.pending).toBe(true);

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.pending).toBe(false);

    vi.useRealTimers();
  });

  it("updates the correct lead in the store", async () => {
    let updatedLeads: Lead[] = [];
    const setLeadsStore = vi.fn((fn) => {
      updatedLeads = fn([leadA, leadB]);
    });

    vi.useFakeTimers();

    const wrapper = wrapperFactory({ setLeadsStore, leads: [leadA, leadB] });

    const { result } = renderHook(() => useUpdateLead(), { wrapper });

    act(() => {
      result.current.updateLead({ ...leadA, name: "Updated Lead A" });
    });

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(setLeadsStore).toHaveBeenCalled();
    expect(updatedLeads).toEqual([{ ...leadA, name: "Updated Lead A" }, leadB]);

    vi.useRealTimers();
  });

  it("throws error if shouldThrow is true", async () => {
    const setLeadsStore = vi.fn();
    vi.useFakeTimers();

    const wrapper = wrapperFactory({
      shouldThrow: true,
      setLeadsStore,
      leads: [leadA],
    });

    const { result } = renderHook(() => useUpdateLead(), { wrapper });

    let error: unknown;

    await act(async () => {
      try {
        const promise = result.current.updateLead({
          ...leadA,
          name: "Updated Lead A",
        });
        vi.runAllTimers();
        await promise;
      } catch (e) {
        error = e;
      }
    });

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Failed to update lead");

    vi.useRealTimers();
  });
});
