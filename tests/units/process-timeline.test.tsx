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
    services_timeline_heading: () => "A clear path, from brief to film.",
    services_timeline_concept: () => "Concept",
    services_timeline_preproduction: () => "Pre-production",
    services_timeline_shoot: () => "Shoot",
    services_timeline_postproduction: () => "Post-production",
  },
}))

const { ProcessTimeline, toTimecode, buildBars, REST } = await import(
  "#/shared/features/process-timeline"
)

let ioCallback: IntersectionObserverCallback | null = null
const mockDisconnect = mock(() => {})

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    ioCallback = cb
  }
  observe() {}
  unobserve() {}
  disconnect = mockDisconnect
}

let reducedMotion = false

function mockMatchMedia(query: string) {
  return {
    matches: reducedMotion,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
    onchange: null,
  } as unknown as MediaQueryList
}

function triggerIntersection(isIntersecting = true) {
  act(() => {
    ioCallback?.(
      [{ isIntersecting }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    )
  })
}

function setup() {
  const utils = render(<ProcessTimeline />)
  const area = utils.container.querySelector(
    ".cursor-ew-resize",
  ) as HTMLElement
  const track = area.firstElementChild as HTMLElement

  track.getBoundingClientRect = () =>
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

  const playhead = () =>
    utils.container.querySelector(".pointer-events-none") as HTMLElement

  const moveTo = (clientX: number, pointerType = "mouse") =>
    fireEvent.pointerMove(area, { clientX, pointerType })

  const leave = (pointerType = "mouse") =>
    fireEvent.pointerLeave(area, { pointerType })

  return { ...utils, area, playhead, moveTo, leave }
}

describe("toTimecode", () => {
  it("should format 0% as 00:00", () => {
    expect(toTimecode(0)).toBe("00:00")
  })

  it("should format 100% as the full duration 01:10", () => {
    expect(toTimecode(100)).toBe("01:10")
  })

  it("should format the midpoint", () => {
    expect(toTimecode(50)).toBe("00:35")
  })

  it("should format the rest position", () => {
    expect(toTimecode(REST)).toBe("00:36")
  })

  it("should roll seconds over into minutes", () => {
    expect(toTimecode((60 / 70) * 100)).toBe("01:00")
  })

  it("should always return mm:ss with zero padding", () => {
    for (const pct of [0, 3, 12.5, 49.9, 77, 99.9, 100]) {
      expect(toTimecode(pct)).toMatch(/^\d{2}:\d{2}$/)
    }
  })
})

describe("buildBars", () => {
  it("should generate 120 bars by default", () => {
    expect(buildBars()).toHaveLength(120)
  })

  it("should respect a custom length", () => {
    expect(buildBars(10)).toHaveLength(10)
  })

  it("should keep every height between 2 and 18", () => {
    for (const h of buildBars()) {
      expect(h).toBeGreaterThanOrEqual(2)
      expect(h).toBeLessThanOrEqual(18)
    }
  })

  it("should return integers only (avoids SSR hydration mismatch)", () => {
    for (const h of buildBars()) {
      expect(Number.isInteger(h)).toBe(true)
    }
  })

  it("should be deterministic", () => {
    expect(buildBars()).toEqual(buildBars())
  })
})

describe("ProcessTimeline", () => {
  beforeEach(() => {
    ioCallback = null
    reducedMotion = false
    mockDisconnect.mockClear()
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver
    window.matchMedia = mockMatchMedia as typeof window.matchMedia
  })

  afterEach(() => {
    cleanup()
  })

  it("should render the heading and the four stages", () => {
    const { getByText } = setup()
    expect(getByText("A clear path, from brief to film.")).toBeTruthy()
    expect(getByText("Concept")).toBeTruthy()
    expect(getByText("Pre-production")).toBeTruthy()
    expect(getByText("Shoot")).toBeTruthy()
    expect(getByText("Post-production")).toBeTruthy()
  })

  it("should start with the playhead at 0%", () => {
    const { playhead } = setup()
    expect(playhead().style.left).toBe("0%")
    expect(playhead().textContent).toBe("00:00")
  })

  it("should move the playhead to the rest position when entering the viewport", () => {
    const { playhead } = setup()
    triggerIntersection()
    expect(playhead().style.left).toBe(`${REST}%`)
    expect(playhead().textContent).toBe("00:36")
  })

  it("should disconnect the observer after the first intersection", () => {
    setup()
    triggerIntersection()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it("should not move the playhead when not intersecting", () => {
    const { playhead } = setup()
    triggerIntersection(false)
    expect(playhead().style.left).toBe("0%")
  })

  it("should jump straight to rest when prefers-reduced-motion is set", () => {
    reducedMotion = true
    const { playhead } = setup()
    expect(playhead().style.left).toBe(`${REST}%`)
  })

  it("should follow the mouse while scrubbing", () => {
    const { playhead, moveTo } = setup()
    moveTo(500)
    expect(playhead().style.left).toBe("50%")
    expect(playhead().textContent).toBe("00:35")
  })

  it("should use the fast transition while scrubbing", () => {
    const { playhead, moveTo } = setup()
    moveTo(300)
    expect(playhead().className).toContain("duration-75")
  })

  it("should clamp the playhead to 0% on the left edge", () => {
    const { playhead, moveTo } = setup()
    moveTo(-200)
    expect(playhead().style.left).toBe("0%")
    expect(playhead().textContent).toBe("00:00")
  })

  it("should clamp the playhead to 100% on the right edge", () => {
    const { playhead, moveTo } = setup()
    moveTo(5000)
    expect(playhead().style.left).toBe("100%")
    expect(playhead().textContent).toBe("01:10")
  })

  it("should ignore non-mouse pointers (touch keeps native scroll)", () => {
    const { playhead, moveTo } = setup()
    moveTo(500, "touch")
    expect(playhead().style.left).toBe("0%")
  })

  it("should return to the rest position when the mouse leaves", () => {
    const { playhead, moveTo, leave } = setup()
    moveTo(900)
    expect(playhead().style.left).toBe("90%")
    leave()
    expect(playhead().style.left).toBe(`${REST}%`)
    expect(playhead().className).toContain("duration-1000")
  })

  it("should ignore pointer leave from non-mouse pointers", () => {
    const { playhead, leave } = setup()
    leave("touch")
    expect(playhead().style.left).toBe("0%")
  })

  it("should highlight only the stages the playhead has passed", () => {
    const { getByText, moveTo } = setup()
    moveTo(300)

    expect(getByText("Concept").className).toContain("text-gold")
    expect(getByText("Pre-production").className).toContain("text-gold")
    expect(getByText("Shoot").className).toContain("text-muted-foreground")
    expect(getByText("Post-production").className).toContain(
      "text-muted-foreground",
    )
  })

  it("should highlight every stage at 100%", () => {
    const { getByText, moveTo } = setup()
    moveTo(1000)

    for (const label of ["Concept", "Pre-production", "Shoot", "Post-production"]) {
      expect(getByText(label).className).toContain("text-gold")
    }
  })
})
