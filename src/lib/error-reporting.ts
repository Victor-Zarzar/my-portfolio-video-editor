type AppErrorOptions = {
  mechanism?:
    | "manual"
    | "onerror"
    | "unhandledrejection"
    | "react_error_boundary"
  handled?: boolean
  severity?: "error" | "warning" | "info"
}

type ErrorReportingHooks = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: AppErrorOptions
  ) => void
}

declare global {
  interface Window {
    __appErrorReporting?: ErrorReportingHooks
  }
}

export function reportAppError(
  error: unknown,
  context: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return

  // Loaders and server fns commonly throw a raw Response; String(it) is the
  // opaque "[object Response]", so pull out the status and URL instead.
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error)
  const stack = error instanceof Error ? error.stack : undefined

  const payload = {
    source: "react_error_boundary",
    route: window.location.pathname,
    ...context,
  }

  const options: AppErrorOptions = {
    mechanism: "react_error_boundary",
    handled: false,
    severity: "error",
  }

  // (Sentry, LogRocket, etc.)
  if (window.__appErrorReporting?.captureException) {
    window.__appErrorReporting.captureException(error, payload, options)
  } else {
    console.error("[AppError]", { message, stack, ...payload, ...options })
  }
}
