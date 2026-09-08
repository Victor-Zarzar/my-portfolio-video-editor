import { m } from "#/paraglide/messages"
import work1 from "@/assets/work-1.jpg"
import work2 from "@/assets/work-2.jpg"
import work3 from "@/assets/work-3.jpg"
import work4 from "@/assets/work-4.jpg"

export const worksData = [
  { image: work1, year: "2026" },
  { image: work2, year: "2025" },
  { image: work3, year: "2025" },
  { image: work4, year: "2024" },
]

export const workImages = [work1, work2, work3, work4]

export const workYears = ["2026", "2025", "2025", "2024"]

export function getWorks() {
  return [
    { title: m.works_item_1_title(), kind: m.works_item_1_kind() },
    { title: m.works_item_2_title(), kind: m.works_item_2_kind() },
    { title: m.works_item_3_title(), kind: m.works_item_3_kind() },
    { title: m.works_item_4_title(), kind: m.works_item_4_kind() },
  ]
}
