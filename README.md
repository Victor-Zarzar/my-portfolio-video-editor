<h1 align="center" id="header">
    My Portfolio Video Editor
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TanStack_Start-EF4444?style=for-the-badge&logo=react&logoColor=white" alt="TanStack Start">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun">
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod">
  <img src="https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white" alt="Biome">
  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="Sentry">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify">
</p>

<p align="center">
  Video editor web application built with TanStack Start, TanStack Router, React 19,
  TypeScript, Vite, and Tailwind CSS v4 — with internationalization, accessible UI
  components, rate limiting, and bot protection.
</p>

---

<h2 id="table-of-contents">Table of Contents</h2>

- [Tech Stack](#stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

<h2 id="stack">Tech Stack</h2>

<p>
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/HTML.svg" width="48" title="HTML5">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TailwindCSS-Dark.svg" width="48" title="TailwindCSS">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/React-Dark.svg" width="48" title="React.js">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TypeScript.svg" width="48" title="TypeScript">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Vite-Dark.svg" width="48" title="Vite">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Netlify-Dark.svg" width="48" title="Netlify">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Sentry.svg" width="48" title="Sentry">
</p>

### Core Technologies

- **TypeScript** - Type-safe development
- **React 19** - Latest React features
- **TanStack Start** - Full-stack React framework
- **TanStack Router** - Type-safe, file-based routing
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Bun** - Primary runtime, package manager & test runner

### Features & Integrations

- **TanStack Query** - Async state management and data fetching
- **TanStack Pacer** - Debouncing, throttling and rate control utilities
- **Base UI + Shadcn** - Accessible, unstyled-first component primitives
- **Motion** - Animations and transitions
- **Embla Carousel** - Lightweight carousel component
- **cmdk** - Command menu / palette
- **input-otp** - OTP input component
- **Sonner** - Toast notifications
- **Google reCAPTCHA v3** - Invisible bot protection via react-google-recaptcha-v3
- **Rate Limiter Flexible** - API endpoint rate limiting and DDoS protection
- **Zod** - Schema validation
- **T3 Env** - Type-safe environment variable validation
- **Paraglide JS (Inlang)** - Internationalization / i18n
- **Sentry** - Error tracking and performance monitoring
- **Biome** - Linting and formatting
- **Netlify** - Hosting and deployment

---

<h2 id="prerequisites">Prerequisites</h2>

Before starting, ensure you have the following installed:

- [Bun](https://bun.sh/docs) (v1 or higher) – primary runtime & package manager
- [Git](https://git-scm.com/)

> Optional: [Node.js](https://nodejs.org/) (LTS or higher), if you prefer running the app with Node or using Node-based global tooling.

---

<h2 id="installation">Installation & Setup</h2>

### 1. Clone the Repository

```bash
git clone https://github.com/Victor-Zarzar/my-portfolio-video-editor
cd my-portfolio-video-editor
```

### 2. Open in your editor (example: Zed Editor)

```bash
zed .
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Environment Configuration

Copy the example environment file and configure your credentials:

```bash
cp .env-example .env
```

Then edit `.env` with your actual values. The `.env-example` file contains detailed comments explaining each variable and how to obtain the necessary credentials.

**Key configurations needed:**

- **Sentry**: DSN and authentication token from your [Sentry project](https://sentry.io/)
- **reCAPTCHA**: Site key and secret key from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- **Website URL**: Your production domain or `http://localhost:3000` for development

> **Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

### 5. Run the Application

```bash
bun run dev
```

Access the application at `http://localhost:3000`

---

<h2 id="usage">Usage</h2>

### Available Scripts

| Command                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| `bun run dev`             | Start the development server (port 3000)     |
| `bun run build`           | Build the application for production         |
| `bun run preview`         | Preview the production build locally         |
| `bun run generate-routes` | Generate TanStack Router route tree          |
| `bun run typegen`         | Generate types (alias for `generate-routes`) |
| `bun run typecheck`       | Run TypeScript type checking                 |
| `bun run check`           | Run typecheck + lint + typegen               |
| `bun run lint`            | Check code quality with Biome                |
| `bun run lint:fix`        | Auto-fix lint issues with Biome              |
| `bun run format`          | Format code with Biome                       |
| `bun run clean`           | Remove build artifacts, caches and reports   |
| `bun run update-deps`     | Update dependencies within semver range      |
| `bun run update-latest`   | Update dependencies to their latest versions |

### Code Quality Check

Before starting development, run the checks to ensure code quality:

```bash
bun run check
```

---

<h2 id="testing">Testing</h2>

This project uses Bun's built-in test runner with React Testing Library:

```bash
bun run test:unit
```

Add your tests in the `tests/units` directory or colocate them with your components.

---

<h2 id="screenshots">Screenshots</h2>

<p align="center">
  <img width="1908" height="954" alt="og" src="https://github.com/user-attachments/assets/f9703e9a-60c8-42ac-9c0f-6167b5169d2f" />
</p>

---

<h2 id="deployment">Deployment</h2>

### Netlify (Recommended - Production)

The application is deployed on Netlify.

First, install the Netlify CLI (only needed once):

```bash
bun run install:netlifycli
```

Then deploy:

```bash
bun run deploy:dev    # Deploy a preview/draft build
bun run deploy:prod   # Deploy to production
```

**Important:** Don't forget to add all environment variables from `.env-example` to your Netlify project settings.

- **CI/CD Pipeline** - `.github/workflows/` for automated checks and releases
- **Dependabot** - Monthly dependency updates for GitHub Actions and packages

---

<h2 id="contributing">Contributing</h2>

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Report issues at: https://github.com/Victor-Zarzar/my-portfolio-video-editor/issues

---

<h2 id="license">License</h2>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<h2 id="author">Author</h2>

Victor Zarzar - [@Victor-Zarzar](https://github.com/Victor-Zarzar)

Project Link: [https://github.com/Victor-Zarzar/my-portfolio-video-editor](https://github.com/Victor-Zarzar/my-portfolio-video-editor)

---
