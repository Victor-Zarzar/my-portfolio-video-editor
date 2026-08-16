import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ServicesSection } from "@/components/services-section";
import { WorksSection } from "@/components/works-section";
import { SITE_NAME } from "@/config/site";

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
