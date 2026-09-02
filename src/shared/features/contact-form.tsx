import * as Sentry from "@sentry/tanstackstart-react"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { toast } from "sonner"
import type { ContactInput } from "#/lib/contact-schema"
import { sendContactMessage } from "#/lib/contact-server"
import { Button } from "#/shared/ui/button"
import { Input } from "#/shared/ui/input"
import { Label } from "#/shared/ui/label"
import { Textarea } from "#/shared/ui/textarea"
import type { ContactFormProps } from "../types/main"

const EMPTY_FORM: ContactInput = {
  name: "",
  email: "",
  message: "",
  website: "",
  captchaToken: "",
}

export function ContactForm({ schema, labels }: ContactFormProps) {
  const [form, setForm] = React.useState<ContactInput>(EMPTY_FORM)
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof ContactInput, string>>
  >({})

  const mutation = useMutation({
    mutationFn: (data: ContactInput) => sendContactMessage({ data }),
    onSuccess: () => {
      toast.success(labels.success)
      setForm(EMPTY_FORM)
    },
    onError: (error) => {
      Sentry.captureException(error)
      toast.error(labels.error)
    },
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { executeRecaptcha } = useGoogleReCaptcha()

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    const captchaToken = await executeRecaptcha?.("contact_form")
    if (!captchaToken) {
      toast.error(labels.error)
      return
    }

    const dataToValidate = { ...form, captchaToken }

    const parsed = schema.safeParse(dataToValidate)

    if (!parsed.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    mutation.mutate(parsed.data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{labels.name}</Label>
          <Input
            id="name"
            name="name"
            placeholder={labels.namePlaceholder}
            value={form.name}
            onChange={handleChange}
            className="bg-white text-neutral-900 placeholder:text-neutral-400"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{labels.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={labels.emailPlaceholder}
            value={form.email}
            onChange={handleChange}
            className="bg-white text-neutral-900 placeholder:text-neutral-400"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder={labels.messagePlaceholder}
          value={form.message}
          onChange={handleChange}
          className="resize-none bg-white text-neutral-900 placeholder:text-neutral-400"
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={
          mutation.isPending || !form.name || !form.email || !form.message
        }
        className="w-fit"
      >
        {mutation.isPending ? labels.sending : labels.submit}
      </Button>
    </form>
  )
}
