import type { ParsedVideo } from "../types/video/video"

export function parseVideoUrl(raw: string): ParsedVideo | null {
  let u: URL
  try {
    u = new URL(raw)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, "")

  if (host === "youtu.be") {
    const id = u.pathname.slice(1)
    return id ? { provider: "youtube", id } : null
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = u.searchParams.get("v")
    if (u.pathname === "/watch" && v) return { provider: "youtube", id: v }
    const match = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)
    if (match) return { provider: "youtube", id: match[1] }
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const match = u.pathname.match(/(\d+)(?:\/(\w+))?/)
    if (match) return { provider: "vimeo", id: match[1], hash: match[2] }
  }

  if (host === "instagram.com") {
    const match = u.pathname.match(/^\/(p|reel|tv)\/([\w-]+)/)
    if (match) return { provider: "instagram", kind: match[1], id: match[2] }
  }

  return null
}

export function getEmbedSrc(
  v: ParsedVideo,
  mode: "preview" | "full"
): string | null {
  switch (v.provider) {
    case "youtube": {
      const base = `https://www.youtube-nocookie.com/embed/${v.id}`
      return mode === "preview"
        ? `${base}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v.id}&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`
        : `${base}?autoplay=1&rel=0`
    }
    case "vimeo": {
      const h = v.hash ? `&h=${v.hash}` : ""
      const base = `https://player.vimeo.com/video/${v.id}`
      return mode === "preview"
        ? `${base}?background=1&autoplay=1&loop=1&muted=1${h}`
        : `${base}?autoplay=1${h}`
    }
    case "instagram":
      return mode === "preview"
        ? null
        : `https://www.instagram.com/${v.kind}/${v.id}/embed`
  }
}
