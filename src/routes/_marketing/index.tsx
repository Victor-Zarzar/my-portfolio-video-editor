import { createFileRoute } from "@tanstack/react-router"
import { motion, type Variants } from "motion/react"
import { m } from "#/paraglide/messages"
import { AboutTeaser } from "#/shared/layout/about-teaser"
import { ContactTeaser } from "#/shared/layout/contact-teaser"
import { HeroSection } from "#/shared/layout/hero-section"
import { ServicesTeaser } from "#/shared/layout/services-teaser"
import { WorksTeaser } from "#/shared/layout/works-teaser"
import { pageSeo } from "#/shared/lib/seo"
import heroImg from "@/assets/hero.jpg"

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: pageSeo({
      title: m.seo_title(),
      description: m.seo_description(),
    }),
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImg,
        fetchPriority: "high",
      },
    ],
  }),
  component: App,
})

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
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main id="top">
        <HeroSection />

        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <WorksTeaser />
        </motion.div>

        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ServicesTeaser />
        </motion.div>

        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <AboutTeaser />
        </motion.div>

        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ContactTeaser />
        </motion.div>
      </main>
    </div>
  )
}
