import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { WorksSection } from "#/shared/layout/works-section"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/works")({
  head: () => ({
    meta: pageSeo({
      title: m.seo_works_title(),
      description: m.seo_works_description(),
    }),
  }),
  component: () => (
    <main>
      <WorksSection />
    </main>
  ),
})
