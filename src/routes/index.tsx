import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME } from "#/config/app-config";
import { AboutSection } from "#/shared/layout/about-section";
import { ContactSection } from "#/shared/layout/contact-section";
import { Footer } from "#/shared/layout/footer";
import { HeroSection } from "#/shared/layout/hero-section";
import { Navbar } from "#/shared/layout/nav-desktop.tsx";
import { ServicesSection } from "#/shared/layout/services-section";
import { WorksSection } from "#/shared/layout/works-section";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: `${SITE_NAME} — Video Editor & Filmmaker` },
			{
				name: "description",
				content:
					"Filmmaker and video editor. Commercials, music videos, and documentaries with cinematic photography direction and signature color grading.",
			},
			{
				property: "og:title",
				content: `${SITE_NAME} — Video Editor & Filmmaker`,
			},
			{
				property: "og:description",
				content:
					"Portfolio of films, commercials, and music videos. Editing, color grading, and direction with a cinematic aesthetic.",
			},
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	}),
	component: Index,
});

function Index() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main id="top">
				<HeroSection />
				<WorksSection />
				<ServicesSection />
				<AboutSection />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
