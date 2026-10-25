import { m } from "#/paraglide/messages"
import work1Set from "@/assets/work-1.jpg?w=400;800;1120&format=webp&as=srcset"
import work1 from "@/assets/work-1.jpg?w=800&format=webp"
import work2Set from "@/assets/work-2.jpg?w=400;800;1120&format=webp&as=srcset"
import work2 from "@/assets/work-2.jpg?w=800&format=webp"
import work3Set from "@/assets/work-3.jpg?w=400;800;1120&format=webp&as=srcset"
import work3 from "@/assets/work-3.jpg?w=800&format=webp"
import work4Set from "@/assets/work-4.jpg?w=400;800;1120&format=webp&as=srcset"
import work4 from "@/assets/work-4.jpg?w=800&format=webp"

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
    year: "2025",
    title: () => m.works_item_2_title(),
    kind: () => m.works_item_2_kind(),
  },
  {
    id: "work-3",
    src: work3,
    srcSet: work3Set,
    year: "2025",
    title: () => m.works_item_3_title(),
    kind: () => m.works_item_3_kind(),
  },
  {
    id: "work-4",
    src: work4,
    srcSet: work4Set,
    year: "2024",
    title: () => m.works_item_4_title(),
    kind: () => m.works_item_4_kind(),
  },
]

export function getWorks() {
  return items.map(({ title, kind, ...rest }) => ({
    ...rest,
    title: title(),
    kind: kind(),
  }))
}
