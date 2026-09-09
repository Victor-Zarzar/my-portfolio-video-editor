import { ArrowUpRight } from "lucide-react"
import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { SITE_EMAIL, SOCIAL_LINKS } from "#/config/app-config"
import { env } from "#/env"
import { m } from "#/paraglide/messages"
import { getLocale } from "#/paraglide/runtime"
import { ContactForm } from "#/shared/features/contact-form"
import { createContactSchema } from "../lib/contact-schema"
import {
  EmailIcon,
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
  {
    key: "email",
    href: `mailto:${SITE_EMAIL}`,
    label: "Email",
    icon: EmailIcon,
  },
] as const

export function ContactSection() {
  const schema = React.useMemo(
    () =>
      createContactSchema({
        nameTooShort: m.contact_form_errors_name_too_short(),
        emailInvalid: m.contact_form_errors_email_invalid(),
        messageTooShort: m.contact_form_errors_message_too_short(),
        captchaRequired: m.contact_form_errors_captcha_required(),
      }),
    [getLocale()]
  )

  return (
    <section
      id="contact"
      className="border-t border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="text-center">
          <p className="eyebrow">{m.contact_eyebrow()}</p>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {m.contact_title1()}
            <span className="text-gold-gradient">
              {m.contact_title_accent()}
            </span>
            .
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {m.contact_subtitle()}
          </p>
        </div>

        <div className="mt-14 grid gap-10 text-left lg:grid-cols-[1.4fr_1fr]">
          <GoogleReCaptchaProvider reCaptchaKey={env.VITE_RECAPTCHA_SITE_KEY}>
            <ContactForm
              schema={schema}
              labels={{
                name: m.contact_form_name(),
                namePlaceholder: m.contact_form_name_placeholder(),
                email: m.contact_form_email(),
                emailPlaceholder: m.contact_form_email_placeholder(),
                message: m.contact_form_message(),
                messagePlaceholder: m.contact_form_message_placeholder(),
                submit: m.contact_form_submit(),
                sending: m.contact_form_sending(),
                success: m.contact_form_success(),
                error: m.contact_form_error(),
              }}
            />
          </GoogleReCaptchaProvider>

          <aside className="flex flex-col gap-8">
            <div>
              <p className="eyebrow">{m.contact_find_me()}</p>

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
              </ul>
            </div>

            <div className="rounded-lg border border-border/60 bg-white/3 p-5">
              <p className="eyebrow">{m.contact_response_time_title()}</p>

              <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">
                {m.contact_response_time_text()}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
