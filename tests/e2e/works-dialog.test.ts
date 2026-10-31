import { expect, type Page, test } from "@playwright/test"

const workDialog = (page: Page) => page.locator('[data-slot="dialog-content"]')
const dialogTitle = (dialog: ReturnType<typeof workDialog>) =>
  dialog.locator('[data-slot="dialog-title"]')

async function openFirstWork(page: Page) {
  await page.goto("/en/works")
  await page.waitForLoadState("networkidle")
  await page.locator("#works article").first().getByRole("button").click()

  const dialog = workDialog(page)
  await expect(dialog).toBeVisible()
  return dialog
}

test.describe("Works dialog", () => {
  test("should open the dialog when clicking a work card", async ({ page }) => {
    const dialog = await openFirstWork(page)

    await expect(dialogTitle(dialog)).toBeVisible()
    await expect(dialog.locator("img").first()).toBeVisible()
  })

  test("should show the same title as the clicked card", async ({ page }) => {
    await page.goto("/en/works")
    await page.waitForLoadState("networkidle")

    const card = page.locator("#works article").first()
    const title = await card.getByRole("heading", { level: 3 }).innerText()
    await card.getByRole("button").click()

    const dialog = workDialog(page)
    await expect(dialogTitle(dialog)).toHaveText(title)
  })

  test("should close the dialog with the close button", async ({ page }) => {
    const dialog = await openFirstWork(page)

    await dialog.getByRole("button", { name: /close/i }).click()
    await expect(dialog).toBeHidden()
  })

  test("should close the dialog with the Escape key", async ({ page }) => {
    const dialog = await openFirstWork(page)

    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })

  test("should close the dialog when clicking the backdrop", async ({
    page,
  }) => {
    const dialog = await openFirstWork(page)

    await page.mouse.click(5, 5)
    await expect(dialog).toBeHidden()
  })

  test("should keep the dialog open when clicking inside the content", async ({
    page,
  }) => {
    const dialog = await openFirstWork(page)

    await dialogTitle(dialog).click()
    await expect(dialog).toBeVisible()
  })

  test("should be reopenable after closing", async ({ page }) => {
    const dialog = await openFirstWork(page)
    await dialog.getByRole("button", { name: /close/i }).click()
    await expect(dialog).toBeHidden()

    await page.locator("#works article").first().getByRole("button").click()
    await expect(workDialog(page)).toBeVisible()
  })

  test("should use the native share sheet when available", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __shared: unknown[] }
      w.__shared = []
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: (data: unknown) => {
          w.__shared.push(data)
          return Promise.resolve()
        },
      })
    })

    const dialog = await openFirstWork(page)
    await dialog.getByRole("button", { name: /share/i }).click()

    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { __shared: unknown[] }).__shared.length,
        ),
      )
      .toBe(1)

    const [payload] = await page.evaluate(
      () =>
        (window as unknown as { __shared: { title: string; url: string }[] })
          .__shared,
    )
    expect(payload.title).toBeTruthy()
    expect(payload.url).toMatch(/\/works#.+$/)
  })

  test("should copy the link and reset the label when share is unavailable", async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "clipboard permissions are chromium-only",
    )

    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: undefined,
      })
    })

    const dialog = await openFirstWork(page)
    await dialog.getByRole("button", { name: /share/i }).click()

    await expect(dialog.getByRole("button", { name: /copied/i })).toBeVisible()
    const clipboard = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboard).toMatch(/\/works#.+$/)

    await expect(dialog.getByRole("button", { name: /share/i })).toBeVisible({
      timeout: 4000,
    })
  })
})
