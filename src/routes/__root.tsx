import { type QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import type { ReactNode } from "react"
import { SEO_CONFIG, SITE_NAME, SITE_URL } from "#/config/app-config"
import { m } from "#/paraglide/messages"
import { FilmFilter } from "#/shared/common/film-filter.tsx"
import { ThemeProvider } from "#/shared/common/theme-provider.tsx"
import {
  CookieConsent,
  getCookieConsentFn,
} from "#/shared/features/cookie-consent.tsx"
import { DevToolsGuard } from "#/shared/guard/dev-tools-guard"
import { ErrorFallback } from "#/shared/layout/error-fallback"
import { NotFound } from "#/shared/layout/not-found"
import { GA_MEASUREMENT_ID } from "#/shared/lib/analytics.js"
import { buildLocaleLinks } from "#/shared/lib/seo"
import { Toaster } from "#/shared/ui/sonner"
import { getLocale } from "../paraglide/runtime.js"
import appCss from "../styles.css?url"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: async () => {
      const cookieConsent = await getCookieConsentFn()
      return { cookieConsent }
    },
    head: ({ matches, loaderData }) => {
      const pathname = matches[matches.length - 1]?.pathname ?? "/"
      const { canonical, alternates } = buildLocaleLinks(pathname, getLocale())
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
          { property: "og:title", content: m.seo_title() },
          { property: "og:description", content: m.seo_description() },
          { property: "og:image", content: ogImage },
          { property: "og:type", content: "website" },
          { property: "og:url", content: canonical },
          { property: "og:locale", content: getLocale() },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: m.seo_title() },
          { name: "twitter:description", content: m.seo_description() },
          { name: "twitter:image", content: ogImage },
          ...(SEO_CONFIG.twitterHandle
            ? [{ name: "twitter:site", content: SEO_CONFIG.twitterHandle }]
            : []),
        ],
        links: [
          { rel: "canonical", href: canonical },
          ...alternates,
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
    notFoundComponent: NotFound,
    errorComponent: ErrorFallback,
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
        <FilmFilter />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
