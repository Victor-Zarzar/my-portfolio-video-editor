import { m } from "#/paraglide/messages"
import { getWorks } from "#/shared/data/works-data"
import { Image } from "../features/image-hero"

export function WorksSection() {
  const works = getWorks()

  return (
    <section
      id="works"
      className="mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{m.works_eyebrow()}</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            {m.works_title()}
          </h2>
        </div>
        <span className="hidden text-xs tracking-[0.18em] uppercase text-muted-foreground sm:block">
          {m.works_range()}
        </span>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {works.map((w, i) => (
          <article
            key={w.id}
            className="frame-card group overflow-hidden"
          >
            <div className="grain-overlay overflow-hidden">
              <Image
                src={w.src}
                srcSet={w.srcSet}
                sizes="(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw"
                alt={`${m.works_frame_alt()} ${w.title}`}
                width={1024}
                height={768}
                priority={i < 2}
                className="aspect-4/3 w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.kind}</p>
              </div>
              <span className="text-xs tracking-[0.18em] text-gold">
                {w.year}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
