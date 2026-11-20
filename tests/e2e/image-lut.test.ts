import { expect, type Locator, type Page, test } from "@playwright/test"

const getSlider = (page: Page) =>
  page.getByRole("slider", { name: /S-Log3/i })
const getDivider = (page: Page) => page.getByTestId("lut-divider")

const readPos = (slider: Locator) =>
  slider.evaluate((el) =>
    Number.parseFloat((el as HTMLElement).style.getPropertyValue("--pos")),
  )

async function openLut(page: Page) {
  await page.goto("/en")
  await page.waitForLoadState("networkidle")
  const slider = getSlider(page)
  await slider.scrollIntoViewIfNeeded()
  await expect(slider).toBeVisible()
  const box = await slider.boundingBox()
  if (!box) throw new Error("slider has no bounding box")
  return { slider, box, divider: getDivider(page) }
}

// posição horizontal da divisória como % da largura do slider
async function dividerPercent(divider: Locator, box: { x: number; width: number }) {
  const d = await divider.boundingBox()
  if (!d) throw new Error("divider has no bounding box")
  return ((d.x - box.x) / box.width) * 100
}

test.describe("Image LUT slider", () => {
  test("should render both images with real content", async ({ page }) => {
    const { slider } = await openLut(page)

    const log = page.getByAltText(/without LUT/i)
    const graded = page.getByAltText(/custom LUT applied/i)
    await expect(log).toBeVisible()
    await expect(graded).toBeVisible()

    for (const img of [log, graded]) {
      await expect
        .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0)
    }

    await expect(slider.getByText("S-Log3", { exact: true })).toBeVisible()
    await expect(slider.getByText(/LUT 03/)).toBeVisible()
  })

  test("should expose accessible slider semantics", async ({ page }) => {
    const { slider } = await openLut(page)

    await expect(slider).toHaveAttribute("aria-valuemin", "0")
    await expect(slider).toHaveAttribute("aria-valuemax", "100")
    await expect(slider).toHaveAttribute("aria-valuenow", "50")
    await expect(slider).toHaveAttribute("tabindex", "0")
  })

  test("should render with the divider fixed at the center", async ({ page }) => {
    const { slider, box, divider } = await openLut(page)

    expect(await readPos(slider)).toBe(50)
    expect(await dividerPercent(divider, box)).toBeCloseTo(50, 0)
  })

  test("should not move on hover", async ({ page }) => {
    const { slider, box } = await openLut(page)

    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2)
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, {
      steps: 8,
    })
    await page.waitForTimeout(400)

    expect(await readPos(slider)).toBe(50)
    await expect(slider).toHaveAttribute("aria-valuenow", "50")
  })

  test("should jump to the clicked point", async ({ page }) => {
    const { slider, box, divider } = await openLut(page)

    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2)

    await expect.poll(() => readPos(slider)).toBeCloseTo(25, 0)
    await expect
      .poll(() => dividerPercent(divider, box))
      .toBeGreaterThan(24)
    await expect(slider).toHaveAttribute("aria-valuenow", "25")
  })

  test("should follow the mouse while dragging", async ({ page }) => {
    const { slider, box, divider } = await openLut(page)
    const y = box.y + box.height / 2

    await page.mouse.move(box.x + box.width * 0.5, y)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.8, y, { steps: 12 })
    await page.mouse.up()

    await expect.poll(() => readPos(slider)).toBeCloseTo(80, 0)
    expect(await dividerPercent(divider, box)).toBeCloseTo(80, 0)
  })

  test("should keep the position after release and when the mouse leaves", async ({
    page,
  }) => {
    const { slider, box } = await openLut(page)
    const y = box.y + box.height / 2

    await page.mouse.click(box.x + box.width * 0.7, y)
    await expect.poll(() => readPos(slider)).toBeCloseTo(70, 0)

    await page.mouse.move(box.x + box.width / 2, box.y - 80, { steps: 5 })
    await page.waitForTimeout(400)

    expect(await readPos(slider)).toBeCloseTo(70, 0)
  })

  test("should keep dragging when the cursor leaves the image", async ({
    page,
  }) => {
    const { slider, box } = await openLut(page)
    const y = box.y + box.height / 2

    await page.mouse.move(box.x + box.width * 0.5, y)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.9, y, { steps: 6 })
    await page.mouse.move(box.x + box.width * 0.9, box.y - 100, { steps: 6 })
    await page.mouse.up()

    await expect.poll(() => readPos(slider)).toBeCloseTo(90, 0)
  })

  test("should be controllable with the keyboard", async ({ page }) => {
    const { slider } = await openLut(page)

    await slider.focus()
    await page.keyboard.press("ArrowRight")
    await expect(slider).toHaveAttribute("aria-valuenow", "54")

    await page.keyboard.press("Shift+ArrowLeft")
    await expect(slider).toHaveAttribute("aria-valuenow", "44")

    await page.keyboard.press("Home")
    await expect(slider).toHaveAttribute("aria-valuenow", "0")

    await page.keyboard.press("End")
    await expect(slider).toHaveAttribute("aria-valuenow", "100")
    await expect.poll(() => readPos(slider)).toBe(100)
  })

  test("should be reachable with Tab", async ({ page }) => {
    await openLut(page)
    const slider = getSlider(page)

    await slider.focus()
    await expect(slider).toBeFocused()
  })

  test.describe("touch", () => {
    test.use({ hasTouch: true, viewport: { width: 390, height: 844 } })

    test("should move on tap", async ({ page }) => {
      const { slider, box } = await openLut(page)

      await page.touchscreen.tap(
        box.x + box.width * 0.75,
        box.y + box.height / 2,
      )

      await expect.poll(() => readPos(slider)).toBeCloseTo(75, 0)
    })
  })

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" })

    test("should move without animating", async ({ page }) => {
      const { slider, box, divider } = await openLut(page)

      await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2)
      await expect.poll(() => readPos(slider)).toBeCloseTo(25, 0)

      const property = await divider.evaluate(
        (el) => getComputedStyle(el).transitionProperty,
      )
      expect(property).toBe("none")
    })
  })
})
