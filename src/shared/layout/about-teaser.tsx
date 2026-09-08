import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"

const software = [
  "Final Cut Pro",
  "DaVinci Resolve",
  "VN Editor",
  "Lightroom",
  "Frame.io",
  "Luna DAW",
  "Moises AI",
]
const systems = ["macOS", "Ubuntu Studio"]

export function AboutTeaser() {
  return (
    <section className="px-6 py-24 border-y border-border/60">
      <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1.4fr_1fr] sm:gap-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {m.about_teaser_label()}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight uppercase text-foreground sm:text-4xl">
            {m.about_teaser_heading()}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {m.about_teaser_text_1()}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {m.about_teaser_text_2()}
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
          >
            {m.about_teaser_cta()}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {m.about_teaser_tools_label()}
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            {software.map((tool) => (
              <span
                key={tool}
                className="border border-border/60 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                {tool}
              </span>
            ))}
          </div>

          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {m.about_teaser_systems_label()}
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {systems.map((system) => (
              <span
                key={system}
                className="border border-border/60 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                {system}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
