import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_APP_URL: z.url(),
    VITE_SENTRY_DSN: z.url().optional(),
    VITE_SITE_EMAIL: z.email(),
    VITE_RECAPTCHA_SITE_KEY: z.string().min(1),
    VITE_DISABLE_DEVTOOLS: z.string().optional(),
    VITE_GA_MEASUREMENT_ID: z.string().min(1),
  },
  server: {
    SENTRY_DSN: z.url().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    RESEND_API_KEY: z.string().min(1),
    SLACK_WEBHOOK_URL: z.url(),
    CONTACT_FROM_EMAIL: z.email(),
    CONTACT_TO_EMAIL: z.email(),
    GOOGLE_RECAPTCHA_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: {
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    VITE_SITE_EMAIL: import.meta.env.VITE_SITE_EMAIL,
    VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    VITE_DISABLE_DEVTOOLS: import.meta.env.VITE_DISABLE_DEVTOOLS,
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
  emptyStringAsUndefined: true,
})
