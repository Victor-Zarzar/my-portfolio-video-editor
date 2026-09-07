import { createFileRoute } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { ContactSection } from "#/shared/layout/contact-section"
import { pageSeo } from "#/shared/lib/seo"

export const Route = createFileRoute("/_marketing/contact")({
  head: () => ({
    meta: pageSeo({
      title: m.seo_contact_title(),
      description: m.seo_contact_description(),
    }),
  }),
  component: () => (
    <main>
      <ContactSection />
    </main>
  ),
})
