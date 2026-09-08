import { Link } from "@tanstack/react-router"
import { m } from "#/paraglide/messages"
import {
  getServices,
  processSteps,
  serviceNumbers,
} from "#/shared/data/services-data"

export function ServicesSection() {
  const services = getServices()

  return (
    <>
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow">{m.services_eyebrow()}</p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            {m.services_page_heading()}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {m.services_page_intro()}
          </p>

          <div className="mt-12 grid gap-px bg-border/60 sm:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="flex flex-col bg-background p-8"
              >
                <span className="font-display text-sm font-bold text-gold">
                  {serviceNumbers[i]}
                </span>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-border/60 pt-6">
                  {s.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span
                        className="mt-1 text-gold"
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow">{m.services_process_eyebrow()}</p>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
            {m.services_process_heading()}
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number}>
                <span className="font-display text-sm font-bold text-gold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em]">
                  {step.title()}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.desc()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
            >
              {m.services_final_cta()}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
