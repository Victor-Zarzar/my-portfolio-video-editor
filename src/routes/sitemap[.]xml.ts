import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/config/site-config";
import { routeTree } from "@/routeTree.gen";

const ROUTE_BLACKLIST = new Set<string>([
	// "/dashboard", // ex: routes privates and publics.
]);

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () => {
				const paths = getRoutePaths(routeTree);
				const lastmod = new Date().toISOString().split("T")[0];

				const urls = [...new Set(paths.filter(shouldIncludeInSitemap))].map(
					(path) => `${SITE_URL}${path === "/" ? "" : path}`,
				);

				const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

				return new Response(sitemap, {
					headers: { "Content-Type": "application/xml; charset=utf-8" },
				});
			},
		},
	},
});

function getRoutePaths(node: any, acc: string[] = []): string[] {
	if (node?.fullPath) acc.push(node.fullPath);
	for (const child of Object.values(node?.children ?? {})) {
		getRoutePaths(child, acc);
	}
	return acc;
}

function shouldIncludeInSitemap(path: string): boolean {
	if (ROUTE_BLACKLIST.has(path)) return false;
	if (path.includes(".")) return false; // sitemap.xml, robots.txt, etc
	if (path.includes("$") || path.includes(":")) return false; // dinamic routes
	if (path.includes("_")) return false; // layout routes (_layout)
	return true;
}

const AMPERSAND_REGEX = /&/g;
const LT_REGEX = /</g;
const GT_REGEX = />/g;
const QUOTE_REGEX = /"/g;
const APOS_REGEX = /'/g;

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(AMPERSAND_REGEX, "&amp;")
		.replace(LT_REGEX, "&lt;")
		.replace(GT_REGEX, "&gt;")
		.replace(QUOTE_REGEX, "&quot;")
		.replace(APOS_REGEX, "&apos;");
}
