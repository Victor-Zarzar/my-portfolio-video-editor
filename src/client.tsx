import * as Sentry from "@sentry/react"
import { StartClient } from "@tanstack/react-start/client"
import { hydrateRoot } from "react-dom/client"
import { env } from "./env"
import { initSentry } from "./sentry"

// Initialize Sentry (will be skipped if DSN is not defined)
initSentry()

// Check if Sentry DSN is defined before creating error boundary

const AppComponent = env.VITE_SENTRY_DSN
  ? Sentry.withErrorBoundary(StartClient, {
      fallback: () => (
        <div>An error has occurred. Our team has been notified.</div>
      ),
    })
  : StartClient

hydrateRoot(document, <AppComponent />)
