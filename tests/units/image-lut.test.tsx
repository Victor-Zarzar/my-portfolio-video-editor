import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
} from "bun:test"
import { act, cleanup, fireEvent, render } from "@testing-library/react"

mock.module("#/paraglide/messages", () => ({
  m: {
    lut_teaser_aria: () => "Compare S-Log3 footage with the LUT applied",
    lut_teaser_alt_log: () => "Frame in flat S-Log3, without LUT",
    lut_teaser_alt_graded: () => "Same frame with the custom LUT applied",
    lut_teaser_label_log: () => "S-Log3",
    lut_teaser_label_graded: () => "LUT 03 — Serene",
  },
}))
mock.module("@/assets/lut/serene.jpg", () => ({ default: "serene.jpg" }))
mock.module("@/assets/lut/slog3.jpg", () => ({ default: "slog3.jpg" }))

const { ImageLut } = await import("#/shared/features/image-lut")

let rafQueue = new Map<number, FrameRequestCallback>()
let rafId = 0
const cancelSpy = mock((id: number) => {
  rafQueue.delete(id)
})

function flushRaf() {
  act(() => {
    const callbacks = [...rafQueue.values()]
    rafQueue.clear()
    for (const cb of callbacks) cb(0)
  })
}

function setup() {
  const utils = render(<ImageLut />)
  const slider = utils.getByRole("slider") as HTMLElement

  slider.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 1000,
      top: 0,
      bottom: 100,
      width: 1000,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect
  slider.setPointerCapture = () => {}

  const divider = () => utils.getByTestId("lut-divider")
  const pos = () => slider.style.getPropertyValue("--pos")

  const down = (clientX: number, pointerType = "mouse") =>
    fireEvent.pointerDown(slider, { clientX, pointerType, pointerId: 1 })
  const move = (clientX: number, pointerType = "mouse") =>
    fireEvent.pointerMove(slider, { clientX, pointerType, pointerId: 1 })
  const up = () => fireEvent.pointerUp(slider, { pointerId: 1 })
  const key = (k: string, init: KeyboardEventInit = {}) =>
    fireEvent.keyDown(slider, { key: k, ...init })

  return { ...utils, slider, divider, pos, down, move, up, key }
}

