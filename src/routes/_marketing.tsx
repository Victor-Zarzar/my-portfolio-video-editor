import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Footer } from "#/shared/layout/footer-component"
import { Navbar } from "#/shared/layout/nav-desktop.tsx"

export const Route = createFileRoute("/_marketing")({
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ),
})
