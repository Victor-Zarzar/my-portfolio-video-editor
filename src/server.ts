import { wrapFetchWithSentry } from "@sentry/tanstackstart-react"
import handler, { createServerEntry } from "@tanstack/react-start/server-entry"
import { paraglideMiddleware } from "./paraglide/server.js"

const requestHandler = wrapFetchWithSentry({
  fetch(request: Request) {
    return paraglideMiddleware(request, () => handler.fetch(request))
  },
})

export default createServerEntry(requestHandler)
