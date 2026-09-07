import { Link } from "@tanstack/react-router"
import { SITE_EMAIL } from "#/config/app-config"
import { m } from "#/paraglide/messages"

export function ContactTeaser() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex flex-col gap-8 border border-border/60 bg-muted p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {m.contact_teaser_label()}
            </span>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight uppercase text-foreground sm:text-4xl">
              {m.contact_teaser_heading()}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {m.contact_teaser_text()}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="inline-flex items-center justify-center border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              {m.contact_teaser_email_cta()}
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
            >
              {m.contact_teaser_page_cta()}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
