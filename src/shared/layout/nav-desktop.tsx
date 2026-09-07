import { Link } from "@tanstack/react-router"
import { SITE_FIRST_NAME, SITE_LAST_NAME } from "#/config/app-config"
import { m } from "#/paraglide/messages"
import { LanguageSwitcher } from "#/shared/common/language-switcher.tsx"
import { ModeToggle } from "../common/mode-toggle"
import { NavMobile } from "./nav-mobile"

const navLinks = [
  { label: m.nav_works(), href: "/works" },
  { label: m.nav_services(), href: "/services" },
  { label: m.nav_about(), href: "/about" },
] as const

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl dark:bg-background dark:backdrop-blur-none">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-sm font-bold tracking-[0.28em] uppercase"
        >
          {SITE_FIRST_NAME}
          <span className="text-gold">.</span>
          {SITE_LAST_NAME}
        </Link>

        <div className="hidden items-center gap-8 text-xs tracking-[0.18em] uppercase text-muted-foreground sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="transition-colors hover:text-gold [&.active]:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <LanguageSwitcher />
            <ModeToggle />
            <Link
              to="/contact"
              className="border border-gold/60 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground [&.active]:bg-gold [&.active]:text-primary-foreground"
            >
              {m.nav_contact()}
            </Link>
          </div>
          <NavMobile />
        </div>
      </nav>
    </header>
  )
}
