import * as Sentry from "@sentry/tanstackstart-react"
import { env } from "./env"

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
})
