import { useEffect, useState } from "react"
import { m } from "#/paraglide/messages"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Skeleton } from "@/shared/ui/skeleton"
import { Image } from "../features/image-hero"
import { getEmbedSrc, parseVideoUrl } from "../lib/video-embed"
import type { Work } from "../types/works/works"
import { Button } from "../ui/button"

type Props = { work: Work | null; onClose: () => void }

export function WorkDialog({ work, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const video = work?.videoUrl ? parseVideoUrl(work.videoUrl) : null
  const fullSrc = video ? getEmbedSrc(video, "full") : null
  const isInstagram = video?.provider === "instagram"

  useEffect(() => {
    setLoaded(false)
  }, [work?.id])

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
    <Dialog
      open={!!work}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,64rem)] max-w-none gap-0 border-border/60 p-0 sm:max-w-none"
      >
        {work && (
          <div className="grid md:grid-cols-[1.6fr_1fr]">
            <div
              className={`relative overflow-hidden bg-black ${
                isInstagram ? "aspect-4/5" : "aspect-video"
              }`}
            >
              <Image
                src={work.src}
                srcSet={work.srcSet}
                sizes="(min-width: 768px) 640px, 92vw"
                alt={fullSrc ? "" : work.title}
                width={1024}
                height={768}
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />

              {fullSrc && !loaded && (
                <Skeleton className="absolute inset-0 rounded-none bg-black/40" />
              )}

              {fullSrc && (
                <iframe
                  src={fullSrc}
                  title={work.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  onLoad={() => setLoaded(true)}
                  className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="text-xl font-bold">
                    {work.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm">
                    {work.kind}
                  </DialogDescription>
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-none border-gold text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-primary-foreground dark:border-gold dark:bg-transparent dark:hover:bg-gold dark:hover:text-primary-foreground"
                >
                  {copied ? m.works_dialog_copied() : m.works_dialog_share()}
                </Button>

                <DialogClose
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      className="rounded-none text-xs uppercase tracking-[0.22em] text-muted-foreground hover:bg-transparent hover:text-foreground"
                    />
                  }
                >
                  {m.works_dialog_close()}
                </DialogClose>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
