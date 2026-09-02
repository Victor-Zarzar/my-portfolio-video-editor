import { Link } from "@tanstack/react-router"
import { SITE_NAME, SOCIAL_LINKS } from "#/config/app-config"
import {
  FacebookIcon,
  InstagramIcon,
  VimeoIcon,
  YoutubeIcon,
} from "#/shared/layout/social-icons.tsx"
import { useI18n } from "@/i18n"

const socialItems = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "Vimeo", href: SOCIAL_LINKS.vimeo, Icon: VimeoIcon },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon },
]

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  const navItems = [
    { label: t.nav.works, href: "#works" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: t.nav.policy, href: "/privacy-policy" },
  ]

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3 sm:items-start">
        <div>
          <Link
            to="."
            hash="top"
            className="font-display text-sm font-bold tracking-[0.28em] uppercase"
          >
            {SITE_NAME}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.18em] uppercase text-muted-foreground sm:justify-center"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:justify-end">
          {socialItems.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs tracking-[0.16em] uppercase text-muted-foreground sm:flex-row">
          <span>
            © {year} {SITE_NAME}.
          </span>
          <span>{t.footer.rightsReserved}</span>
        </div>
      </div>
    </footer>
  )
}
