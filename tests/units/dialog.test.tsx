import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
} from "bun:test"
import { act, cleanup, fireEvent, render } from "@testing-library/react"
import type { Work } from "#/shared/types/works/works"

mock.module("#/paraglide/messages", () => ({
  m: {
    works_dialog_share: () => "Share",
    works_dialog_copied: () => "Copied",
    works_dialog_close: () => "Close",
  },
}))

mock.module("#/shared/lib/video-embed", () => ({
  parseVideoUrl: (url: string) => {
    if (url.includes("instagram")) return { provider: "instagram", id: "abc" }
    if (url.includes("youtube")) return { provider: "youtube", id: "abc" }
    return null
  },
  getEmbedSrc: (video: { provider: string; id: string }, mode: string) =>
    `https://embed.test/${video.provider}/${video.id}?mode=${mode}`,
}))

const { WorkDialog } = await import("#/shared/features/works-dialog")

const makeWork = (overrides: Partial<Work> = {}): Work =>
  ({
    id: "neon-nights",
    title: "Neon Nights",
    kind: "Music Video",
    year: 2024,
    src: "/img/neon.jpg",
    srcSet: "",
    ...overrides,
  }) as unknown as Work

const showModal = mock(function (this: HTMLDialogElement) {
  this.open = true
})
const closeDialog = mock(function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event("close"))
})

