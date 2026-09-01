import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { env } from "@/env"

const serverContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
})

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(serverContactSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true }
    }

    const results = await Promise.allSettled([
      sendEmail(data),
      sendSlackNotification(data),
    ])

    const failed = results.filter((r) => r.status === "rejected")
    if (failed.length === results.length) {
      throw new Error("Falha ao enviar mensagem")
    }

    return { ok: true }
  })

async function sendEmail(data: {
  name: string
  email: string
  message: string
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: data.email,
      subject: `Novo contato de ${data.name}`,
      text: `${data.message}\n\n---\n${data.name} <${data.email}>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend falhou: ${res.status}`)
}

async function sendSlackNotification(data: {
  name: string
  email: string
  message: string
}) {
  const res = await fetch(env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `*Novo contato* — ${data.name} (${data.email})\n${data.message}`,
    }),
  })
  if (!res.ok) throw new Error(`Slack falhou: ${res.status}`)
}
