export const locales = ["pt-BR", "en-US", "es-ES"] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
  "es-ES": "ES",
}

export const translations = {
  "pt-BR": {
    seo: {
      title: "Victor Zarzar — Filmmaker & Editor de Vídeo",
      description:
        "Portfólio de Victor Zarzar: produção e edição de vídeo, direção e finalização para marcas e projetos autorais.",
      keywords: [
        "Victor Zarzar",
        "editor de vídeo",
        "filmmaker",
        "produção audiovisual",
      ],
    },
    meta: {
      title: "Victor Zarzar — Video Editor & Filmmaker",
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
      toggle: "Alternar tema",
      light: "Claro",
      dark: "Escuro",
      system: "Sistema",
    },
    hero: {
      eyebrow: "Video editor · Filmmaker · Audiovisual",
      alt: "Victor Zarzar filmando com uma câmera de cinema",
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
      title1: "Fora do terminal, ",
      titleAccent: "outras histórias",
      p1: "Sou um profissional de TI com alguns anos de experiência em desenvolvimento de software, apaixonado por café, guitarra e rock n' roll. Coleciono discos de vinil e, mais recentemente, venho me dedicando aos estudos e à exploração do audiovisual.",
      p2: "Fora do terminal, encontrei no audiovisual uma outra forma de criar, observar e contar histórias. Venho explorando principalmente edição de vídeo, narrativa, fotografia, direção e pós-produção, reunindo aqui alguns dos meus estudos e projetos enquanto continuo desenvolvendo meu olhar e minha linguagem através da prática.",
      years: "Anos",
      projects: "Projetos",
      awards: "Prêmios",
      portraitAlt: "Retrato de Victor Zarzar",
    },
    contact: {
      eyebrow: "Próximo projeto",
      title1: "Vamos colocar sua ideia ",
      titleAccent: "na tela",
      subtitle:
        "Tem um projeto em mente ou só quer dizer oi? Me manda uma mensagem.",
      findMe: "Me encontre em",
      form: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "E-mail",
        emailPlaceholder: "seu@email.com",
        message: "Mensagem",
        messagePlaceholder: "Conta sobre seu projeto ou só diz oi...",
        submit: "Enviar mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada, obrigado!",
        error: "Algo deu errado. Tenta de novo ou manda direto pra",
        errors: {
          nameTooShort: "Nome muito curto",
          emailInvalid: "E-mail inválido",
          messageTooShort: "Conta um pouco mais",
        },
      },
      responseTime: {
        title: "Tempo de resposta",
        text: "Costumo responder em 1–2 dias úteis. Pra assuntos urgentes, e-mail é o melhor caminho.",
      },
    },
    footer: {
      tagline:
        "Video editor e filmmaker construindo histórias quadro a quadro.",
      rightsReserved: "Todos os direitos reservados.",
    },
    notFound: {
      title: "404",
      heading: "Página não encontrada",
      text: "A página que você procura não existe ou foi movida.",
      cta: "Voltar ao início",
    },
    error: {
      heading: "Esta página não carregou",
      text: "Algo deu errado do nosso lado. Você pode tentar novamente ou voltar ao início.",
      retry: "Tentar novamente",
      home: "Voltar ao início",
      sentry: "Ocorreu um erro. Nossa equipe foi notificada.",
    },
  },
  "en-US": {
    seo: {
      title: "Victor Zarzar — Filmmaker & Video Editor",
      description:
        "Victor Zarzar's portfolio: video production and editing, direction and post-production for brands and personal projects.",
      keywords: [
        "Victor Zarzar",
        "video editor",
        "filmmaker",
        "video production",
      ],
    },
    meta: {
      title: "Victor Zarzar — Video Editor & Filmmaker",
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
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    hero: {
      eyebrow: "Video editor · Filmmaker · Audiovisual",
      alt: "Victor Zarzar filming with a cinema camera",
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
      title1: "Beyond the terminal, ",
      titleAccent: "other stories",
      p1: "I'm an IT professional with a few years of experience in software development, passionate about coffee, guitar and rock 'n' roll. I collect vinyl records and, more recently, I've been dedicating myself to studying and exploring the audiovisual world.",
      p2: "Beyond the terminal, I found audiovisual work to be another way to create, observe and tell stories. I've been exploring video editing, storytelling, photography, directing and post-production, bringing together some of my studies and projects here as I continue developing my visual perspective and creative language through practice.",
      years: "Years",
      projects: "Projects",
      awards: "Awards",
      portraitAlt: "Portrait of Victor Zarzar",
    },
    contact: {
      eyebrow: "Next project",
      title1: "Let's put your idea ",
      titleAccent: "on screen",
      subtitle:
        "Have a project in mind or just want to say hi? Send me a message.",
      findMe: "Find me on",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        message: "Message",
        messagePlaceholder: "Tell me about your project or just say hi...",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent, thank you!",
        error: "Something went wrong. Try again or reach out directly at",
        errors: {
          nameTooShort: "Name is too short",
          emailInvalid: "Invalid email",
          messageTooShort: "Tell me a bit more",
        },
      },
      responseTime: {
        title: "Response time",
        text: "I typically respond within 1–2 business days. For urgent matters, email works best.",
      },
    },
    footer: {
      tagline: "Video editor & filmmaker crafting stories frame by frame.",
      rightsReserved: "All rights reserved.",
    },
    notFound: {
      title: "404",
      heading: "Page not found",
      text: "The page you're looking for doesn't exist or has been moved.",
      cta: "Go home",
    },
    error: {
      heading: "This page didn't load",
      text: "Something went wrong on our end. You can try refreshing or head back home.",
      retry: "Try again",
      home: "Go home",
      sentry: "An error has occurred. Our team has been notified.",
    },
  },
  "es-ES": {
    seo: {
      title: "Victor Zarzar — Filmmaker y Editor de Vídeo",
      description:
        "Portafolio de Victor Zarzar: producción y edición de vídeo, dirección y postproducción para marcas y proyectos propios.",
      keywords: [
        "Victor Zarzar",
        "editor de vídeo",
        "filmmaker",
        "producción audiovisual",
      ],
    },
    meta: {
      title: "Victor Zarzar — Editor de Vídeo & Cineasta",
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
      toggle: "Alternar tema",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
    },
    hero: {
      eyebrow: "Editor de vídeo · Cineasta · Audiovisual",
      alt: "Victor Zarzar filmando con una cámara de cine",
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
      title1: "Fuera del terminal, ",
      titleAccent: "otras historias",
      p1: "Soy profesional de TI con algunos años de experiencia en desarrollo de software, apasionado por el café, la guitarra y el rock n' roll. Colecciono discos de vinilo y, más recientemente, me he dedicado a estudiar y explorar el mundo audiovisual.",
      p2: "Fuera del terminal, encontré en el audiovisual otra forma de crear, observar y contar historias. He estado explorando principalmente la edición de vídeo, la narrativa, la fotografía, la dirección y la posproducción, reuniendo aquí algunos de mis estudios y proyectos mientras sigo desarrollando mi mirada y mi lenguaje creativo a través de la práctica.",
      years: "Años",
      projects: "Proyectos",
      awards: "Premios",
      portraitAlt: "Retrato de Victor Zarzar",
    },
    contact: {
      eyebrow: "Próximo proyecto",
      title1: "Pongamos tu idea ",
      titleAccent: "en pantalla",
      subtitle:
        "¿Tienes un proyecto en mente o solo quieres saludar? Mándame un mensaje.",
      findMe: "Encuéntrame en",
      form: {
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Correo electrónico",
        emailPlaceholder: "tu@email.com",
        message: "Mensaje",
        messagePlaceholder: "Cuéntame sobre tu proyecto o solo di hola...",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado, gracias!",
        error: "Algo salió mal. Intenta de nuevo o escribe directamente a",
        errors: {
          nameTooShort: "Nombre muy corto",
          emailInvalid: "Correo inválido",
          messageTooShort: "Cuéntame un poco más",
        },
      },
      responseTime: {
        title: "Tiempo de respuesta",
        text: "Suelo responder en 1–2 días hábiles. Para asuntos urgentes, el correo es lo mejor.",
      },
    },
    footer: {
      tagline:
        "Editor de vídeo y cineasta construyendo historias fotograma a fotograma.",
      rightsReserved: "Todos los derechos reservados.",
    },
    notFound: {
      title: "404",
      heading: "Página no encontrada",
      text: "La página que buscas no existe o ha sido movida.",
      cta: "Volver al inicio",
    },
    error: {
      heading: "Esta página no cargó",
      text: "Algo salió mal de nuestro lado. Puedes intentar de nuevo o volver al inicio.",
      retry: "Intentar de nuevo",
      home: "Volver al inicio",
      sentry: "Ha ocurrido un error. Nuestro equipo ha sido notificado.",
    },
  },
} as const

export type Dictionary = (typeof translations)["pt-BR"]
