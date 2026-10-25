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
- [Docker](#docker)
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
- **Docker** - Containerized development and isolated E2E testing
- **Playwright** - End-to-end testing with Chromium
- **Lefthook** - Git hooks for pre-commit and pre-push checks

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
- **T3 Env** - Type-safe environment variable validation src/env => client.ts and server.ts
- **Paraglide JS (Inlang)** - Internationalization / i18n
- **Sentry** - Error tracking and performance monitoring
- **Biome** - Linting and formatting
- **Netlify** - Hosting and deployment

---

<h2 id="prerequisites">Prerequisites</h2>

Before starting, ensure you have the following installed:

- [Bun](https://bun.sh/docs) (v1 or higher) – primary runtime & package manager
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) – For isolated test runs and containerized development
- [Make](https://www.gnu.org/software/make/) – Shortcut commands for Docker workflows

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

Unit and integration tests use Bun's built-in test runner with React Testing Library
and Happy DOM. End-to-end (E2E) tests use [Playwright](https://playwright.dev/) with Chromium.

### Automated (Isolated Docker container) — Recommended

```bash
make test-unit
make test-integration
make test-e2e
```

#### E2E tests in an isolated container (OS-independent)

`make test-e2e` builds a dedicated image from `Dockerfile.test`
(`oven/bun` + project dependencies + Playwright Chromium with all system libraries)
and runs the suite inside it, loading the variables from your `.env` file.

Because the browser and every system dependency live inside the image, the
results **do not depend on your host operating system**: the same command runs
the same way on Linux, macOS and Windows, as long as Docker is available.
Nothing needs to be installed on your machine besides Docker and Make.

> **Windows note:** run `make` from **WSL2** (recommended) or Git Bash with
> Docker Desktop running. The Makefile uses `$(PWD)` and POSIX shell syntax,
> which are not available in plain `cmd`/PowerShell.

### Manual with Bun (local machine)

```bash
bun run test:unit
bun run test:integration

make install-e2e     # first time only: installs Playwright browsers locally
bun run test:e2e
```

Playwright extras:

```bash
bun run test:e2e:ui       # Interactive UI mode
bun run test:e2e:headed   # Run with a visible browser
bun run test:e2e:debug    # Step-by-step debugging
bun run test:e2e:report   # Open the last HTML report
```

> Local E2E runs use your host's browser installation and OS libraries, so
> results may vary between machines. Use `make test-e2e` for reproducible runs.

Add your tests in the `tests/units` and `tests/integration` directories, or colocate them with your components.

### Git Hooks with Lefthook

This project uses **Lefthook** to run quality checks automatically:

- **Pre-commit** — runs `bun check:commit` (Paraglide compile, typegen, typecheck, lint, unit tests and integration tests).
- **Pre-push** — runs `make test-e2e`, executing the full E2E suite inside the isolated Docker container.

Hooks are installed automatically with the project dependencies. No manual test command is required before committing or pushing.

---

<h2 id="docker">Docker</h2>

The project ships with two Dockerfiles, each with a distinct purpose:

| File              | Image name                      | Purpose                                                     |
| ----------------- | ------------------------------- | ----------------------------------------------------------- |
| `Dockerfile`      | `my-portfolio-video-editor`     | Development and unit/integration tests (Bun + project deps) |
| `Dockerfile.test` | `my-portfolio-video-editor-e2e` | E2E tests (Bun + Playwright Chromium + system libraries)    |

Images are tagged with the `version` from `package.json`, so each release gets its own tag.

### Docker Commands

| Command                 | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `make build`            | Build the main Docker image                                             |
| `make build-e2e`        | Build the E2E image from `Dockerfile.test`                              |
| `make run`              | Build and run the app in a container (port 3000, hot reload via volume) |
| `make test-unit`        | Run unit tests in an isolated container                                 |
| `make test-integration` | Run integration tests in an isolated container                          |
| `make test-e2e`         | Build the E2E image and run Playwright tests (uses `.env`, `CI=true`)   |
| `make logs`             | Follow the container logs                                               |
| `make shell`            | Open a shell inside the running container                               |
| `make stop`             | Stop and remove the app and E2E containers                              |
| `make clean`            | Stop containers, remove images and build artifacts                      |
| `make help`             | List all available commands                                             |

### Running the app with Docker

```bash
make run
```

Access the application at `http://localhost:3000`.

The project directory is mounted into the container as a volume, so code changes
are reflected immediately. `node_modules` and `.netlify` are kept as anonymous
volumes so the container's dependencies are never overwritten by your host's.

### Cleaning up

```bash
make stop    # remove running containers
make clean   # also remove images, node_modules, .netlify, .tanstack, dist, playwright-report and test-results
```

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
