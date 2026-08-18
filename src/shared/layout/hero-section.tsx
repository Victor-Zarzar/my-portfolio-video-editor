import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/i18n";

export function HeroSection() {
	const { t } = useI18n();

	return (
		<section className="relative grain-overlay flex min-h-screen items-end overflow-hidden">
			<img
				src={heroImg}
				alt={t.heroAlt}
				width={1920}
				height={1088}
				className="absolute inset-0 h-full w-full object-cover opacity-70"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
			<div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
				<p className="eyebrow">{t.hero.eyebrow}</p>
				<h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-extrabold sm:text-7xl md:text-8xl">
					{t.hero.title1}
					<span className="block text-gold-gradient">{t.hero.title2}</span>
					{t.hero.title3}
				</h1>
				<p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
					{t.hero.text}
				</p>
				<div className="mt-10 flex flex-wrap items-center gap-6">
					<a
						href="#works"
						className="bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
					>
						{t.hero.cta}
					</a>
					<span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
						{t.hero.note}
					</span>
				</div>
			</div>
		</section>
	);
}
