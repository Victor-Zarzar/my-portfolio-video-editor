import portraitSrcSet from "@/assets/portrait.jpg?w=320;640;960&format=webp&as=srcset"
import portraitSrc from "@/assets/portrait.jpg?w=640&format=webp"

export const portrait = {
  src: portraitSrc,
  srcSet: portraitSrcSet,
  sizes: "(min-width: 768px) 320px, 256px",
}
