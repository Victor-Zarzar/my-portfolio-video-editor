import type { ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import {
	type Dictionary,
	type Locale,
	locales,
	translations,
} from "./translations";

const COOKIE_NAME = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const DEFAULT_LOCALE: Locale = "pt-BR";

type I18nValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
	return !!value && (locales as readonly string[]).includes(value);
}

function readCookie(): string | null {
	const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
	return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(value: Locale) {
	document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function detectLocale(): Locale {
	const stored = readCookie();
	if (isLocale(stored)) return stored;
	const nav = navigator.language.toLowerCase();
	if (nav.startsWith("en")) return "en-US";
	if (nav.startsWith("es")) return "es-ES";
	return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

	useEffect(() => {
		setLocaleState(detectLocale());
	}, []);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		writeCookie(next);
	}, []);

	const value = useMemo<I18nValue>(
		() => ({ locale, setLocale, t: translations[locale] as Dictionary }),
		[locale, setLocale],
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used within I18nProvider");
	return ctx;
}

export type { Locale } from "./translations";
export { localeLabels, locales } from "./translations";
