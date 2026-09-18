import { createFileRoute } from "@tanstack/react-router"
import { TermsOfServiceSection } from "#/shared/layout/terms-of-service-section"

export const Route = createFileRoute("/_marketing/terms-of-service")({
  component: () => (
    <main>
      <TermsOfServiceSection />
    </main>
  ),
})
