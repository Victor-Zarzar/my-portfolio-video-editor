import {
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@sentry/tanstackstart-react"
import { createCsrfMiddleware, createStart } from "@tanstack/react-start"
import { securityHeadersMiddleware } from "./lib/security-headers"

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      securityHeadersMiddleware,
      csrfMiddleware,
      sentryGlobalRequestMiddleware,
    ],
    functionMiddleware: [sentryGlobalFunctionMiddleware],
  }
})
