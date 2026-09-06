import { m } from "#/paraglide/messages"
import portraitImg from "@/assets/portrait.jpg"

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center"
    >
      <div className="grain-overlay">
        <img
          src={portraitImg}
          alt={m.about_portrait_alt()}
          loading="lazy"
          width={1024}
          height={1280}
          className="w-full border border-gold/20 object-cover"
        />
      </div>
      <div>
        <p className="eyebrow">{m.about_eyebrow()}</p>
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          {m.about_title1()}
          <span className="text-gold-gradient">{m.about_title_accent()}</span>.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {m.about_p1()}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {m.about_p2()}
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-6 hairline pt-8" />
      </div>
    </section>
  )
}
