import { renderHook, act } from "@testing-library/react";
import useFetchOpportunities, { PENDING_TIME } from "./useFetchOpportunities";
import { ConfigurationsContext } from "@/contexts/ConfigurationsContext";
import opportunitiesList from "@public/opportunities.json";
import type { Opportunity } from "@/types/opportunity";

function wrapper(shouldThrow = false) {
  return ({ children }: { children: React.ReactNode }) => (
    <ConfigurationsContext.Provider value={{ shouldThrow }}>
      {children}
    </ConfigurationsContext.Provider>
  );
}

describe("useFetchOpportunities", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fetches opportunities successfully", async () => {
    const { result } = renderHook(() => useFetchOpportunities(), {
      wrapper: wrapper(false),
    });

    expect(result.current.pending).toBe(true);
    expect(result.current.opportunities).toBeUndefined();
    expect(result.current.error).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(PENDING_TIME);
      await Promise.resolve();
    });

    expect(result.current.pending).toBe(false);
    expect(result.current.opportunities).toEqual(
      opportunitiesList as Opportunity[]
    );
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error when shouldThrow is true", async () => {
    const { result } = renderHook(() => useFetchOpportunities(), {
      wrapper: wrapper(true),
    });

    expect(result.current.pending).toBe(true);
    expect(result.current.opportunities).toBeUndefined();
    expect(result.current.error).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(PENDING_TIME);
      await Promise.resolve();
    });

    expect(result.current.pending).toBe(false);
    expect(result.current.opportunities).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Failed to fetch opportunities");
  });
});
