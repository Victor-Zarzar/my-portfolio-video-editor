import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"

const highlightKeys = [
  {
    title: m.services_teaser_item_1_title,
    desc: m.services_teaser_item_1_desc,
  },
  {
    title: m.services_teaser_item_2_title,
    desc: m.services_teaser_item_2_desc,
  },
  {
    title: m.services_teaser_item_3_title,
    desc: m.services_teaser_item_3_desc,
  },
]

export function ServicesTeaser() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            {m.services_teaser_heading()}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {m.services_teaser_text()}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlightKeys.map(({ title, desc }, i) => (
            <div
              key={i}
              className="border border-border/60 p-6 text-center"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
                {title()}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">{desc()}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-block border border-gold/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            {m.services_teaser_cta()}
          </Link>
        </div>
      </div>
    </section>
  )
}