function stubNavigator(props: { share?: unknown; clipboard?: unknown }) {
  Object.defineProperty(navigator, "share", {
    value: props.share,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(navigator, "clipboard", {
    value: props.clipboard,
    configurable: true,
    writable: true,
  })
}

const expectedUrl = (id: string) =>
  `${window.location.origin}${window.location.pathname}#${id}`

describe("WorkDialog", () => {
  const realSetTimeout = globalThis.setTimeout
  const realConsoleError = console.error
  let resetCallbacks: Array<() => void> = []

  beforeEach(() => {
    showModal.mockClear()
    closeDialog.mockClear()
    resetCallbacks = []

    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      value: showModal,
      configurable: true,
      writable: true,
    })
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      value: closeDialog,
      configurable: true,
      writable: true,
    })

    // Intercepts only the 2000ms "copied" reset timer; everything else stays real
    globalThis.setTimeout = ((
      cb: () => void,
      ms?: number,
      ...args: unknown[]
    ) => {
      if (ms === 2000) {
        resetCallbacks.push(cb)
        return 0
      }
      return realSetTimeout(cb, ms, ...args)
    }) as unknown as typeof setTimeout

    console.error = (...args: unknown[]) => {
      if (String(args[0]).includes("Iframe page loading is disabled")) return
      realConsoleError(...args)
    }

    stubNavigator({ share: undefined, clipboard: undefined })
  })

  afterEach(() => {
    cleanup()
    globalThis.setTimeout = realSetTimeout
    console.error = realConsoleError
    stubNavigator({ share: undefined, clipboard: undefined })
  })

  describe("rendering", () => {
    it("should render no content when work is null", () => {
      const { container, queryByText } = render(
        <WorkDialog
          work={null}
          onClose={() => {}}
        />,
      )
      expect(container.querySelector("dialog")).toBeTruthy()
      expect(queryByText("Share")).toBeNull()
      expect(queryByText("Close")).toBeNull()
    })

    it("should render title, kind and year", () => {
      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      expect(getByText("Neon Nights")).toBeTruthy()
      expect(getByText("Music Video")).toBeTruthy()
      expect(getByText("2024")).toBeTruthy()
    })

    it("should render the description when provided", () => {
      const { getByText, container } = render(
        <WorkDialog
          work={makeWork({ description: "A neon-soaked short film." })}
          onClose={() => {}}
        />,
      )
      expect(getByText("A neon-soaked short film.")).toBeTruthy()
      expect(container.querySelectorAll("p")).toHaveLength(2)
    })

    it("should omit the description when absent", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      expect(container.querySelectorAll("p")).toHaveLength(1)
    })

    it("should render every credit as role and name", () => {
      const { getByText, container } = render(
        <WorkDialog
          work={makeWork({
            credits: [
              { role: "Director", name: "Jane Doe" },
              { role: "DOP", name: "John Roe" },
            ],
          })}
          onClose={() => {}}
        />,
      )
      expect(getByText("Director:")).toBeTruthy()
      expect(getByText("Jane Doe")).toBeTruthy()
      expect(getByText("DOP:")).toBeTruthy()
      expect(getByText("John Roe")).toBeTruthy()
      expect(container.querySelectorAll("dt")).toHaveLength(2)
    })

    it("should omit the credits list when absent", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      expect(container.querySelector("dl")).toBeNull()
    })
  })

  describe("media", () => {
    it("should render the full embed iframe when the video url is valid", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork({ videoUrl: "https://youtube.com/watch?v=abc" })}
          onClose={() => {}}
        />,
      )
      const iframe = container.querySelector("iframe") as HTMLIFrameElement
      expect(iframe).toBeTruthy()
      expect(iframe.getAttribute("src")).toBe(
        "https://embed.test/youtube/abc?mode=full",
      )
      expect(iframe.getAttribute("title")).toBe("Neon Nights")
      expect(container.querySelector("img")).toBeNull()
    })

    it("should fall back to the image when there is no video url", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      const img = container.querySelector("img") as HTMLImageElement
      expect(container.querySelector("iframe")).toBeNull()
      expect(img.getAttribute("src")).toBe("/img/neon.jpg")
      expect(img.getAttribute("alt")).toBe("Neon Nights")
    })

    it("should fall back to the image when the video url is unsupported", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork({ videoUrl: "https://unknown.test/video" })}
          onClose={() => {}}
        />,
      )
      expect(container.querySelector("iframe")).toBeNull()
      expect(container.querySelector("img")).toBeTruthy()
    })

    it("should use a 16:9 frame for regular videos", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork({ videoUrl: "https://youtube.com/watch?v=abc" })}
          onClose={() => {}}
        />,
      )
      const frame = container.querySelector(".bg-black") as HTMLElement
      expect(frame.className).toContain("aspect-video")
      expect(frame.className).not.toContain("aspect-4/5")
    })

    it("should use a 4:5 frame for instagram videos", () => {
      const { container } = render(
        <WorkDialog
          work={makeWork({ videoUrl: "https://instagram.com/reel/abc" })}
          onClose={() => {}}
        />,
      )
      const frame = container.querySelector(".bg-black") as HTMLElement
      expect(frame.className).toContain("aspect-4/5")
      expect(frame.className).not.toContain("aspect-video")
    })
  })

  describe("dialog open/close", () => {
    it("should call showModal when a work is provided", () => {
      render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      expect(showModal).toHaveBeenCalledTimes(1)
    })

    it("should not call showModal when work is null", () => {
      render(
        <WorkDialog
          work={null}
          onClose={() => {}}
        />,
      )
      expect(showModal).not.toHaveBeenCalled()
    })

    it("should call close when work goes back to null", () => {
      const { rerender } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      rerender(
        <WorkDialog
          work={null}
          onClose={() => {}}
        />,
      )
      expect(closeDialog).toHaveBeenCalledTimes(1)
    })

    it("should not call showModal again if the dialog is already open", () => {
      const { rerender } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      rerender(
        <WorkDialog
          work={makeWork({ id: "other", title: "Other" })}
          onClose={() => {}}
        />,
      )
      expect(showModal).toHaveBeenCalledTimes(1)
    })

    it("should call onClose when the close button is clicked", () => {
      const onClose = mock(() => {})
      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={onClose}
        />,
      )
      fireEvent.click(getByText("Close"))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("should call onClose when the native close event fires (Esc)", () => {
      const onClose = mock(() => {})
      const { container } = render(
        <WorkDialog
          work={makeWork()}
          onClose={onClose}
        />,
      )
      fireEvent(
        container.querySelector("dialog") as HTMLDialogElement,
        new Event("close"),
      )
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("should call onClose when the backdrop (dialog itself) is clicked", () => {
      const onClose = mock(() => {})
      const { container } = render(
        <WorkDialog
          work={makeWork()}
          onClose={onClose}
        />,
      )
      fireEvent.click(container.querySelector("dialog") as HTMLDialogElement)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("should not call onClose when clicking inside the content", () => {
      const onClose = mock(() => {})
      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={onClose}
        />,
      )
      fireEvent.click(getByText("Neon Nights"))
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe("share", () => {
    it("should use navigator.share when available", async () => {
      const share = mock(() => Promise.resolve())
      const writeText = mock(() => Promise.resolve())
      stubNavigator({ share, clipboard: { writeText } })

      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      await act(async () => {
        fireEvent.click(getByText("Share"))
      })

      expect(share).toHaveBeenCalledWith({
        title: "Neon Nights",
        url: expectedUrl("neon-nights"),
      })
      expect(writeText).not.toHaveBeenCalled()
      expect(getByText("Share")).toBeTruthy()
    })

    it("should swallow errors when the share sheet is dismissed", async () => {
      const share = mock(() => Promise.reject(new Error("AbortError")))
      const writeText = mock(() => Promise.resolve())
      stubNavigator({ share, clipboard: { writeText } })

      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      await act(async () => {
        fireEvent.click(getByText("Share"))
      })

      expect(share).toHaveBeenCalledTimes(1)
      expect(writeText).not.toHaveBeenCalled()
      expect(getByText("Share")).toBeTruthy()
    })

    it("should copy the link to the clipboard when share is unavailable", async () => {
      const writeText = mock(() => Promise.resolve())
      stubNavigator({ share: undefined, clipboard: { writeText } })

      const { getByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      await act(async () => {
        fireEvent.click(getByText("Share"))
      })

      expect(writeText).toHaveBeenCalledWith(expectedUrl("neon-nights"))
    })

    it("should show the copied label and reset it after 2 seconds", async () => {
      const writeText = mock(() => Promise.resolve())
      stubNavigator({ share: undefined, clipboard: { writeText } })

      const { getByText, queryByText } = render(
        <WorkDialog
          work={makeWork()}
          onClose={() => {}}
        />,
      )
      await act(async () => {
        fireEvent.click(getByText("Share"))
      })

      expect(getByText("Copied")).toBeTruthy()
      expect(queryByText("Share")).toBeNull()
      expect(resetCallbacks).toHaveLength(1)

      act(() => {
        resetCallbacks[0]()
      })

      expect(getByText("Share")).toBeTruthy()
      expect(queryByText("Copied")).toBeNull()
    })
  })
})
