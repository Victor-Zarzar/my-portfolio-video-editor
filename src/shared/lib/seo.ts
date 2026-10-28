import { SEO_CONFIG, SITE_URL } from "#/config/app-config"
import { baseLocale, locales, localizeUrl } from "#/paraglide/runtime"

type Locale = (typeof locales)[number]

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

export function buildLocaleLinks(pathname: string, locale: Locale) {
  const base = new URL(pathname, SITE_URL).href
  const canonical = localizeUrl(base, { locale }).href

  const alternates = locales.map((l) => ({
    rel: "alternate",
    hrefLang: l,
    href: localizeUrl(base, { locale: l }).href,
  }))

  const xDefault = {
    rel: "alternate",
    hrefLang: "x-default",
    href: localizeUrl(base, { locale: baseLocale }).href,
  }

  return { canonical, alternates: [...alternates, xDefault] }
}
