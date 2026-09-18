import { Link } from "@tanstack/react-router"
import { SITE_NAME, SOCIAL_LINKS } from "#/config/app-config"
import { m } from "#/paraglide/messages"
import {
  FacebookIcon,
  InstagramIcon,
  VimeoIcon,
  YoutubeIcon,
} from "#/shared/layout/social-icons.tsx"

export function Footer() {
  const year = new Date().getFullYear()

  const socialItems = [
    { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
    { label: "Vimeo", href: SOCIAL_LINKS.vimeo, Icon: VimeoIcon },
    { label: "YouTube", href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon },
  ]

  const navItems = [
    { label: m.nav_works(), href: "/works" },
    { label: m.nav_services(), href: "/services" },
    { label: m.nav_about(), href: "/about" },
    { label: m.nav_contact(), href: "/contact" },
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: m.nav_policy(), href: "/privacy-policy" },
  ]

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col">
          <Link
            to="/"
            className="font-display text-sm font-bold tracking-[0.28em] uppercase"
          >
            {SITE_NAME}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {m.footer_tagline()}
          </p>

          <div className="mt-8 space-y-1 text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <p>
              © {year} {SITE_NAME}. {m.footer_rights_reserved()}
            </p>
            <p className="flex items-center gap-2 normal-case tracking-normal">
              <Link
                to="/privacy-policy"
                className="transition-colors hover:text-gold"
              >
                {m.nav_policy()}
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                to="/terms-of-service"
                className="transition-colors hover:text-gold"
              >
                {m.footer_terms_of_service()}
              </Link>
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-col gap-3 border-border/60 text-sm text-muted-foreground sm:items-start sm:border-l sm:pl-10"
        >
          {navItems.map((item) =>
            item.href.endsWith(".xml") ? (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-col gap-4 border-border/60 sm:items-start sm:border-l sm:pl-10">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-muted-foreground">
            {m.footer_social_media()}
          </span>
          <div className="flex items-center gap-3">
            {socialItems.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
