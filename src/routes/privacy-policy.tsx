import { createFileRoute, Link } from "@tanstack/react-router"
import { useI18n } from "#/i18n"

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { t } = useI18n()
  const pp = t.privacyPolicy

  const sections = [
    {
      title: pp.informationCollectedTitle,
      text: pp.informationCollectedDescription,
    },
    { title: pp.howWeUseTitle, text: pp.howWeUseDescription },
    { title: pp.dataSharingTitle, text: pp.dataSharingDescription },
    { title: pp.cookiesTitle, text: pp.cookiesDescription },
    { title: pp.rightsTitle, text: pp.rightsDescription },
    { title: pp.changesTitle, text: pp.changesDescription },
    { title: pp.contactTitle, text: pp.contactDescription },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {pp.h1}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{pp.p}</p>
          <p className="mt-1 text-xs text-muted-foreground">{pp.h2}</p>
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
            {t.notFound.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
