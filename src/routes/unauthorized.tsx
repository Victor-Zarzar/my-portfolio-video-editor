import { createFileRoute, Link } from "@tanstack/react-router"
import { useI18n } from "#/i18n"

export const Route = createFileRoute("/unauthorized")({
  component: UnauthorizedPage,
})

function UnauthorizedPage() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">
          {t.unauthorized.title}
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t.unauthorized.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.unauthorized.text}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.unauthorized.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
