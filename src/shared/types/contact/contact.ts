import type { ContactSchema } from "#/shared/lib/contact-schema"

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

export type ContactData = {
  name: string
  email: string
  message: string
  website?: string
  captchaToken: string
}
