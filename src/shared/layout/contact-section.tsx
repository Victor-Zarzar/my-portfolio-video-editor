import { SITE_EMAIL } from "#/config/site-config";
import { useI18n } from "@/i18n";

export function ContactSection() {
	const { t } = useI18n();

	return (
		<section id="contact" className="border-t border-border/60">
			<div className="mx-auto max-w-6xl px-6 py-28 text-center">
				<p className="eyebrow">{t.contact.eyebrow}</p>
				<h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
					{t.contact.title1}
					<span className="text-gold-gradient">{t.contact.titleAccent}</span>.
				</h2>
				<a
					href={`mailto:${SITE_EMAIL}`}
					className="mt-10 inline-block bg-gold px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
				>
					{SITE_EMAIL}
				</a>
			</div>
		</section>
	);
}
