import { env } from "#/env"

export const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function loadGoogleAnalytics(measurementId: string) {
  if (typeof window === "undefined") return
  if (document.getElementById("ga-gtag-script")) return

  const script = document.createElement("script")
  script.id = "ga-gtag-script"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag("js", new Date())
  window.gtag("config", measurementId, { anonymize_ip: true })
}

export function removeGoogleAnalytics() {
  if (typeof window === "undefined") return
  document.getElementById("ga-gtag-script")?.remove()
  window.dataLayer = []
}

export function trackPageview(url: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID)
    return
  window.gtag("event", "page_view", { page_path: url })
}
