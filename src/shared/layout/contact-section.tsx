import { ArrowUpRight, Mail } from "lucide-react"
import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { SITE_EMAIL, SOCIAL_LINKS } from "#/config/app-config"
import { env } from "#/env"
import { createContactSchema } from "#/lib/contact-schema"
import { ContactForm } from "#/shared/features/contact-form"
import { useI18n } from "@/i18n"
import {
  FacebookIcon,
  InstagramIcon,
  VimeoIcon,
  YoutubeIcon,
} from "./social-icons"

const SOCIAL_ITEMS = [
  {
    key: "instagram",
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    key: "facebook",
    href: SOCIAL_LINKS.facebook,
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    key: "vimeo",
    href: SOCIAL_LINKS.vimeo,
    label: "Vimeo",
    icon: VimeoIcon,
  },
  {
    key: "youtube",
    href: SOCIAL_LINKS.youtube,
    label: "YouTube",
    icon: YoutubeIcon,
  },
] as const

export function ContactSection() {
  const { t } = useI18n()

  const schema = React.useMemo(
    () =>
      createContactSchema({
        nameTooShort: t.contact.form.errors.nameTooShort,
        emailInvalid: t.contact.form.errors.emailInvalid,
        messageTooShort: t.contact.form.errors.messageTooShort,
        captchaRequired: t.contact.form.errors.captchaRequired,
      }),
    [t]
  )

  return (
    <section
      id="contact"
      className="border-t border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="text-center">
          <p className="eyebrow">{t.contact.eyebrow}</p>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {t.contact.title1}
            <span className="text-gold-gradient">{t.contact.titleAccent}</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-10 text-left lg:grid-cols-[1.4fr_1fr]">
          <GoogleReCaptchaProvider reCaptchaKey={env.VITE_RECAPTCHA_SITE_KEY}>
            <ContactForm
              schema={schema}
              labels={{
                name: t.contact.form.name,
                namePlaceholder: t.contact.form.namePlaceholder,
                email: t.contact.form.email,
                emailPlaceholder: t.contact.form.emailPlaceholder,
                message: t.contact.form.message,
                messagePlaceholder: t.contact.form.messagePlaceholder,
                submit: t.contact.form.submit,
                sending: t.contact.form.sending,
                success: t.contact.form.success,
                error: t.contact.form.error,
              }}
            />
          </GoogleReCaptchaProvider>

          <aside className="flex flex-col gap-8">
            <div>
              <p className="eyebrow">{t.contact.findMe}</p>

              <ul className="mt-4 divide-y divide-border/60 border-t border-border/60">
                {SOCIAL_ITEMS.map(({ key, href, label, icon: Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between py-3 text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="size-4 text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white" />
                        {label}
                      </span>

                      <ArrowUpRight className="size-4 text-neutral-600 transition group-hover:text-gold-400" />
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="group flex items-center justify-between py-3 text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="size-4 text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white" />
                      Email
                    </span>

                    <ArrowUpRight className="size-4 text-neutral-600 transition group-hover:text-gold-400" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border/60 bg-white/3 p-5">
              <p className="eyebrow">{t.contact.responseTime.title}</p>

              <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">
                {t.contact.responseTime.text}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
