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
