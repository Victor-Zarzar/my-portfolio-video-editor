# Makefile - My-Portfolio-Video-Editor
DOCKER_IMAGE_NAME = my-portfolio-video-editor
DOCKER_CONTAINER_NAME = my-portfolio-video-editor
DOCKER_TAG = $(shell node -p "require('./package.json').version")
E2E_IMAGE_NAME = my-portfolio-video-editor-e2e
E2E_CONTAINER_NAME = my-portfolio-video-editor-e2e
E2E_IMAGE_TAG = $(shell node -p "require('./package.json').version")
PORT = 3000
DE = docker exec -it
DL = docker logs -f

check:
	bun run check

install:
	bun install

install-e2e:
	bunx playwright install

dev: install
	bun run dev

build:
	docker build \
		-t $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) \
		.

build-e2e:
	docker build \
		-f Dockerfile.test \
		-t $(E2E_IMAGE_NAME):$(E2E_IMAGE_TAG) \
		.

stop:
	-docker rm -f $(DOCKER_CONTAINER_NAME) >/dev/null 2>&1
	-docker rm -f $(E2E_CONTAINER_NAME)-test >/dev/null 2>&1

run: build
	docker run --rm -it \
		--name $(DOCKER_CONTAINER_NAME) \
		-p $(PORT):3000 \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/.netlify \
		$(DOCKER_IMAGE_NAME):$(DOCKER_TAG) \
		bun run dev -- --host 0.0.0.0

test-unit: build
	docker run --rm \
		--name $(DOCKER_CONTAINER_NAME)-test \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/.netlify \
		$(DOCKER_IMAGE_NAME):$(DOCKER_TAG) \
		sh -c "bun install --frozen-lockfile && bun run test:unit"

test-integration: build
	docker run --rm \
		--name $(DOCKER_CONTAINER_NAME)-test \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/.netlify \
		$(DOCKER_IMAGE_NAME):$(DOCKER_TAG) \
		sh -c "bun install --frozen-lockfile && bun run test:integration"

test-e2e: build-e2e
	docker run --rm \
		--name $(E2E_CONTAINER_NAME)-test \
		--env-file .env \
		-e CI=true \
		-p $(PORT):3000 \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/.netlify \
		$(E2E_IMAGE_NAME):$(E2E_IMAGE_TAG) \
		bun run test:e2e

clean: stop
	docker rmi -f $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) >/dev/null 2>&1 || true
	docker rmi -f $(E2E_IMAGE_NAME):$(E2E_IMAGE_TAG) >/dev/null 2>&1 || true
	rm -rf node_modules .netlify .tanstack dist tsconfig.tsbuildinfo playwright-report test-results

logs:
	$(DL) $(DOCKER_CONTAINER_NAME)

shell:
	$(DE) $(DOCKER_CONTAINER_NAME) sh

help:
	@echo ""
	@echo "$(DOCKER_IMAGE_NAME) v$(DOCKER_TAG)"
	@echo "──────────────────────────────────────────────"
	@echo ""
	@echo "Local Commands:"
	@echo "  make install            Install dependencies using bun"
	@echo "  make install-e2e        Install Playwright dependencies"
	@echo "  make check              Run typecheck, lint, and typegen"
	@echo "  make dev                Run the app locally in development mode"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make build              Build the Docker image"
	@echo "  make build-e2e          Build the E2E Docker image (Dockerfile.test)"
	@echo "  make run                Run the application with Docker"
	@echo "  make stop               Stop and remove containers"
	@echo "  make test-e2e           Run E2E tests with Playwright"
	@echo "  make clean              Remove images and clean environment"
	@echo "  make logs               Show container logs"
	@echo "  make shell              Access container shell"
	@echo ""
