import { useEffect, useRef, useState } from "react"
import { m } from "#/paraglide/messages"
import type { Work } from "../types/works/works"

type Props = { work: Work | null; onClose: () => void }

export function WorkDialog({ work, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (work && !d.open) d.showModal()
    if (!work && d.open) d.close()
  }, [work])

  const handleShare = async () => {
    if (!work) return
    const url = `${window.location.origin}${window.location.pathname}#${work.id}`
    if (navigator.share) {
      await navigator.share({ title: work.title, url }).catch(() => {})
      return
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,64rem)] border border-border/60 bg-background p-0 text-foreground backdrop:bg-black/80"
    >
      {work && (
        <div className="grid gap-0 md:grid-cols-[1.6fr_1fr]">
          <div className="aspect-video bg-black">
            {work.embedUrl ? (
              <iframe
                src={work.embedUrl}
                title={work.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <img
                src={work.src}
                alt={work.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{work.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {work.kind}
                </p>
              </div>
              <span className="text-xs tracking-[0.18em] text-gold">
                {work.year}
              </span>
            </div>

            {work.description && (
              <p className="text-sm text-muted-foreground">
                {work.description}
              </p>
            )}

            {work.credits && (
              <dl className="space-y-1 text-sm">
                {work.credits.map((c) => (
                  <div
                    key={c.role}
                    className="flex gap-2"
                  >
                    <dt className="text-muted-foreground">{c.role}:</dt>
                    <dd>{c.name}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-auto flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 border border-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                {copied ? m.works_dialog_copied() : m.works_dialog_share()}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
              >
                {m.works_dialog_close()}
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
