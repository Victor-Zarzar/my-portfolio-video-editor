export type WorkCredit = { role: string; name: string }

export type WorkItem = {
  id: string
  src: string
  srcSet: string
  year: string
  title: () => string
  kind: () => string
  description?: () => string
  credits?: WorkCredit[]
  preview?: { mp4: string; webm?: string }
  embedUrl?: string
}

export type Work = Omit<WorkItem, "title" | "kind" | "description"> & {
  title: string
  kind: string
  description?: string
}
