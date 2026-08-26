import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
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

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.55,
			delay: i * 0.12,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	}),
};

function Index() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main id="top">
				<HeroSection />

				<motion.div
					custom={0}
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					<WorksSection />
				</motion.div>

				<motion.div
					custom={1}
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					<ServicesSection />
				</motion.div>

				<motion.div
					custom={2}
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					<AboutSection />
				</motion.div>

				<motion.div
					custom={3}
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					<ContactSection />
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
