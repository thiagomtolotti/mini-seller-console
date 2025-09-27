import { describe, it, vi } from "vitest";
import type { Mock } from "vitest";

import * as ReactDOMClient from "react-dom/client";

vi.mock("react-dom/client", async () => {
  const actual = await vi.importActual<typeof ReactDOMClient>(
    "react-dom/client"
  );
  return {
    ...actual,
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});
vi.mock("./App.tsx", () => ({
  default: () => <div data-testid="app" />,
}));

describe("main entrypoint", () => {
  it("calls createRoot with the root element and renders App", async () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    const createRoot = ReactDOMClient.createRoot as unknown as Mock;

    createRoot.mockClear();
    await import("./main.tsx");

    expect(createRoot).toHaveBeenCalledWith(rootElement);

    const renderFn = createRoot.mock.results[0].value.render;

    expect(renderFn).toHaveBeenCalled();
    document.body.removeChild(rootElement);
  });
});
