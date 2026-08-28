import * as Sentry from "@sentry/tanstackstart-react"
import { env } from "./env"

Sentry.init({
  dsn: env.SENTRY_DSN,
  dataCollection: {
    // userInfo: false,
    // httpBodies: [],
  },
  enableLogs: true,
  tracesSampleRate: 1.0,
})
