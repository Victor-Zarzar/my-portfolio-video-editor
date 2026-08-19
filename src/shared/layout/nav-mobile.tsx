import { Menu } from "lucide-react";
import { useState } from "react";
import { SITE_FIRST_NAME, SITE_LAST_NAME } from "@/config/site";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/shared/common/language-switcher";
import { ModeToggle } from "@/shared/common/mode-toggle";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

export function NavMobile() {
	const { t } = useI18n();
	const [open, setOpen] = useState(false);

	const links = [
		{ href: "#works", label: t.nav.works },
		{ href: "#services", label: t.nav.services },
		{ href: "#about", label: t.nav.about },
	];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="outline"
						size="icon"
						aria-label="Menu"
						className="h-9 w-9 rounded-none border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground sm:hidden"
					/>
				}
			>
				<Menu className="h-[1.1rem] w-[1.1rem]" />
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex w-72 flex-col border-l border-border/60 bg-background px-6 pt-14 pb-8"
			>
				<span className="font-display text-sm font-bold tracking-[0.28em] uppercase">
					{SITE_FIRST_NAME}
					<span className="text-gold">.</span>
					{SITE_LAST_NAME}
				</span>
				<nav className="mt-10 flex flex-col gap-6">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="text-sm tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-gold"
						>
							{link.label}
						</a>
					))}
				</nav>
				<a
					href="#contact"
					onClick={() => setOpen(false)}
					className="mt-10 inline-block border border-gold/60 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
				>
					{t.nav.contact}
				</a>
				<div className="mt-10 flex items-center justify-between gap-4 hairline pt-6">
					<LanguageSwitcher />
					<ModeToggle />
				</div>
			</SheetContent>
		</Sheet>
	);
}
