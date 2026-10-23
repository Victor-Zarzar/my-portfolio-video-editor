import { expect, test } from "@playwright/test"

test.describe("Home", () => {
  test("should render hero with works link", async ({ page }) => {
    await page.goto("/en")
    const hero = page.getByTestId("hero")
    const worksLink = hero.getByRole("link", { name: /work/i })
    await expect(hero).toBeVisible()
    await expect(worksLink).toBeVisible()
    await expect(worksLink).toHaveAttribute("href", /\/works$/)
  })

  test("should navigate to works page", async ({ page }) => {
    await page.goto("/en")
    const hero = page.getByTestId("hero")
    const worksLink = hero.getByRole("link", { name: /work/i })
    await worksLink.click()
    await expect(page).toHaveURL(/\/works$/)
  })

  test("should render cookie consent with privacy policy link", async ({
    page,
  }) => {
    await page.goto("/en")
    const consent = page.getByTestId("cookie-consent")
    const privacyLink = consent.getByRole("link", { name: /privacy/i })
    await expect(privacyLink).toBeVisible()
    await expect(privacyLink).toHaveAttribute("href", /\/privacy-policy$/)
  })

  test("should hide cookie consent after accepting", async ({ page }) => {
    await page.goto("/en")
    await page.waitForLoadState("networkidle")
    const acceptButton = page.getByRole("button", { name: /accept/i })
    await expect(acceptButton).toBeVisible()
    await acceptButton.click()
    await expect(acceptButton).toBeHidden()
  })
})
