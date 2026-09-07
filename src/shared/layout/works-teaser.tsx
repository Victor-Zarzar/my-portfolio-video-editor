import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { worksData } from "#/shared/data/works-data"

const workMessages = [
  { title: m.works_item_1_title, kind: m.works_item_1_kind },
  { title: m.works_item_2_title, kind: m.works_item_2_kind },
  { title: m.works_item_3_title, kind: m.works_item_3_kind },
  { title: m.works_item_4_title, kind: m.works_item_4_kind },
]

const FEATURED_COUNT = 2

export function WorksTeaser() {
  const featured = worksData
    .slice(0, FEATURED_COUNT)
    .map((data, i) => ({ ...data, ...workMessages[i] }))

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
          {m.works_teaser_heading()}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {m.works_teaser_text()}
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {featured.map((work) => (
          <div
            key={work.title()}
            className="group relative aspect-video overflow-hidden border border-border/60"
          >
            <img
              src={work.image}
              alt={work.title()}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                {work.year} · {work.kind()}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {work.title()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
        >
          {m.works_teaser_cta()}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
