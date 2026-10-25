import type { ImageProps } from "../types/image/image"

export function Image({
  priority = false,
  sizes,
  srcSet,
  alt,
  ...props
}: ImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  )
}
