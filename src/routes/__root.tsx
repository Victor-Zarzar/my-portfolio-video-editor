import { Button } from "@base-ui/react/button"
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router"
import { type ReactNode, useEffect } from "react"
import { SEO_CONFIG, SITE_NAME, SITE_URL } from "#/config/app-config"
import { GA_MEASUREMENT_ID } from "#/lib/analytics"
import { reportAppError } from "#/lib/error-reporting"
import { m } from "#/paraglide/messages"
import { ThemeProvider } from "#/shared/common/theme-provider.tsx"
import {
  CookieConsent,
  getCookieConsentFn,
} from "#/shared/features/cookie-consent.tsx"
import { DevToolsGuard } from "#/shared/guard/dev-tools-guard"
import { Toaster } from "#/shared/ui/sonner"
import { getLocale } from "../paraglide/runtime.js"
import appCss from "../styles.css?url"

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xla font-bold text-foreground">
          {m.not_found_title()}
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {m.not_found_heading()}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {m.not_found_text()}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {m.not_found_cta()}
          </Link>
        </div>
      </div>
    </div>
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)
  const router = useRouter()
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" })
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {m.error_heading()}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{m.error_text()}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate()
              reset()
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {m.error_retry()}
          </Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {m.error_home()}
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: async () => {
      const cookieConsent = await getCookieConsentFn()
      return { cookieConsent }
    },
    head: ({ matches, loaderData }) => {
      const pathname = matches[matches.length - 1]?.pathname ?? "/"
      const canonical =
        pathname === "/" ? SITE_URL || "/" : `${SITE_URL}${pathname}`
      const ogImage = `${SITE_URL}${SEO_CONFIG.images.ogImage}`
      const gaConsented = loaderData?.cookieConsent === "accepted"

      return {
        meta: [
          { charSet: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { title: m.seo_title() },
          { name: "description", content: m.seo_description() },
          { name: "author", content: SITE_NAME },
          { name: "robots", content: SEO_CONFIG.robots.meta },

          // Open Graph
          { property: "og:title", content: m.seo_title() },
          { property: "og:description", content: m.seo_description() },
          { property: "og:image", content: ogImage },
          { property: "og:type", content: "website" },
          ...(SITE_URL ? [{ property: "og:url", content: canonical }] : []),

          // Twitter Card
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: m.seo_title() },
          { name: "twitter:description", content: m.seo_description() },
          { name: "twitter:image", content: ogImage },
          ...(SEO_CONFIG.twitterHandle
            ? [{ name: "twitter:site", content: SEO_CONFIG.twitterHandle }]
            : []),
        ],
        links: [
          ...(SITE_URL ? [{ rel: "canonical", href: canonical }] : []),
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
          },
          { rel: "stylesheet", href: appCss },
          { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        ],
        scripts:
          gaConsented && GA_MEASUREMENT_ID
            ? [
                {
                  src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
                  async: true,
                },
                {
                  id: "ga-gtag-inline",
                  children: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
                  `,
                },
              ]
            : [],
      }
    },
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  }
)

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html
      lang={getLocale()}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext()
  const { cookieConsent } = Route.useLoaderData()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="theme"
      >
        <DevToolsGuard unauthorizedPath="/unauthorized" />
        <Toaster
          position="top-right"
          expand={true}
        />
        <Outlet />
        <CookieConsent initialConsent={cookieConsent} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
