import { useEffect, useState } from "react"

export default function Timecode() {
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrames((f) => f + 1), 1000 / 24)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")
  const ff = frames % 24
  const ss = Math.floor(frames / 24) % 60
  const mm = Math.floor(frames / 24 / 60) % 60

  return (
    <div className="eyebrow flex items-center gap-2 tabular-nums">
      <span
        aria-hidden
        className="rec-dot"
      />
      REC 00:{pad(mm)}:{pad(ss)}:{pad(ff)}
    </div>
  )
}
