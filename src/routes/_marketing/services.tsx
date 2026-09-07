import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { ServicesSection } from "#/shared/layout/services-section"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/services")({
  head: () => ({
    meta: pageSeo({
      title: m.seo_services_title(),
      description: m.seo_services_description(),
    }),
  }),
  component: () => (
    <main>
      <ServicesSection />
    </main>
  ),
})
