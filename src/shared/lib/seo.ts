import { SEO_CONFIG, SITE_URL } from "#/config/app-config"

export function pageSeo({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image?: string
}) {
  const ogImage = image
    ? `${SITE_URL}${image}`
    : `${SITE_URL}${SEO_CONFIG.images.ogImage}`

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ]
}
