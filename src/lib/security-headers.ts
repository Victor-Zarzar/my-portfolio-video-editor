import { createMiddleware } from "@tanstack/react-start"
import {
  getResponseHeaders,
  setResponseHeaders,
} from "@tanstack/react-start/server"

export const securityHeadersMiddleware = createMiddleware().server(
  ({ next }) => {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "worker-src 'self' blob:",
      "connect-src 'self' https: wss:",
      "frame-src 'self' https:",
      "upgrade-insecure-requests",
    ]
      .join("; ")
      .replace(/\s{2,}/g, " ")
      .trim()

    const headers = getResponseHeaders()
    headers.set("Content-Security-Policy", csp)
    headers.set("X-Frame-Options", "DENY")
    headers.set("X-Content-Type-Options", "nosniff")
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), browsing-topics=()"
    )
    headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    )
    setResponseHeaders(headers)

    return next()
  }
)
