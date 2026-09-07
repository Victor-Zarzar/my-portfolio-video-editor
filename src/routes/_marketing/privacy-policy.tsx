import { createFileRoute } from "@tanstack/react-router"
import { PrivacyPolicySection } from "#/shared/layout/privacy-policy-section"

export const Route = createFileRoute("/_marketing/privacy-policy")({
  component: () => (
    <main>
      <PrivacyPolicySection />
    </main>
  ),
})
