import type { AnyRoute } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"
import { SITE_URL } from "#/config/app-config"
import { locales, localizeUrl } from "#/paraglide/runtime"
import { routeTree } from "@/routeTree.gen"

const ROUTE_BLACKLIST = new Set<string>([
  "/unauthorized", // error page
])

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = getRoutePaths(routeTree)
        const lastmod = new Date().toISOString().split("T")[0]
        const uniquePaths = [...new Set(paths.filter(shouldIncludeInSitemap))]

        const blocks = uniquePaths.flatMap((path) => {
          const baseUrl = `${SITE_URL}${path === "/" ? "" : path}`
          const alternates = locales.map((locale) => ({
            locale,
            href: localizeUrl(baseUrl, { locale }).href,
          }))

          return alternates.map(
            ({ href }) => `  <url>
    <loc>${escapeXml(href)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${alternates
  .map(
    (alt) =>
      `    <xhtml:link rel="alternate" hreflang="${alt.locale}" href="${escapeXml(alt.href)}" />`
  )
  .join("\n")}
  </url>`
          )
        })

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join("\n")}
</urlset>`

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        })
      },
    },
  },
})

function getRoutePaths(node: AnyRoute, acc: string[] = []): string[] {
  if (node?.fullPath) acc.push(node.fullPath)
  for (const child of Object.values(node?.children ?? {})) {
    getRoutePaths(child as AnyRoute, acc)
  }
  return acc
}

function shouldIncludeInSitemap(path: string): boolean {
  if (ROUTE_BLACKLIST.has(path)) return false
  if (path.includes(".")) return false
  if (path.includes("$") || path.includes(":")) return false
  if (path.includes("_")) return false
  return true
}

const AMPERSAND_REGEX = /&/g
const LT_REGEX = /</g
const GT_REGEX = />/g
const QUOTE_REGEX = /"/g
const APOS_REGEX = /'/g

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(AMPERSAND_REGEX, "&amp;")
    .replace(LT_REGEX, "&lt;")
    .replace(GT_REGEX, "&gt;")
    .replace(QUOTE_REGEX, "&quot;")
    .replace(APOS_REGEX, "&apos;")
}
