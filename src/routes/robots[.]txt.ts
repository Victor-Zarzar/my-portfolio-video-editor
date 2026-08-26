import { createFileRoute } from "@tanstack/react-router"

import { env } from "@/env"

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${new URL("/sitemap.xml", env.VITE_APP_URL).href}
`

        return new Response(robotsTxt, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        })
      },
    },
  },
})
