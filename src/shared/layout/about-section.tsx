import { m } from "#/paraglide/messages"
import portraitSrcSet from "@/assets/portrait.jpg?w=320;640;960&format=webp&as=srcset"
import portraitImg from "@/assets/portrait.jpg?w=640&format=webp"
import { Image } from "../features/image-hero"

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-[auto_1fr] md:items-center"
    >
      <div className="grain-overlay mx-auto size-64 overflow-hidden rounded-full border border-gold/20 md:size-80">
        <Image
          src={portraitImg}
          srcSet={portraitSrcSet}
          sizes="(min-width: 768px) 320px, 256px"
          alt={m.about_portrait_alt()}
          width={640}
          height={640}
          priority
          className="size-full object-cover object-[50%_35%]"
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
