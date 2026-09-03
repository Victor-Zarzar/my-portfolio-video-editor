import { Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getCookie, setCookie } from "@tanstack/react-start/server"
import { useEffect, useState } from "react"
import {
  GA_MEASUREMENT_ID,
  loadGoogleAnalytics,
  removeGoogleAnalytics,
} from "#/lib/analytics"
import { useI18n } from "../../i18n"
import type { CookieConsentValue } from "../types/main"

const COOKIE_NAME = "cookie_consent"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export const getCookieConsentFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const value = getCookie(COOKIE_NAME)
    return (value as CookieConsentValue | undefined) ?? null
  }
)

const setCookieConsentFn = createServerFn({ method: "POST" })
  .validator((value: CookieConsentValue) => value)
  .handler(async ({ data }) => {
    setCookie(COOKIE_NAME, data, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    })
    return { success: true }
  })

export function CookieConsent({
  initialConsent,
}: {
  initialConsent: CookieConsentValue | null
}) {
  const { t } = useI18n()
  const [consent, setConsent] = useState(initialConsent)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    if (consent === "accepted" && GA_MEASUREMENT_ID) {
      loadGoogleAnalytics(GA_MEASUREMENT_ID)
    }
  }, [consent])

  if (consent) return null

  async function handleChoice(value: CookieConsentValue) {
    setIsPending(true)
    try {
      await setCookieConsentFn({ data: value })
      setConsent(value)
      if (value === "accepted" && GA_MEASUREMENT_ID) {
        loadGoogleAnalytics(GA_MEASUREMENT_ID)
      } else {
        removeGoogleAnalytics()
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-input bg-background/95 px-4 py-4 backdrop-blur supports-backdrop-filter:bg-background/80 dark:bg-background dark:backdrop-blur-none dark:supports-backdrop-filter:bg-background sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          {t.cookieConsent.message}{" "}
          <Link
            to="/privacy-policy"
            className="text-foreground underline underline-offset-2 hover:text-primary"
          >
            {t.cookieConsent.privacyLink}
          </Link>
        </p>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleChoice("declined")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
          >
            {t.cookieConsent.decline}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleChoice("accepted")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
