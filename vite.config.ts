import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

const envSchema = z.object({
	VITE_APP_URL: z.url(),
});

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	envSchema.parse(env);

	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			devtools(),
			netlify(),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});
