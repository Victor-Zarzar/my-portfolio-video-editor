import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { AboutSection } from "#/shared/layout/about-section"
import { pageSeo } from "#/shared/lib/seo"
import portraitSrcSet from "@/assets/portrait.jpg?w=480;800;1200&format=webp&as=srcset"
import portraitImg from "@/assets/portrait.jpg?w=800&format=webp"

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
        href: portraitImg,
        imageSrcSet: portraitSrcSet,
        imageSizes: "(min-width: 768px) 540px, 100vw",
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
