export type AppErrorOptions = {
  mechanism?:
    | "manual"
    | "onerror"
    | "unhandledrejection"
    | "react_error_boundary"
  handled?: boolean
  severity?: "error" | "warning" | "info"
}

export type ErrorReportingHooks = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: AppErrorOptions
  ) => void
}
