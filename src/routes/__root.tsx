import { Button } from "@base-ui/react/button";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { SEO_CONFIG, SITE_NAME, SITE_URL } from "#/config/site-config";
import { reportAppError } from "#/lib/error-reporting";
import { ThemeProvider } from "#/shared/common/theme-provider.tsx";
import { DEFAULT_LOCALE, I18nProvider, useI18n } from "../i18n";
import { translations } from "../i18n/translations";
import appCss from "../styles.css?url";

const seo = translations[DEFAULT_LOCALE].seo;

function NotFoundComponent() {
	const { t } = useI18n();
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="max-w-md text-center">
				<h1 className="text-7xla font-bold text-foreground">
					{t.notFound.title}
				</h1>
				<h2 className="mt-4 text-xl font-semibold text-foreground">
					{t.notFound.heading}
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">{t.notFound.text}</p>
				<div className="mt-6">
					<Link
						to="/"
						className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						{t.notFound.cta}
					</Link>
				</div>
			</div>
		</div>
	);
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
	console.error(error);
	const router = useRouter();
	const { t } = useI18n();
	useEffect(() => {
		reportAppError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="max-w-md text-center">
				<h1 className="text-xl font-semibold tracking-tight text-foreground">
					{t.error.heading}
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">{t.error.text}</p>
				<div className="mt-6 flex flex-wrap justify-center gap-2">
					<Button
						onClick={() => {
							router.invalidate();
							reset();
						}}
						className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						{t.error.retry}
					</Button>
					<a
						href="/"
						className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
					>
						{t.error.home}
					</a>
				</div>
			</div>
		</div>
	);
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: ({ matches }) => {
			const pathname = matches[matches.length - 1]?.pathname ?? "/";
			const canonical =
				pathname === "/" ? SITE_URL || "/" : `${SITE_URL}${pathname}`;
			const ogImage = `${SITE_URL}${SEO_CONFIG.images.ogImage}`;

			return {
				meta: [
					{ charSet: "utf-8" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ title: seo.title },
					{ name: "description", content: seo.description },
					{ name: "keywords", content: seo.keywords.join(", ") },
					{ name: "author", content: SITE_NAME },
					{ name: "robots", content: SEO_CONFIG.robots.meta },

					// Open Graph
					{ property: "og:title", content: seo.title },
					{ property: "og:description", content: seo.description },
					{ property: "og:image", content: ogImage },
					{ property: "og:type", content: "website" },
					...(SITE_URL ? [{ property: "og:url", content: canonical }] : []),

					// Twitter Card
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "twitter:title", content: seo.title },
					{ name: "twitter:description", content: seo.description },
					{ name: "twitter:image", content: ogImage },
					...(SEO_CONFIG.twitterHandle
						? [{ name: "twitter:site", content: SEO_CONFIG.twitterHandle }]
						: []),
				],
				links: [
					...(SITE_URL ? [{ rel: "canonical", href: canonical }] : []),
					{ rel: "preconnect", href: "https://fonts.googleapis.com" },
					{
						rel: "preconnect",
						href: "https://fonts.gstatic.com",
						crossOrigin: "anonymous",
					},
					{
						rel: "stylesheet",
						href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
					},
					{ rel: "stylesheet", href: appCss },
					{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
				],
			};
		},
		shellComponent: RootShell,
		component: RootComponent,
		notFoundComponent: NotFoundComponent,
		errorComponent: ErrorComponent,
	},
);

function RootShell({ children }: { children: ReactNode }) {
	return (
		<html lang={DEFAULT_LOCALE} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootComponent() {
	const { queryClient } = Route.useRouteContext();

	return (
		<QueryClientProvider client={queryClient}>
			<I18nProvider>
				<ThemeProvider defaultTheme="system" storageKey="theme">
					{/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
					<Outlet />
				</ThemeProvider>
			</I18nProvider>
		</QueryClientProvider>
	);
}
