import * as Sentry from "@sentry/tanstackstart-react"
import { env } from "./env/server"

Sentry.init({
  dsn: env.SENTRY_DSN,
  dataCollection: {
    // userInfo: false,
    // httpBodies: [],
  },
  tracesSampleRate: 1.0,
})
