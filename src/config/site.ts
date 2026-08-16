// ---------------------------------------------------------------------------
// Single source of truth for identity/contact data used across the site.
// TODO: swap these fictitious values for the real ones (name, email, socials).
// ---------------------------------------------------------------------------

export const SITE_FIRST_NAME = "Victor";
export const SITE_LAST_NAME = "Zarzar";
export const SITE_NAME = `${SITE_FIRST_NAME} ${SITE_LAST_NAME}`;

export const SITE_EMAIL = "vzfilms8@gmail.com";

export const SOCIAL_LINKS = {
	instagram: "https://instagram.com/vzfilms8",
	facebook: "https://facebook.com/vzfilms8",
	vimeo: "https://vimeo.com/vzfilms8",
	youtube: "https://youtube.com/@vzfilms8",
} as const;
