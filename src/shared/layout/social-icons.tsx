import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			aria-hidden="true"
			{...props}
		>
			<rect x="3" y="3" width="18" height="18" rx="5" />
			<circle cx="12" cy="12" r="4.2" />
			<circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
		</svg>
	);
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			aria-hidden="true"
			{...props}
		>
			<rect x="3" y="3" width="18" height="18" rx="5" />
			<path d="M14 8.5h-1.6c-.9 0-1.4.5-1.4 1.4V11h3l-.4 3h-2.6v6.5" />
		</svg>
	);
}

export function VimeoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			aria-hidden="true"
			{...props}
		>
			<path d="M22 7.4c-.9 5.7-4.3 11.5-7 14.4-2.6-.5-3.1-4.2-3.9-8.3-.6-3.1-1-3.5-2.4-2.3L7.5 12c1.8-2.6 4.5-5.9 6.3-6.1 1.6-.2 2.6 1 3 3.2.4-1.9 1.7-3.9 4-3.7.9.1 1.4.9 1.2 2z" />
		</svg>
	);
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			aria-hidden="true"
			{...props}
		>
			<rect x="2.5" y="6" width="19" height="12" rx="4" />
			<path
				d="M10.5 9.5v5l4.3-2.5-4.3-2.5z"
				fill="currentColor"
				stroke="none"
			/>
		</svg>
	);
}
