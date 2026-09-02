import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { RateLimiterMemory } from "rate-limiter-flexible"
import { z } from "zod"
import { env } from "@/env"
import { escapeHtml } from "./escape-html"

const serverContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
  captchaToken: z.string().min(1),
})

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
})

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(serverContactSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true }
    }

    const request = getRequest()
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"

    try {
      await rateLimiter.consume(ip)
    } catch {
      throw new Error("Muitas tentativas. Tente novamente em instantes.")
    }

    const captchaOk = await verifyCaptcha(data.captchaToken)
    if (!captchaOk) {
      throw new Error("Falha na verificação do captcha.")
    }

    const sanitizedName = escapeHtml(data.name)
    const sanitizedEmail = escapeHtml(data.email)
    const sanitizedMessage = escapeHtml(data.message)

    const payload = {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    }

    const results = await Promise.allSettled([
      sendEmail(payload),
      sendSlackNotification(payload),
    ])

    const failed = results.filter((r) => r.status === "rejected")
    if (failed.length === results.length) {
      throw new Error("Falha ao enviar mensagem")
    }

    return { ok: true }
  })

async function verifyCaptcha(token: string) {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`,
  })
  const result = await res.json()
  return Boolean(result.success)
}

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
      html: buildEmailHtml(data),
      text: `${data.message}\n\n---\n${data.name} <${data.email}>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend falhou: ${res.status}`)
}

function buildEmailHtml(data: {
  name: string
  email: string
  message: string
}) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 24px;">
      <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #111827; color: #ffffff; padding: 20px 24px;">
          <h1 style="margin: 0; font-size: 20px;">Novo contato pelo portfólio</h1>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 700; width: 100px;">Nome</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
                  ${data.email}
                </a>
              </td>
            </tr>
          </table>
          <div>
            <h2 style="margin: 0 0 12px; font-size: 16px;">Mensagem</h2>
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap;">
              ${data.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

async function sendSlackNotification(data: {
  name: string
  email: string
  message: string
}) {
  if (!env.SLACK_WEBHOOK_URL) return

  const res = await fetch(env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `Novo contato do portfólio de ${data.name} <${data.email}>`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Novo contato pelo portfólio",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Nome:*\n${data.name}` },
            {
              type: "mrkdwn",
              text: `*Email:*\n<mailto:${data.email}|${data.email}>`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Mensagem:*\n>${data.message.replace(/\n/g, "\n>")}`,
          },
        },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Slack falhou: ${res.status}`)
}
