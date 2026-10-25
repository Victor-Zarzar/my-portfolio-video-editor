import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { getWorks } from "#/shared/data/works-data"
import { Image } from "../features/image-hero"

const FEATURED_COUNT = 2

export function WorksTeaser() {
  const featured = getWorks().slice(0, FEATURED_COUNT)

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
            key={work.id}
            className="group relative aspect-video overflow-hidden border border-border/60"
          >
            <Image
              src={work.src}
              srcSet={work.srcSet}
              sizes="(min-width: 896px) 412px, (min-width: 640px) 50vw, 100vw"
              alt={work.title}
              width={1024}
              height={768}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                {work.year} · {work.kind}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {work.title}
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
