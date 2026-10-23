import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
} from "bun:test";
import { cleanup, renderHook } from "@testing-library/react";

const mockNavigate = mock((_options: { to: string }) =>
  Promise.resolve(),
);

let mockPathname = "/";

mock.module("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
  useRouterState: <T>({
    select,
  }: {
    select: (state: { location: { pathname: string } }) => T;
  }): T =>
    select({
      location: { pathname: mockPathname },
    }),
}));

mock.module("#/env/client", () => ({
  env: {
    VITE_DISABLE_DEVTOOLS: "true",
  },
}));

const { useDisableDevTools } = await import(
  "#/hooks/use-disable-dev"
);

describe("useDisableDevTools", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockPathname = "/";
  });

  afterEach(() => {
    cleanup();
  });

  it("should prevent F12 and redirect to /unauthorized", () => {
    renderHook(() => useDisableDevTools());
    const event = new KeyboardEvent("keydown", {
      key: "F12",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/unauthorized",
    });
  });

  it("should prevent Ctrl+Shift+I and redirect", () => {
    renderHook(() => useDisableDevTools());

    const event = new KeyboardEvent("keydown", {
      key: "I",
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/unauthorized",
    });
  });

  it("should prevent Ctrl+U and redirect", () => {
    renderHook(() => useDisableDevTools());

    const event = new KeyboardEvent("keydown", {
      key: "U",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/unauthorized",
    });
  });

  it("should prevent context menu and redirect", () => {
    renderHook(() => useDisableDevTools());
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/unauthorized",
    });
  });

  it("should redirect only once", () => {
    renderHook(() => useDisableDevTools());
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F12" }),
    );
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F12" }),
    );
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should reset redirect state when pathname changes", () => {
    const { rerender } = renderHook(() =>
      useDisableDevTools(),
    );

    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F12" }),
    );
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    mockPathname = "/home";
    rerender();
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F12" }),
    );
    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  it("should not redirect when already unauthorized", () => {
    mockPathname = "/unauthorized";
    renderHook(() => useDisableDevTools());
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F12" }),
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
