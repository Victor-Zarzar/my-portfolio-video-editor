import { getLocale, type Locale, locales, setLocale } from "#/paraglide/runtime"

const localeLabels: Record<Locale, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
  "es-ES": "ES",
}

export function LanguageSwitcher() {
  const currentLocale = getLocale()

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
            aria-pressed={currentLocale === code}
            className={
              currentLocale === code
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
