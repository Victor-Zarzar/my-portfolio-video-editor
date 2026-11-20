import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import { ImageLut } from "../features/image-lut"

export function LutTeaser() {
  return (
    <section className="px-6 py-24 border-y border-border/60">
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {m.lut_teaser_label()}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight uppercase text-foreground sm:text-4xl">
          {m.lut_teaser_heading()}
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          {m.lut_teaser_text()}
        </p>

        <div className="mt-10">
          <ImageLut />
        </div>

        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
        >
          {m.lut_teaser_cta()}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
