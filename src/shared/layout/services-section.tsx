import { m } from "#/paraglide/messages"

const serviceNumbers = ["01", "02", "03"]

export function ServicesSection() {
  const services = [
    { title: m.services_item_1_title(), text: m.services_item_1_text() },
    { title: m.services_item_2_title(), text: m.services_item_2_text() },
    { title: m.services_item_3_title(), text: m.services_item_3_text() },
  ]

  return (
    <section
      id="services"
      className="border-y border-border/60 bg-card/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">{m.services_eyebrow()}</p>
        <div className="mt-12 grid gap-px bg-border/60 sm:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-background p-8"
            >
              <span className="font-display text-sm font-bold text-gold">
                {serviceNumbers[i]}
              </span>
              <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
