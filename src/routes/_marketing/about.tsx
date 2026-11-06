import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { AboutSection } from "#/shared/layout/about-section"
import { portrait } from "#/shared/lib/portrait"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/about")({
  head: () => ({
    meta: pageSeo({
      title: m.seo_about_title(),
      description: m.seo_about_description(),
    }),
    links: [
      {
        rel: "preload",
        as: "image",
        href: portrait.src,
        imageSrcSet: portrait.srcSet,
        imageSizes: portrait.sizes,
        fetchPriority: "high",
      },
    ],
  }),
  component: () => (
    <main>
      <AboutSection />
    </main>
  ),
})
