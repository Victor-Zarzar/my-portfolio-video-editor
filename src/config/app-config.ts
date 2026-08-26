import { env } from "#/env"

export const SITE_FIRST_NAME = "Victor"
export const SITE_LAST_NAME = "Zarzar"
export const SITE_NAME = `${SITE_FIRST_NAME} ${SITE_LAST_NAME}`
export const SITE_EMAIL = "vzfilms8@gmail.com"

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/vzfilms8",
  facebook: "https://facebook.com/vzfilms8",
  vimeo: "https://vimeo.com/vzfilms8",
  youtube: "https://youtube.com/@vzfilms8",
} as const

export const SITE_URL = env.VITE_APP_URL

export const SEO_CONFIG = {
  images: {
    ogImage: "/og.jpg",
    logo: "/logo.svg",
  },
  robots: {
    meta: "index, follow",
  },
  twitterHandle: undefined as string | undefined,
} as const
