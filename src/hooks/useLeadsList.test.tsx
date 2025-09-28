import { renderHook, act } from "@testing-library/react";
import useLeadsList from "./useLeadsList";
import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";
import leadsList from "@public/leads.json";
import type { Lead } from "@/types/lead";

function wrapper(shouldThrow = false) {
  return ({ children }: { children: React.ReactNode }) => (
    <ConfigurationsContext.Provider value={{ shouldThrow }}>
      {children}
    </ConfigurationsContext.Provider>
  );
}

describe("useLeadsList", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fetch leads successfully", async () => {
    const { result } = renderHook(() => useLeadsList(), {
      wrapper: wrapper(false),
    });

    expect(result.current.pending).toBe(true);
    expect(result.current.leads).toBeUndefined();
    expect(result.current.error).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });

    expect(result.current.pending).toBe(false);

    expect(result.current.leads).toEqual(leadsList as Lead[]);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when shouldThrow is true", async () => {
    const { result } = renderHook(() => useLeadsList(), {
      wrapper: wrapper(true),
    });

    expect(result.current.pending).toBe(true);
    expect(result.current.leads).toBeUndefined();
    expect(result.current.error).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });

    expect(result.current.pending).toBe(false);

    expect(result.current.leads).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Failed to fetch leads");
  });
});
