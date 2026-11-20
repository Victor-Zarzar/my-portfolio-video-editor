import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { m } from "#/paraglide/messages"
import gradedImg from "@/assets/lut/serene.jpg"
import logImg from "@/assets/lut/slog3.jpg"
import { Image } from "./image-hero"

const REST = 50
const WIDTH = 1920
const HEIGHT = 1080
const clamp = (n: number) => Math.min(100, Math.max(0, n))

export function ImageLut() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(REST)
  const rafRef = useRef<number | null>(null)
  const dragging = useRef(false)
  const [ariaValue, setAriaValue] = useState(REST)
  const [animated, setAnimated] = useState(false)

  function apply(next: number) {
    posRef.current = next
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      trackRef.current?.style.setProperty("--pos", `${posRef.current}%`)
    })
  }

  function fromClientX(clientX: number) {
    const el = trackRef.current
    if (!el) return posRef.current
    const rect = el.getBoundingClientRect()
    return clamp(((clientX - rect.left) / rect.width) * 100)
  }

  function commitAria() {
    setAriaValue(Math.round(posRef.current))
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setAnimated(true)
    apply(fromClientX(e.clientX))
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return
    setAnimated((a) => (a ? false : a))
    apply(fromClientX(e.clientX))
  }

  function handlePointerUp() {
    if (!dragging.current) return
    dragging.current = false
    commitAria()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 4
    const current = posRef.current
    let next: number
    if (e.key === "ArrowLeft") next = clamp(current - step)
    else if (e.key === "ArrowRight") next = clamp(current + step)
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = 100
    else return
    e.preventDefault()
    setAnimated(true)
    apply(next)
    setAriaValue(Math.round(next))
  }

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    []
  )

  const ease = animated
    ? "duration-300 ease-out motion-reduce:transition-none"
    : ""

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={m.lut_teaser_aria()}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="relative aspect-video w-full cursor-ew-resize touch-pan-y select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{ "--pos": `${REST}%` } as React.CSSProperties}
    >
      <Image
        src={logImg}
        alt={m.lut_teaser_alt_log()}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />

      <Image
        src={gradedImg}
        alt={m.lut_teaser_alt_graded()}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
        className={`absolute inset-0 size-full object-cover will-change-[clip-path] ${animated ? "transition-[clip-path]" : ""} ${ease}`}
        style={{ clipPath: "inset(0 0 0 var(--pos))" }}
      />

      <span className="pointer-events-none absolute bottom-6 left-6 text-xs uppercase tracking-[0.18em] text-white">
        {m.lut_teaser_label_log()}
      </span>
      <span className="pointer-events-none absolute bottom-6 right-6 text-xs uppercase tracking-[0.18em] text-white">
        {m.lut_teaser_label_graded()}
      </span>

      <div
        data-testid="lut-divider"
        className={`pointer-events-none absolute inset-y-0 w-px bg-gold will-change-[left] ${animated ? "transition-[left]" : ""} ${ease}`}
        style={{ left: "var(--pos)" }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-background shadow-lg">
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </span>
      </div>
    </div>
  )
}
