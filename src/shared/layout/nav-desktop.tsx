import { Link } from "@tanstack/react-router"
import { SITE_FIRST_NAME, SITE_LAST_NAME } from "#/config/app-config"
import { LanguageSwitcher } from "#/shared/common/language-switcher.tsx"
import { useI18n } from "@/i18n"
import { ModeToggle } from "../common/mode-toggle"
import { NavMobile } from "./nav-mobile"

export function Navbar() {
  const { t } = useI18n()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl dark:bg-background dark:backdrop-blur-none">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="."
          hash="top"
          className="font-display text-sm font-bold tracking-[0.28em] uppercase"
        >
          {SITE_FIRST_NAME}
          <span className="text-gold">.</span>
          {SITE_LAST_NAME}
        </Link>
        <div className="hidden items-center gap-8 text-xs tracking-[0.18em] uppercase text-muted-foreground sm:flex">
          <Link
            to="."
            hash="works"
            className="transition-colors hover:text-gold"
          >
            {t.nav.works}
          </Link>
          <Link
            to="."
            hash="services"
            className="transition-colors hover:text-gold"
          >
            {t.nav.services}
          </Link>
          <Link
            to="."
            hash="about"
            className="transition-colors hover:text-gold"
          >
            {t.nav.about}
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <LanguageSwitcher />
            <ModeToggle />
            <Link
              to="."
              hash="contact"
              className="border border-gold/60 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              {t.nav.contact}
            </Link>
          </div>
          <NavMobile />
        </div>
      </nav>
    </header>
  )
}
