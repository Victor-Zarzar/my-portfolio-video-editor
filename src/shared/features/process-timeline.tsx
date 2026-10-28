import { useEffect, useRef, useState } from "react"
import { m } from "#/paraglide/messages"

export const REST = 52
export const TOTAL_SECONDS = 70

const stages = [
  { label: m.services_timeline_concept, at: 0 },
  { label: m.services_timeline_preproduction, at: 25 },
  { label: m.services_timeline_shoot, at: 52 },
  { label: m.services_timeline_postproduction, at: 78 },
]

const ticks = [
  "00:00",
  "00:10",
  "00:20",
  "00:30",
  "00:40",
  "00:50",
  "01:00",
  "01:10",
]

export function buildBars(length = 120) {
  return Array.from({ length }, (_, i) =>
    Math.max(
      2,
      Math.round(Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 18)
    )
  )
}

const bars = buildBars()

export function toTimecode(pct: number) {
  const total = Math.round((pct / 100) * TOTAL_SECONDS)
  const mm = String(Math.floor(total / 60)).padStart(2, "0")
  const ss = String(total % 60).padStart(2, "0")
  return `${mm}:${ss}`
}

export function ProcessTimeline() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [scrubbing, setScrubbing] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setProgress(REST)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(REST)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    setScrubbing(true)
    setProgress(Math.min(100, Math.max(0, pct)))
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return
    setScrubbing(false)
    setProgress(REST)
  }

  return (
    <div
      ref={rootRef}
      className="mt-12 border border-border/60 bg-card/60 p-6"
    >
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
        {m.services_timeline_heading()}
      </p>

      <div className="overflow-x-auto overflow-y-hidden">
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="min-w-160 cursor-ew-resize px-5"
        >
          <div
            ref={trackRef}
            className="relative pb-7"
          >
            <div className="relative h-5 text-[10px] uppercase tracking-[0.18em]">
              {stages.map(({ label, at }, i) => (
                <span
                  key={i}
                  className={`absolute transition-colors duration-200 ${
                    progress >= at ? "text-gold" : "text-muted-foreground"
                  }`}
                  style={{ left: `${at}%` }}
                >
                  {label()}
                </span>
              ))}
            </div>

            <div className="relative mt-4 h-px bg-border">
              {stages.map(({ at }, i) => (
                <span
                  key={i}
                  className={`absolute -top-0.75 size-1.75 -translate-x-1/2 rounded-full transition-colors duration-200 ${
                    progress >= at ? "bg-gold" : "bg-muted-foreground"
                  }`}
                  style={{ left: `${at}%` }}
                />
              ))}
            </div>

            <div className="mt-3 flex justify-between font-mono text-[9px] text-muted-foreground">
              {ticks.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="mt-3 flex h-6 items-center justify-between gap-0.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-px bg-border"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            <div
              className={`pointer-events-none absolute bottom-7 top-8 w-px bg-gold ease-out transition-[left] motion-reduce:transition-none ${
                scrubbing ? "duration-75" : "duration-1000"
              }`}
              style={{ left: `${progress}%` }}
            >
              <span className="absolute -top-1 left-1/2 size-0 -translate-x-1/2 border-x-[5px] border-t-[7px] border-x-transparent border-t-gold" />
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-card px-1 font-mono text-[9px] text-gold">
                {toTimecode(progress)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
