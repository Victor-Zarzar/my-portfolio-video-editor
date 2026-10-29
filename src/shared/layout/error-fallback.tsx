import { Button } from "@base-ui/react/button"
import {
  type ErrorComponentProps,
  Link,
  useRouter,
} from "@tanstack/react-router"
import { useEffect } from "react"
import { m } from "#/paraglide/messages"
import { reportAppError } from "#/shared/lib/error-reporting.js"

export function ErrorFallback({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
    reportAppError(error, { boundary: "tanstack_root_error_component" })
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {m.error_heading()}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{m.error_text()}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate()
              reset()
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {m.error_retry()}
          </Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {m.error_home()}
          </Link>
        </div>
      </div>
    </div>
  )
}