describe("ImageLut", () => {
  beforeEach(() => {
    rafQueue = new Map()
    rafId = 0
    cancelSpy.mockClear()
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      rafId += 1
      rafQueue.set(rafId, cb)
      return rafId
    }) as typeof requestAnimationFrame
    globalThis.cancelAnimationFrame =
      cancelSpy as unknown as typeof cancelAnimationFrame
  })

  afterEach(() => {
    cleanup()
  })

  it("should render both images and their labels", () => {
    const { getByAltText, getByText } = setup()
    expect(getByAltText("Frame in flat S-Log3, without LUT")).toBeTruthy()
    expect(getByAltText("Same frame with the custom LUT applied")).toBeTruthy()
    expect(getByText("S-Log3")).toBeTruthy()
    expect(getByText("LUT 03 — Serene")).toBeTruthy()
  })

  it("should expose slider semantics and be keyboard focusable", () => {
    const { slider } = setup()
    expect(slider.getAttribute("aria-label")).toBe(
      "Compare S-Log3 footage with the LUT applied",
    )
    expect(slider.getAttribute("aria-valuemin")).toBe("0")
    expect(slider.getAttribute("aria-valuemax")).toBe("100")
    expect(slider.getAttribute("aria-valuenow")).toBe("50")
    expect(slider.getAttribute("tabindex")).toBe("0")
  })

  it("should start fixed at the center", () => {
    const { pos } = setup()
    expect(pos()).toBe("50%")
  })

  it("should bind the divider and the clip-path to the same --pos variable", () => {
    const { divider, getByAltText } = setup()
    expect(divider().getAttribute("style")).toContain("var(--pos)")
    expect(
      getByAltText("Same frame with the custom LUT applied").getAttribute(
        "style",
      ),
    ).toContain("var(--pos)")
  })

  it("should NOT move on hover", () => {
    const { move, pos } = setup()
    move(900)
    flushRaf()
    expect(pos()).toBe("50%")
  })

  it("should jump to the pressed point", () => {
    const { down, pos } = setup()
    down(250)
    flushRaf()
    expect(pos()).toBe("25%")
  })

  it("should follow the pointer while dragging", () => {
    const { down, move, pos } = setup()
    down(500)
    move(800)
    flushRaf()
    expect(pos()).toBe("80%")
  })

  it("should work with touch pointers", () => {
    const { down, move, pos } = setup()
    down(300, "touch")
    move(700, "touch")
    flushRaf()
    expect(pos()).toBe("70%")
  })

  it("should clamp to 0% and 100%", () => {
    const { down, move, pos } = setup()
    down(500)
    move(-300)
    flushRaf()
    expect(pos()).toBe("0%")
    move(5000)
    flushRaf()
    expect(pos()).toBe("100%")
  })

  it("should stop following after release", () => {
    const { down, move, up, pos } = setup()
    down(500)
    up()
    move(900)
    flushRaf()
    expect(pos()).toBe("50%")
  })

  it("should stop following after pointercancel", () => {
    const { slider, down, move, pos } = setup()
    down(500)
    fireEvent.pointerCancel(slider, { pointerId: 1 })
    move(900)
    flushRaf()
    expect(pos()).toBe("50%")
  })

  it("should keep the position after release (no snap back)", () => {
    const { down, up, pos } = setup()
    down(800)
    flushRaf()
    up()
    flushRaf()
    expect(pos()).toBe("80%")
  })

  it("should sync aria-valuenow only on release", () => {
    const { slider, down, up } = setup()
    down(250)
    flushRaf()
    expect(slider.getAttribute("aria-valuenow")).toBe("50")
    up()
    expect(slider.getAttribute("aria-valuenow")).toBe("25")
  })

  it("should coalesce several moves into a single frame update", () => {
    const { down, move, pos } = setup()
    down(100)
    flushRaf()
    move(200)
    move(300)
    move(400)
    expect(rafQueue.size).toBe(1)
    flushRaf()
    expect(pos()).toBe("40%")
  })

  it("should animate the press jump and drop the transition once it moves", () => {
    const { down, move, divider } = setup()
    down(250)
    expect(divider().className).toContain("duration-300")
    move(260)
    expect(divider().className).not.toContain("duration-300")
  })

  it("should have no transition while idle", () => {
    const { divider } = setup()
    expect(divider().className).not.toContain("transition-[left]")
  })

  it("should respect reduced motion on the transition", () => {
    const { down, divider } = setup()
    down(250)
    expect(divider().className).toContain("motion-reduce:transition-none")
  })

  describe("keyboard", () => {
    it("should move by 4% with arrow keys", () => {
      const { key, pos, slider } = setup()
      key("ArrowRight")
      flushRaf()
      expect(pos()).toBe("54%")
      expect(slider.getAttribute("aria-valuenow")).toBe("54")
      key("ArrowLeft")
      key("ArrowLeft")
      flushRaf()
      expect(pos()).toBe("46%")
    })

    it("should move by 10% with Shift", () => {
      const { key, pos } = setup()
      key("ArrowRight", { shiftKey: true })
      flushRaf()
      expect(pos()).toBe("60%")
      key("ArrowLeft", { shiftKey: true })
      key("ArrowLeft", { shiftKey: true })
      flushRaf()
      expect(pos()).toBe("40%")
    })

    it("should jump to the edges with Home and End", () => {
      const { key, pos, slider } = setup()
      key("Home")
      flushRaf()
      expect(pos()).toBe("0%")
      expect(slider.getAttribute("aria-valuenow")).toBe("0")
      key("End")
      flushRaf()
      expect(pos()).toBe("100%")
      expect(slider.getAttribute("aria-valuenow")).toBe("100")
    })

    it("should clamp at the edges", () => {
      const { key, pos } = setup()
      key("End")
      key("ArrowRight", { shiftKey: true })
      flushRaf()
      expect(pos()).toBe("100%")
    })

    it("should animate keyboard moves", () => {
      const { key, divider } = setup()
      key("ArrowRight")
      expect(divider().className).toContain("duration-300")
    })

    it("should prevent default only for handled keys", () => {
      const { key } = setup()
      expect(key("ArrowRight")).toBe(false)
      expect(key("a")).toBe(true)
      expect(key("Tab")).toBe(true)
    })
  })

  it("should cancel a pending frame on unmount", () => {
    const { down, unmount } = setup()
    down(250)
    expect(rafQueue.size).toBe(1)
    unmount()
    expect(cancelSpy).toHaveBeenCalled()
    expect(rafQueue.size).toBe(0)
  })
})
