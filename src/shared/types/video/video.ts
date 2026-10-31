export type LoopVideoProps = {
  mp4: string
  webm?: string
  poster: string
  className?: string
}

export type Provider = "youtube" | "vimeo" | "instagram"

export type ParsedVideo = {
  provider: Provider
  id: string
  hash?: string
  kind?: string
}
