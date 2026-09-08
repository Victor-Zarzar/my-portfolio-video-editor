import { paraglideVitePlugin } from "@inlang/paraglide-js"
import netlify from "@netlify/vite-plugin-tanstack-start"
import { sentryVitePlugin } from "@sentry/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { z } from "zod"

const envSchema = z.object({
  VITE_APP_URL: z.url(),
  VITE_SENTRY_DSN: z.url().optional(),
  SENTRY_DSN: z.url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SLACK_WEBHOOK_URL: z.url().optional(),
  VITE_SITE_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.email(),
  CONTACT_TO_EMAIL: z.email(),
  VITE_RECAPTCHA_SITE_KEY: z.string(),
  GOOGLE_RECAPTCHA_SECRET_KEY: z.string(),
  VITE_GA_MEASUREMENT_ID: z.string(),
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  envSchema.parse(env)

  const basePlugins = [
    netlify({
      dev: { edgeFunctions: { enabled: false } },
    }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "locale",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["pt-BR", "/pt-br/:path(.*)?"],
            ["en-US", "/en/:path(.*)?"],
            ["es-ES", "/es/:path(.*)?"],
          ],
        },
      ],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ]

  if (env.SENTRY_AUTH_TOKEN) {
    basePlugins.push(
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
      })
    )
  }

  return {
    resolve: { tsconfigPaths: true },
    plugins: basePlugins,
    build: {
      sourcemap: !!env.SENTRY_AUTH_TOKEN,
    },
  }
})
