import { z } from "zod"
import type { ContactMessages } from "#/shared/types/main"

export function createContactSchema(messages: ContactMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameTooShort).max(80),
    email: z.string().trim().email(messages.emailInvalid),
    message: z.string().trim().min(10, messages.messageTooShort).max(2000),
    website: z.string().max(0).optional(),
  })
}

export type ContactSchema = ReturnType<typeof createContactSchema>
export type ContactInput = z.infer<ContactSchema>
