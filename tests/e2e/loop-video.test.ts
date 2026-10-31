import { expect, type Locator, test } from "@playwright/test"

const isPaused = (video: Locator) =>
  video.evaluate((v) => (v as HTMLVideoElement).paused)

test.describe("Loop video", () => {
  test("should render a muted, looping, inline video", async ({ page }) => {
    await page.goto("/en")
    const video = page.getByTestId("loop-video")

    await expect(video).toHaveCount(1)
    await expect(video).toHaveJSProperty("muted", true)
    await expect(video).toHaveJSProperty("loop", true)
    await expect(video).toHaveAttribute("playsinline", "")
    await expect(video).toHaveAttribute("aria-hidden", "true")
    await expect(video).toHaveAttribute("poster", /vinyl-poster\.jpg$/)
  })

  test("should offer webm first and mp4 as fallback", async ({ page }) => {
    await page.goto("/en")
    const sources = page.getByTestId("loop-video").locator("source")

    await expect(sources).toHaveCount(2)
    await expect(sources.nth(0)).toHaveAttribute("type", "video/webm")
    await expect(sources.nth(0)).toHaveAttribute("src", /vinyl\.webm$/)
    await expect(sources.nth(1)).toHaveAttribute("type", "video/mp4")
    await expect(sources.nth(1)).toHaveAttribute("src", /vinyl\.mp4$/)
  })

  test("should stay paused until it scrolls into view", async ({ page }) => {
    await page.goto("/en")
    await page.waitForLoadState("networkidle")
    const video = page.getByTestId("loop-video")

    expect(await isPaused(video)).toBe(true)
  })

  test("should play when in view and pause when scrolled away", async ({
    page,
  }) => {
    await page.goto("/en")
    await page.waitForLoadState("networkidle")
    const video = page.getByTestId("loop-video")

    await video.scrollIntoViewIfNeeded()
    await expect.poll(() => isPaused(video), { timeout: 10_000 }).toBe(false)

    await page.evaluate(() => window.scrollTo(0, 0))
    await expect.poll(() => isPaused(video), { timeout: 5_000 }).toBe(true)
  })

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" })

    test("should never autoplay", async ({ page }) => {
      await page.goto("/en")
      await page.waitForLoadState("networkidle")
      const video = page.getByTestId("loop-video")

      await video.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      expect(await isPaused(video)).toBe(true)
      await expect(video).toHaveJSProperty("muted", true)
    })
  })
})
