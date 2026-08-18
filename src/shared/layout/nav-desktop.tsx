import { LanguageSwitcher } from "#/shared/common/language-switcher.tsx";
import { SITE_FIRST_NAME, SITE_LAST_NAME } from "@/config/site";
import { useI18n } from "@/i18n";
import { ModeToggle } from "../common/mode-toggle";
import { NavMobile } from "./nav-mobile";

export function Navbar() {
	const { t } = useI18n();

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a
					href="#top"
					className="font-display text-sm font-bold tracking-[0.28em] uppercase"
				>
					{SITE_FIRST_NAME}
					<span className="text-gold">.</span>
					{SITE_LAST_NAME}
				</a>
				<div className="hidden items-center gap-8 text-xs tracking-[0.18em] uppercase text-muted-foreground sm:flex">
					<a className="transition-colors hover:text-gold" href="#works">
						{t.nav.works}
					</a>
					<a className="transition-colors hover:text-gold" href="#services">
						{t.nav.services}
					</a>
					<a className="transition-colors hover:text-gold" href="#about">
						{t.nav.about}
					</a>
				</div>
				<div className="flex items-center gap-3 sm:gap-4">
					<div className="hidden items-center gap-4 sm:flex">
						<LanguageSwitcher />
						<ModeToggle />
						<a
							href="#contact"
							className="border border-gold/60 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
						>
							{t.nav.contact}
						</a>
					</div>
					<NavMobile />
				</div>
			</nav>
		</header>
	);
}
