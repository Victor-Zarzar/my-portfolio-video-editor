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
  runtimeEnv: {
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    VITE_SITE_EMAIL: import.meta.env.VITE_SITE_EMAIL,
    VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    VITE_DISABLE_DEVTOOLS: import.meta.env.VITE_DISABLE_DEVTOOLS,
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
  },
  skipValidation: import.meta.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
})
