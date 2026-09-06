import type { ContactSchema } from "#/lib/contact-schema"

export type RouteNode = {
  fullPath?: string
  children?: Record<string, unknown>
}

export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export type ContactFormLabels = {
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  message: string
  messagePlaceholder: string
  submit: string
  sending: string
  success: string
  error: string
}

export type ContactFormProps = {
  schema: ContactSchema
  labels: ContactFormLabels
}

export type ContactMessages = {
  nameTooShort: string
  emailInvalid: string
  messageTooShort: string
  captchaRequired: string
}

export type DevToolsGuardProps = {
  unauthorizedPath?: string
}

export type CookieConsentValue = "accepted" | "declined"

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
