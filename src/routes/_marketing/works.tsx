import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { getWorks } from "#/shared/data/works-data"
import { WorksSection } from "#/shared/layout/works-section"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/works")({
  head: () => {
    const [first] = getWorks()

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
      ],
    }
  },
  component: () => (
    <main>
      <WorksSection />
    </main>
  ),
})
