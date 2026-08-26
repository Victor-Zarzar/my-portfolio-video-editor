import portraitImg from "@/assets/portrait.jpg"
import { useI18n } from "@/i18n"

export function AboutSection() {
  const { t } = useI18n()

  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center"
    >
      <div className="grain-overlay">
        <img
          src={portraitImg}
          alt={t.about.portraitAlt}
          loading="lazy"
          width={1024}
          height={1280}
          className="w-full border border-gold/20 object-cover"
        />
      </div>
      <div>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          {t.about.title1}
          <span className="text-gold-gradient">{t.about.titleAccent}</span>.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {t.about.p1}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t.about.p2}
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-6 hairline pt-8">
          <div>
            <dt className="text-3xl font-bold text-gold">12</dt>
            <dd className="mt-1 text-xs tracking-[0.16em] uppercase text-muted-foreground">
              {t.about.years}
            </dd>
          </div>
          <div>
            <dt className="text-3xl font-bold text-gold">120+</dt>
            <dd className="mt-1 text-xs tracking-[0.16em] uppercase text-muted-foreground">
              {t.about.projects}
            </dd>
          </div>
          <div>
            <dt className="text-3xl font-bold text-gold">07</dt>
            <dd className="mt-1 text-xs tracking-[0.16em] uppercase text-muted-foreground">
              {t.about.awards}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
