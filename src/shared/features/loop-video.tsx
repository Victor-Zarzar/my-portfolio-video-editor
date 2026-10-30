import { useEffect, useRef } from "react"
import type { LoopVideoProps } from "../types/video/video"

export function LoopVideo({ mp4, webm, poster, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
    >
      {webm && (
        <source
          src={webm}
          type="video/webm"
        />
      )}
      <source
        src={mp4}
        type="video/mp4"
      />
    </video>
  )
}
