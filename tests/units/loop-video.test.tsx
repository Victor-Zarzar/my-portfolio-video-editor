import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
} from "bun:test"
import { act, cleanup, render } from "@testing-library/react"
import { LoopVideo } from "#/shared/features/loop-video"

let ioCallback: IntersectionObserverCallback | null = null
let ioOptions: IntersectionObserverInit | undefined
let ioInstances = 0
const mockObserve = mock((_el: Element) => {})
const mockDisconnect = mock(() => {})

class MockIntersectionObserver {
  constructor(
    cb: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    ioCallback = cb
    ioOptions = options
    ioInstances++
  }
  observe = mockObserve
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

function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    ioCallback?.(
      [{ isIntersecting }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    )
  })
}

function setup(props: Partial<Parameters<typeof LoopVideo>[0]> = {}) {
  const utils = render(
    <LoopVideo
      mp4="/media/vinyl.mp4"
      webm="/media/vinyl.webm"
      poster="/media/vinyl-poster.jpg"
      className="h-full w-full"
      {...props}
    />,
  )
  const video = utils.container.querySelector("video") as HTMLVideoElement
  const play = mock(() => Promise.resolve())
  const pause = mock(() => {})
  video.play = play as unknown as typeof video.play
  video.pause = pause as unknown as typeof video.pause

  return { ...utils, video, play, pause }
}

describe("LoopVideo", () => {
  beforeEach(() => {
    ioCallback = null
    ioOptions = undefined
    ioInstances = 0
    reducedMotion = false
    mockObserve.mockClear()
    mockDisconnect.mockClear()
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver
    window.matchMedia = mockMatchMedia as typeof window.matchMedia
  })

  afterEach(() => {
    cleanup()
  })

  describe("rendering", () => {
    it("should render a video with the expected attributes", () => {
      const { video } = setup()
      expect(video).toBeTruthy()
      expect(video.getAttribute("poster")).toBe("/media/vinyl-poster.jpg")
      expect(video.getAttribute("preload")).toBe("none")
      expect(video.getAttribute("aria-hidden")).toBe("true")
      expect(video.loop).toBe(true)
      expect(video.muted).toBe(true)
    })

    it("should apply the className", () => {
      const { video } = setup({ className: "absolute inset-0" })
      expect(video.className).toBe("absolute inset-0")
    })

    it("should render webm before mp4 when both are provided", () => {
      const { container } = setup()
      const sources = container.querySelectorAll("source")
      expect(sources).toHaveLength(2)
      expect(sources[0].getAttribute("src")).toBe("/media/vinyl.webm")
      expect(sources[0].getAttribute("type")).toBe("video/webm")
      expect(sources[1].getAttribute("src")).toBe("/media/vinyl.mp4")
      expect(sources[1].getAttribute("type")).toBe("video/mp4")
    })

    it("should render only the mp4 source when webm is omitted", () => {
      const { container } = setup({ webm: undefined })
      const sources = container.querySelectorAll("source")
      expect(sources).toHaveLength(1)
      expect(sources[0].getAttribute("type")).toBe("video/mp4")
    })

    it("should force the video to be muted on mount", () => {
      const { video } = setup()
      expect(video.muted).toBe(true)
    })
  })

  describe("intersection observer", () => {
    it("should observe the video element with a 0.25 threshold", () => {
      const { video } = setup()
      expect(ioInstances).toBe(1)
      expect(mockObserve).toHaveBeenCalledWith(video)
      expect(ioOptions).toEqual({ threshold: 0.25 })
    })

    it("should play when the video enters the viewport", () => {
      const { play, pause } = setup()
      triggerIntersection(true)
      expect(play).toHaveBeenCalledTimes(1)
      expect(pause).not.toHaveBeenCalled()
    })

    it("should pause when the video leaves the viewport", () => {
      const { play, pause } = setup()
      triggerIntersection(false)
      expect(pause).toHaveBeenCalledTimes(1)
      expect(play).not.toHaveBeenCalled()
    })

    it("should toggle between play and pause as visibility changes", () => {
      const { play, pause } = setup()
      triggerIntersection(true)
      triggerIntersection(false)
      triggerIntersection(true)
      expect(play).toHaveBeenCalledTimes(2)
      expect(pause).toHaveBeenCalledTimes(1)
    })

    it("should swallow play() rejections (autoplay blocked)", async () => {
      const { video } = setup()
      video.play = mock(() =>
        Promise.reject(new Error("NotAllowedError")),
      ) as unknown as typeof video.play

      expect(() => triggerIntersection(true)).not.toThrow()
      await Promise.resolve()
      expect(video.play).toHaveBeenCalledTimes(1)
    })

    it("should disconnect the observer on unmount", () => {
      const { unmount } = setup()
      expect(mockDisconnect).not.toHaveBeenCalled()
      unmount()
      expect(mockDisconnect).toHaveBeenCalledTimes(1)
    })
  })

  describe("prefers-reduced-motion", () => {
    it("should not create an observer when reduced motion is set", () => {
      reducedMotion = true
      setup()
      expect(ioInstances).toBe(0)
      expect(mockObserve).not.toHaveBeenCalled()
    })

    it("should never autoplay when reduced motion is set", () => {
      reducedMotion = true
      const { play } = setup()
      expect(ioCallback).toBeNull()
      expect(play).not.toHaveBeenCalled()
    })

    it("should still keep the video muted when reduced motion is set", () => {
      reducedMotion = true
      const { video } = setup()
      expect(video.muted).toBe(true)
    })

    it("should query the reduced motion media feature", () => {
      const spy = mock(mockMatchMedia)
      window.matchMedia = spy as unknown as typeof window.matchMedia
      setup()
      expect(spy).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)")
    })
  })
})
