import { createFileRoute, Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const sections = [
    {
      title: m.privacy_policy_information_collected_title(),
      text: m.privacy_policy_information_collected_description(),
    },
    {
      title: m.privacy_policy_how_we_use_title(),
      text: m.privacy_policy_how_we_use_description(),
    },
    {
      title: m.privacy_policy_data_sharing_title(),
      text: m.privacy_policy_data_sharing_description(),
    },
    {
      title: m.privacy_policy_cookies_title(),
      text: m.privacy_policy_cookies_description(),
    },
    {
      title: m.privacy_policy_rights_title(),
      text: m.privacy_policy_rights_description(),
    },
    {
      title: m.privacy_policy_changes_title(),
      text: m.privacy_policy_changes_description(),
    },
    {
      title: m.privacy_policy_contact_title(),
      text: m.privacy_policy_contact_description(),
    },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {m.privacy_policy_h1()}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {m.privacy_policy_p()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {m.privacy_policy_h2()}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h3 className="text-base font-semibold text-foreground">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {m.not_found_cta()}
          </Link>
        </div>
      </div>
    </div>
  )
}
