import type { ImgHTMLAttributes } from "react"

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "loading" | "decoding" | "fetchPriority"
> & {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}
