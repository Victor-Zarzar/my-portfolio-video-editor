import type { ImageProps } from "../types/main"

export function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      sizes={sizes}
    />
  )
}
