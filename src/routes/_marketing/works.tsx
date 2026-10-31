import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { getWorks } from "#/shared/data/works-data"
import { WorksSection } from "#/shared/layout/works-section"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/works")({
  head: () => {
    const works = getWorks()
    const [first] = works

    return {
      meta: pageSeo({
        title: m.seo_works_title(),
        description: m.seo_works_description(),
      }),
      links: [
        {
          rel: "preload",
          as: "image",
          href: first.src,
          imageSrcSet: first.srcSet,
          imageSizes:
            "(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw",
          fetchPriority: "high",
        },
        // Warm-up dos hosts de embed: o handshake acontece antes do clique
        { rel: "preconnect", href: "https://www.instagram.com" },
        { rel: "preconnect", href: "https://www.youtube-nocookie.com" },
        { rel: "preconnect", href: "https://player.vimeo.com" },
        // Thumbs/assets que os players costumam puxar
        { rel: "dns-prefetch", href: "https://i.ytimg.com" },
        { rel: "dns-prefetch", href: "https://static.cdninstagram.com" },
        { rel: "dns-prefetch", href: "https://f.vimeocdn.com" },
      ],
    }
  },
  component: () => (
    <main>
      <WorksSection />
    </main>
  ),
})
