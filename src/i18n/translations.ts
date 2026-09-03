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
      title: "Vz Films — Filmmaker & Editor de Vídeo",
      description:
        "Portfólio de Vz Films: produção e edição de vídeo, direção e finalização para marcas e projetos autorais.",
      keywords: [
        "Vz Films",
        "editor de vídeo",
        "filmmaker",
        "produção audiovisual",
      ],
    },
    meta: {
      title: "Vz Films — Video Editor & Filmmaker",
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
      policy: "Política de Privacidade",
    },
    hero: {
      eyebrow: "Video editor · Filmmaker · Audiovisual",
      alt: "Vz Films filmando com uma câmera de cinema",
      title1: "Histórias",
      title2: "em 24 quadros",
      title3: "por segundo.",
      text: "Corto, edito e crio experiências audiovisuais únicas para marcas, artistas e produtoras — unindo imagem e som (venho me aprofundando também em mixagem musical) pra contar histórias que parecem cinema, não conteúdo.",
      cta: "Ver Trabalhos",
      note: "Disponível para novos projetos",
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
          text: "Direção de fotografia, planejamento de set e captação em cinema cameras, do roteiro à gravação.",
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
          captchaRequired: "Captcha obrigatório",
        },
      },
      responseTime: {
        title: "Tempo de resposta",
        text: "Costumo responder em 10 a 30 minutos durante os dias úteis. Pra assuntos urgentes, e-mail é o melhor caminho.",
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
    unauthorized: {
      title: "401",
      heading: "Acesso não autorizado",
      text: "Você não tem permissão para acessar esta página.",
      cta: "Voltar ao início",
    },
    privacyPolicy: {
      title: "Victor Zarzar | Política de Privacidade",
      h1: "Política de Privacidade",
      p: "Como coletamos, usamos e protegemos suas informações.",
      h2: "Última atualização: Março de 2026",
      informationCollectedTitle: "01. Informações que coletamos",
      informationCollectedDescription:
        "Coletamos apenas as informações que você fornece voluntariamente, como nome, endereço de e-mail e mensagem ao entrar em contato pelo formulário deste site. Também podemos coletar dados anônimos de navegação, como páginas visitadas e tempo de permanência, para fins de análise e melhoria da experiência.",
      howWeUseTitle: "02. Como usamos suas informações",
      howWeUseDescription:
        "As informações coletadas são usadas exclusivamente para responder às suas mensagens, melhorar a experiência de navegação neste site e, quando aplicável, enviar comunicações relevantes com o seu consentimento.",
      dataSharingTitle: "03. Compartilhamento de dados",
      dataSharingDescription:
        "Seus dados pessoais não são vendidos, negociados ou transferidos para terceiros, exceto quando necessário para operar o site por meio de provedores de serviço confiáveis, que também são obrigados a manter essas informações em sigilo.",
      cookiesTitle: "04. Cookies",
      cookiesDescription:
        "Este site pode usar cookies para melhorar sua experiência de navegação e entender como o conteúdo é utilizado. Você pode desativar os cookies nas configurações do navegador, embora isso possa afetar algumas funcionalidades.",
      rightsTitle: "05. Seus direitos",
      rightsDescription:
        "Você pode solicitar acesso, correção ou exclusão dos seus dados pessoais a qualquer momento, quando aplicável pela legislação vigente. Para isso, utilize os canais de contato disponíveis neste site.",
      changesTitle: "06. Alterações nesta política",
      changesDescription:
        "Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças neste site, em seus serviços ou em obrigações legais. Recomendamos revisar esta página sempre que necessário.",
      contactTitle: "07. Contato",
      contactDescription:
        "Caso tenha dúvidas sobre esta Política de Privacidade ou sobre como suas informações são tratadas, entre em contato pelo formulário disponível neste site.",
    },
    cookieConsent: {
      message: "Usamos cookies para melhorar sua experiência.",
      privacyLink: "Política de Privacidade",
      accept: "Aceitar",
      decline: "Recusar",
    },
  },
  "en-US": {
    seo: {
      title: "Vz Films — Filmmaker & Video Editor",
      description:
        "Vz Films' portfolio: video production and editing, direction and post-production for brands and personal projects.",
      keywords: ["Vz Films", "video editor", "filmmaker", "video production"],
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
      policy: "Privacy Policy",
    },
    hero: {
      eyebrow: "Video editor · Filmmaker · Audiovisual",
      alt: "Vz Films filming with a cinema camera",
      title1: "Stories",
      title2: "at 24 frames",
      title3: "per second.",
      text: "I cut, edit and craft unique audiovisual experiences for brands, artists and production houses — blending image and sound (I'm also diving into music mixing) to tell stories that feel like cinema, not content.",
      cta: "View Work",
      note: "Available for new projects",
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
          text: "Cinematography, set planning and shooting on cinema cameras, from script to footage.",
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
          captchaRequired: "Mandatory Captcha",
        },
      },
      responseTime: {
        title: "Response time",
        text: "I usually respond within 10 to 30 minutes on business days. For urgent matters, email is the best way to reach me.",
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
    unauthorized: {
      title: "401",
      heading: "Unauthorized access",
      text: "You don't have permission to access this page.",
      cta: "Go home",
    },
    privacyPolicy: {
      title: "Victor Zarzar | Privacy Policy",
      h1: "Privacy Policy",
      p: "How we collect, use and protect your information.",
      h2: "Last updated: March 2026",
      informationCollectedTitle: "01. Information we collect",
      informationCollectedDescription:
        "We only collect information you voluntarily provide, such as name, email address and message when you contact us through this site's form. We may also collect anonymous browsing data, such as pages visited and time spent, for analytics and to improve your experience.",
      howWeUseTitle: "02. How we use your information",
      howWeUseDescription:
        "The information collected is used exclusively to respond to your messages, improve the browsing experience on this site and, when applicable, send relevant communications with your consent.",
      dataSharingTitle: "03. Data sharing",
      dataSharingDescription:
        "Your personal data is not sold, traded or transferred to third parties, except when necessary to operate the site through trusted service providers, who are also required to keep this information confidential.",
      cookiesTitle: "04. Cookies",
      cookiesDescription:
        "This site may use cookies to improve your browsing experience and understand how content is used. You can disable cookies in your browser settings, although this may affect some functionality.",
      rightsTitle: "05. Your rights",
      rightsDescription:
        "You may request access to, correction of, or deletion of your personal data at any time, where applicable under current legislation. To do so, use the contact channels available on this site.",
      changesTitle: "06. Changes to this policy",
      changesDescription:
        "This Privacy Policy may be updated periodically to reflect changes to this site, its services or legal obligations. We recommend reviewing this page whenever necessary.",
      contactTitle: "07. Contact",
      contactDescription:
        "If you have questions about this Privacy Policy or how your information is handled, please reach out through the contact form available on this site.",
    },
    cookieConsent: {
      message: "We use cookies to improve your experience.",
      privacyLink: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
    },
  },
  "es-ES": {
    seo: {
      title: "Vz Films — Filmmaker y Editor de Vídeo",
      description:
        "Portafolio de Vz Films: producción y edición de vídeo, dirección y postproducción para marcas y proyectos propios.",
      keywords: [
        "Vz Films",
        "editor de vídeo",
        "filmmaker",
        "producción audiovisual",
      ],
    },
    meta: {
      title: "Vz Films — Editor de Vídeo & Cineasta",
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
      policy: "Política de Privacidade",
    },
    hero: {
      eyebrow: "Editor de vídeo · Cineasta · Audiovisual",
      alt: "Vz Films filmando con una cámara de cine",
      title1: "Historias",
      title2: "a 24 cuadros",
      title3: "por segundo.",
      text: "Corto, edito y creo experiencias audiovisuales únicas para marcas, artistas y productoras — uniendo imagen y sonido (también me estoy adentrando en la mezcla musical) para contar historias que parecen cine, no contenido.",
      cta: "Ver Trabajos",
      note: "Disponible para nuevos proyectos",
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
          text: "Dirección de fotografía, planificación de set y rodaje en cámaras de cine, del guion a la grabación.",
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
          captchaRequired: "Captcha obligatorio",
        },
      },
      responseTime: {
        title: "Tiempo de respuesta",
        text: "Suelo responder en 10 a 30 minutos durante los días laborables. Para asuntos urgentes, el correo electrónico es la mejor opción.",
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
    unauthorized: {
      title: "401",
      heading: "Acceso no autorizado",
      text: "No tienes permiso para acceder a esta página.",
      cta: "Volver al inicio",
    },
    privacyPolicy: {
      title: "Victor Zarzar | Política de Privacidad",
      h1: "Política de Privacidad",
      p: "Cómo recopilamos, usamos y protegemos tu información.",
      h2: "Última actualización: Marzo de 2026",
      informationCollectedTitle: "01. Información que recopilamos",
      informationCollectedDescription:
        "Solo recopilamos la información que proporcionas voluntariamente, como nombre, correo electrónico y mensaje al contactarnos a través del formulario de este sitio. También podemos recopilar datos anónimos de navegación, como páginas visitadas y tiempo de permanencia, con fines de análisis y mejora de la experiencia.",
      howWeUseTitle: "02. Cómo usamos tu información",
      howWeUseDescription:
        "La información recopilada se utiliza exclusivamente para responder a tus mensajes, mejorar la experiencia de navegación en este sitio y, cuando corresponda, enviar comunicaciones relevantes con tu consentimiento.",
      dataSharingTitle: "03. Compartición de datos",
      dataSharingDescription:
        "Tus datos personales no se venden, negocian ni transfieren a terceros, excepto cuando sea necesario para operar el sitio a través de proveedores de servicios confiables, quienes también están obligados a mantener esta información en confidencialidad.",
      cookiesTitle: "04. Cookies",
      cookiesDescription:
        "Este sitio puede usar cookies para mejorar tu experiencia de navegación y entender cómo se utiliza el contenido. Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades.",
      rightsTitle: "05. Tus derechos",
      rightsDescription:
        "Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier momento, cuando sea aplicable según la legislación vigente. Para ello, utiliza los canales de contacto disponibles en este sitio.",
      changesTitle: "06. Cambios en esta política",
      changesDescription:
        "Esta Política de Privacidad puede actualizarse periódicamente para reflejar cambios en este sitio, en sus servicios o en obligaciones legales. Recomendamos revisar esta página cuando sea necesario.",
      contactTitle: "07. Contacto",
      contactDescription:
        "Si tienes dudas sobre esta Política de Privacidad o sobre cómo se trata tu información, contáctanos a través del formulario disponible en este sitio.",
    },
    cookieConsent: {
      message: "Usamos cookies para mejorar tu experiencia.",
      privacyLink: "Política de Privacidad",
      accept: "Aceptar",
      decline: "Rechazar",
    },
  },
} as const

export type Dictionary = (typeof translations)["pt-BR"]
