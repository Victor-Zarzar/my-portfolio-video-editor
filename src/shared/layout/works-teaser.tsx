import { Link } from "@tanstack/react-router"
import { type PointerEvent, useEffect, useRef, useState } from "react"
import { m } from "#/paraglide/messages"
import { getWorks } from "#/shared/data/works-data"
import { Image } from "../features/image-hero"
import { LoopVideo } from "../features/loop-video"
import type { Work } from "../types/works/works"

const FEATURED_COUNT = 2

function WorkCard({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const { preview } = work

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hovering) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [hovering, loaded])

  const handleEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (!preview || e.pointerType !== "mouse") return
    setLoaded(true)
    setHovering(true)
  }

  return (
    <div
      onPointerEnter={handleEnter}
      onPointerLeave={() => setHovering(false)}
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

      {preview && loaded && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          {preview.webm && (
            <source
              src={preview.webm}
              type="video/webm"
            />
          )}
          <source
            src={preview.mp4}
            type="video/mp4"
          />
        </video>
      )}

      <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
          {work.year} · {work.kind}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {work.title}
        </span>
      </div>
    </div>
  )
}

function ReelsBand() {
  return (
    <div className="relative mt-12 flex h-40 items-center justify-center overflow-hidden border border-border/60 sm:h-48">
      <LoopVideo
        mp4="/media/vinyl.mp4"
        webm="/media/vinyl.webm"
        poster="/media/vinyl-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-background/50" />
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
          {m.works_teaser_reels()}
        </h3>
        <Link
          to="/works"
          className="inline-flex items-center gap-2 border border-gold bg-background/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          {m.works_teaser_cta()}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}

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
          <WorkCard
            key={work.id}
            work={work}
          />
        ))}
      </div>

      <ReelsBand />
    </section>
  )
}
