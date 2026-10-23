import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
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
  runtimeEnv: process.env,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
})
