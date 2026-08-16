export const locales = ["pt-BR", "en-US", "es-ES"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
	"pt-BR": "PT",
	"en-US": "EN",
	"es-ES": "ES",
};

export const translations = {
	"pt-BR": {
		meta: {
			title: "Vitor Rocha — Video Editor & Filmmaker",
			description:
				"Filmmaker e video editor. Comerciais, clipes e documentários com direção de fotografia cinematográfica e color grading autoral.",
			ogDescription:
				"Portfólio de filmes, comerciais e clipes. Edição, color grading e direção com estética cinematográfica.",
		},
		nav: {
			works: "Trabalhos",
			services: "Serviços",
			about: "Sobre",
			contact: "Contato",
		},
		hero: {
			eyebrow: "Video editor · Filmmaker · São Paulo",
			title1: "Histórias",
			title2: "em 24 quadros",
			title3: "por segundo.",
			text: "Corto, colorizo e dirijo peças audiovisuais para marcas, artistas e produtoras que querem parecer cinema — não conteúdo.",
			cta: "Ver reel",
			note: "+120 projetos entregues",
		},
		works: {
			eyebrow: "Selecionados",
			title: "Trabalhos recentes",
			range: "2024 — 2026",
			frameAlt: "Frame do projeto",
			items: [
				{ title: "Aurum", kind: "Comercial · Relojoaria" },
				{ title: "Sala de Fumaça", kind: "Clipe musical" },
				{ title: "Ofício", kind: "Documentário curto" },
				{ title: "Última Sessão", kind: "Curta-metragem" },
			],
		},
		services: {
			eyebrow: "O que eu faço",
			items: [
				{
					title: "Edição & Montagem",
					text: "Ritmo, narrativa e corte fino. Da seleção de takes ao master final entregue em qualquer formato.",
				},
				{
					title: "Color Grading",
					text: "Look cinematográfico com tratamento de pele, contraste e paleta consistente em toda a peça.",
				},
				{
					title: "Direção & Captação",
					text: "Direção de fotografia, planejamento de set e captação em cinema cameras com equipe enxuta.",
				},
			],
		},
		about: {
			eyebrow: "Sobre",
			title1: "Luz, sombra e ",
			titleAccent: "tempo",
			p1: "Sou o Vitor, filmmaker e editor há doze anos. Trabalho com um método simples: entender a história antes de ligar a câmera e proteger esse fio na ilha de edição, quadro a quadro.",
			p2: "Já assinei campanhas para marcas de moda, clipes independentes e documentários exibidos em festivais nacionais.",
			years: "Anos",
			projects: "Projetos",
			awards: "Prêmios",
			portraitAlt: "Retrato do filmmaker segurando uma câmera de cinema",
		},
		contact: {
			eyebrow: "Próximo projeto",
			title1: "Vamos colocar sua ideia ",
			titleAccent: "na tela",
		},
		footer: { rights: "© 2026 Vitor Rocha" },
		heroAlt: "Frame cinematográfico de uma silhueta contra luz dourada",
	},
	"en-US": {
		meta: {
			title: "Vitor Rocha — Video Editor & Filmmaker",
			description:
				"Filmmaker and video editor. Commercials, music videos and documentaries with cinematic photography and signature color grading.",
			ogDescription:
				"A portfolio of films, commercials and music videos. Editing, color grading and directing with a cinematic look.",
		},
		nav: {
			works: "Work",
			services: "Services",
			about: "About",
			contact: "Contact",
		},
		hero: {
			eyebrow: "Video editor · Filmmaker · São Paulo",
			title1: "Stories",
			title2: "at 24 frames",
			title3: "per second.",
			text: "I cut, color and direct films for brands, artists and production houses that want to look like cinema — not content.",
			cta: "Watch reel",
			note: "+120 projects delivered",
		},
		works: {
			eyebrow: "Selected",
			title: "Recent work",
			range: "2024 — 2026",
			frameAlt: "Frame from the project",
			items: [
				{ title: "Aurum", kind: "Commercial · Watchmaking" },
				{ title: "Smoke Room", kind: "Music video" },
				{ title: "Craft", kind: "Short documentary" },
				{ title: "Last Screening", kind: "Short film" },
			],
		},
		services: {
			eyebrow: "What I do",
			items: [
				{
					title: "Editing & Assembly",
					text: "Rhythm, narrative and fine cutting. From take selection to the final master in any format.",
				},
				{
					title: "Color Grading",
					text: "A cinematic look with skin treatment, contrast and a consistent palette across the whole piece.",
				},
				{
					title: "Directing & Shooting",
					text: "Cinematography, set planning and shooting on cinema cameras with a lean crew.",
				},
			],
		},
		about: {
			eyebrow: "About",
			title1: "Light, shadow and ",
			titleAccent: "time",
			p1: "I'm Vitor, a filmmaker and editor for twelve years. My method is simple: understand the story before the camera rolls, and protect that thread in the edit, frame by frame.",
			p2: "I've directed campaigns for fashion brands, independent music videos and documentaries screened at national festivals.",
			years: "Years",
			projects: "Projects",
			awards: "Awards",
			portraitAlt: "Portrait of the filmmaker holding a cinema camera",
		},
		contact: {
			eyebrow: "Next project",
			title1: "Let's put your idea ",
			titleAccent: "on screen",
		},
		footer: { rights: "© 2026 Vitor Rocha" },
		heroAlt: "Cinematic frame of a silhouette against golden light",
	},
	"es-ES": {
		meta: {
			title: "Vitor Rocha — Editor de Vídeo & Cineasta",
			description:
				"Cineasta y editor de vídeo. Comerciales, videoclips y documentales con fotografía cinematográfica y color grading de autor.",
			ogDescription:
				"Portafolio de películas, comerciales y videoclips. Edición, etalonaje y dirección con estética de cine.",
		},
		nav: {
			works: "Trabajos",
			services: "Servicios",
			about: "Sobre mí",
			contact: "Contacto",
		},
		hero: {
			eyebrow: "Editor de vídeo · Cineasta · São Paulo",
			title1: "Historias",
			title2: "a 24 cuadros",
			title3: "por segundo.",
			text: "Monto, etalono y dirijo piezas audiovisuales para marcas, artistas y productoras que quieren parecer cine — no contenido.",
			cta: "Ver reel",
			note: "+120 proyectos entregados",
		},
		works: {
			eyebrow: "Seleccionados",
			title: "Trabajos recientes",
			range: "2024 — 2026",
			frameAlt: "Fotograma del proyecto",
			items: [
				{ title: "Aurum", kind: "Comercial · Relojería" },
				{ title: "Sala de Humo", kind: "Videoclip" },
				{ title: "Oficio", kind: "Documental corto" },
				{ title: "Última Sesión", kind: "Cortometraje" },
			],
		},
		services: {
			eyebrow: "Lo que hago",
			items: [
				{
					title: "Edición & Montaje",
					text: "Ritmo, narrativa y corte fino. De la selección de tomas al máster final en cualquier formato.",
				},
				{
					title: "Etalonaje",
					text: "Look cinematográfico con tratamiento de piel, contraste y paleta consistente en toda la pieza.",
				},
				{
					title: "Dirección & Rodaje",
					text: "Dirección de fotografía, planificación de set y rodaje en cámaras de cine con un equipo reducido.",
				},
			],
		},
		about: {
			eyebrow: "Sobre mí",
			title1: "Luz, sombra y ",
			titleAccent: "tiempo",
			p1: "Soy Vitor, cineasta y editor desde hace doce años. Mi método es simple: entender la historia antes de encender la cámara y proteger ese hilo en la sala de edición, cuadro a cuadro.",
			p2: "He firmado campañas para marcas de moda, videoclips independientes y documentales exhibidos en festivales nacionales.",
			years: "Años",
			projects: "Proyectos",
			awards: "Premios",
			portraitAlt: "Retrato del cineasta sosteniendo una cámara de cine",
		},
		contact: {
			eyebrow: "Próximo proyecto",
			title1: "Pongamos tu idea ",
			titleAccent: "en pantalla",
		},
		footer: { rights: "© 2026 Vitor Rocha" },
		heroAlt: "Fotograma cinematográfico de una silueta a contraluz dorada",
	},
} as const;

export type Dictionary = (typeof translations)["pt-BR"];
