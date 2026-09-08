import { m } from "#/paraglide/messages"

export const serviceNumbers = ["01", "02", "03"]

export const processSteps = [
  {
    number: "01",
    title: m.services_process_step_1_title,
    desc: m.services_process_step_1_desc,
  },
  {
    number: "02",
    title: m.services_process_step_2_title,
    desc: m.services_process_step_2_desc,
  },
  {
    number: "03",
    title: m.services_process_step_3_title,
    desc: m.services_process_step_3_desc,
  },
  {
    number: "04",
    title: m.services_process_step_4_title,
    desc: m.services_process_step_4_desc,
  },
]

export function getServices() {
  return [
    {
      title: m.services_item_1_title(),
      text: m.services_item_1_text(),
      features: [
        m.services_item_1_feature_1(),
        m.services_item_1_feature_2(),
        m.services_item_1_feature_3(),
      ],
    },
    {
      title: m.services_item_2_title(),
      text: m.services_item_2_text(),
      features: [
        m.services_item_2_feature_1(),
        m.services_item_2_feature_2(),
        m.services_item_2_feature_3(),
      ],
    },
    {
      title: m.services_item_3_title(),
      text: m.services_item_3_text(),
      features: [
        m.services_item_3_feature_1(),
        m.services_item_3_feature_2(),
        m.services_item_3_feature_3(),
      ],
    },
  ]
}

export const servicesTeaserHighlights = [
  {
    title: m.services_teaser_item_1_title,
    desc: m.services_teaser_item_1_desc,
  },
  {
    title: m.services_teaser_item_2_title,
    desc: m.services_teaser_item_2_desc,
  },
  {
    title: m.services_teaser_item_3_title,
    desc: m.services_teaser_item_3_desc,
  },
]
