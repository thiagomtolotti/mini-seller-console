import { renderHook, act } from "@testing-library/react";

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import useLeadsList, { PENDING_TIME } from "./useLeadsList";

import leadsList from "@public/leads.json";

describe("useLeadsList", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it("should initialize with pending true and leads undefined", () => {
    const { result } = renderHook(() => useLeadsList());

    expect(result.current.pending).toBe(true);
    expect(result.current.leads).toBeUndefined();

    // Type checks
    expect(typeof result.current.pending).toBe("boolean");
    expect(result.current.leads).toBeUndefined();
  });

  it("should not resolve before PENDING_TIME", () => {
    const { result } = renderHook(() => useLeadsList());

    act(() => {
      vi.advanceTimersByTime(PENDING_TIME - 1);
    });

    expect(result.current.pending).toBe(true);
    expect(result.current.leads).toBeUndefined();
  });

  it("should set leads and pending after timeout", () => {
    const { result } = renderHook(() => useLeadsList());

    act(() => {
      vi.advanceTimersByTime(PENDING_TIME);
    });

    expect(result.current.leads).toEqual(leadsList);
    expect(result.current.pending).toBe(false);

    // Type checks
    expect(Array.isArray(result.current.leads)).toBe(true);
  });

  it("should reset leads and pending on remount", () => {
    const { unmount } = renderHook(() => useLeadsList());

    act(() => {
      vi.advanceTimersByTime(PENDING_TIME);
    });

    unmount();

    // Remount the hook to check initial state
    const { result: remountResult } = renderHook(() => useLeadsList());

    expect(remountResult.current.leads).toBeUndefined();
    expect(remountResult.current.pending).toBe(true);
  });

  it("should not update state after unmount", () => {
    const { unmount, result } = renderHook(() => useLeadsList());

    unmount();

    act(() => {
      vi.advanceTimersByTime(PENDING_TIME);
    });

    // State should remain unchanged after unmount
    expect(result.current.leads).toBeUndefined();
    expect(result.current.pending).toBe(true);
  });
});
