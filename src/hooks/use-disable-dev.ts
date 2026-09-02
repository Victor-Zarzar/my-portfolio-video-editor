import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { env } from "#/env"

export function useDisableDevTools(unauthorizedPath = "/unauthorized") {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const redirectedRef = useRef(false)

  useEffect(() => {
    const redirect = () => {
      if (!redirectedRef.current && pathname !== unauthorizedPath) {
        redirectedRef.current = true
        navigate({ to: unauthorizedPath })
      }
    }

    const preventKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault()
        redirect()
      }
    }

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      redirect()
    }

    if (env.VITE_DISABLE_DEVTOOLS === "true") {
      document.addEventListener("keydown", preventKeys)
      document.addEventListener("contextmenu", preventContextMenu)
    }

    return () => {
      document.removeEventListener("keydown", preventKeys)
      document.removeEventListener("contextmenu", preventContextMenu)
    }
  }, [navigate, pathname, unauthorizedPath])

  useEffect(() => {
    if (pathname !== unauthorizedPath) {
      redirectedRef.current = false
    }
  }, [pathname, unauthorizedPath])
}
