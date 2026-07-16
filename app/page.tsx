import Link from "next/link"
import { Settings, Sparkles, Clock, Volume2 } from "lucide-react"
import { MailReaderPopup } from "@/components/mail-reader/mail-reader-popup"
import { BrandMark } from "@/components/mail-reader/brand-mark"
import { buttonVariants } from "@/components/ui/button"

const HIGHLIGHTS = [
  {
    icon: Volume2,
    title: "Hands-free inbox",
    description: "Listen to Primary, Important, and starred mail while you work.",
  },
  {
    icon: Sparkles,
    title: "Flexible reading",
    description: "Subject only, subject plus preview, or the full email body.",
  },
  {
    icon: Clock,
    title: "Smart schedules",
    description: "Automatic reading hourly, daily, on weekdays, or a custom time.",
  },
]

export default function Home() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        {/* Copy side */}
        <div className="flex-1">
          <div className="mb-6 flex items-center gap-2">
            <BrandMark />
            <span className="text-sm font-semibold text-foreground">Mail Reader</span>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              Chrome Extension
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your inbox, read aloud on your schedule.
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Mail Reader connects to Gmail and turns your unread messages into a clean audio
            briefing. Pick your categories, choose a voice, and press play.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/settings" className={buttonVariants({ size: "lg", className: "gap-2" })}>
              <Settings className="size-4" />
              Open settings
            </Link>
            <span className="text-sm text-muted-foreground">Try the live popup preview →</span>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.title} className="rounded-2xl border border-border bg-card p-4">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h2 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Popup preview side */}
        <div className="flex justify-center lg:flex-none">
          <div className="w-[380px] max-w-full">
            <div className="mb-3 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500" />
              Popup preview
            </div>
            <MailReaderPopup />
          </div>
        </div>
      </div>
    </main>
  )
}
