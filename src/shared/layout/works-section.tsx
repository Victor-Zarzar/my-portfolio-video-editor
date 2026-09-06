import { m } from "#/paraglide/messages"
import work1 from "@/assets/work-1.jpg"
import work2 from "@/assets/work-2.jpg"
import work3 from "@/assets/work-3.jpg"
import work4 from "@/assets/work-4.jpg"

const workImages = [work1, work2, work3, work4]
const workYears = ["2026", "2025", "2025", "2024"]

export function WorksSection() {
  const works = [
    { title: m.works_item_1_title(), kind: m.works_item_1_kind() },
    { title: m.works_item_2_title(), kind: m.works_item_2_kind() },
    { title: m.works_item_3_title(), kind: m.works_item_3_kind() },
    { title: m.works_item_4_title(), kind: m.works_item_4_kind() },
  ]

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
            key={w.title}
            className="frame-card group overflow-hidden"
          >
            <div className="grain-overlay overflow-hidden">
              <img
                src={workImages[i]}
                alt={`${m.works_frame_alt()} ${w.title}`}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-4/3 w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.kind}</p>
              </div>
              <span className="text-xs tracking-[0.18em] text-gold">
                {workYears[i]}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
