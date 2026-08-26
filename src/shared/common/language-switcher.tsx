import { localeLabels, locales, useI18n } from "@/i18n"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-1 text-[0.65rem] tracking-[0.18em] uppercase">
      {locales.map((code, i) => (
        <span
          key={code}
          className="flex items-center gap-1"
        >
          {i > 0 && <span className="text-border">/</span>}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={
              locale === code
                ? "text-gold transition-colors"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {localeLabels[code]}
          </button>
        </span>
      ))}
    </div>
  )
}
