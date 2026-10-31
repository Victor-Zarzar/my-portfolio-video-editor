import { m } from "#/paraglide/messages"
import work1Set from "@/assets/work-1.jpg?w=400;800;1120&format=webp&as=srcset"
import work1 from "@/assets/work-1.jpg?w=800&format=webp"
import work2Set from "@/assets/work-2.jpg?w=400;800;1120&format=webp&as=srcset"
import work2 from "@/assets/work-2.jpg?w=800&format=webp"
import type { Work } from "../types/works/works"

const items = [
  {
    id: "work-1",
    src: work1,
    srcSet: work1Set,
    year: "2026",
    title: () => m.works_item_1_title(),
    kind: () => m.works_item_1_kind(),
  },
  {
    id: "work-2",
    src: work2,
    srcSet: work2Set,
    year: "2026",
    title: () => m.works_item_2_title(),
    kind: () => m.works_item_2_kind(),
    videoUrl:
      "https://www.instagram.com/reel/DfJz7jnKBB9/?srtk=ODJ6aXBsdTdudWV3",
  },
]

export function getWorks(): Work[] {
  return items.map(({ title, kind, ...rest }) => ({
    ...rest,
    title: title(),
    kind: kind(),
  }))
}
