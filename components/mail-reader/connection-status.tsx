"use client"

import { Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ConnectionStatus({
  connected,
  email,
  onToggle,
}: {
  connected: boolean
  email: string
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
      <div className="relative">
        <div className="flex size-10 items-center justify-center rounded-full bg-accent">
          {/* Gmail-style envelope mark */}
          <svg viewBox="0 0 24 24" className="size-5 text-primary" fill="currentColor" aria-hidden="true">
            <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.1L18.8 6H5.2ZM19 7.7l-6.4 4.8a1 1 0 0 1-1.2 0L5 7.7V18h14V7.7Z" />
          </svg>
        </div>
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card",
            connected ? "bg-emerald-500" : "bg-muted-foreground/40",
          )}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">Gmail</p>
        <p className="truncate text-xs text-muted-foreground">
          {connected ? email : "Not connected"}
        </p>
      </div>

      {connected ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
          <Check className="size-3" />
          Connected
        </span>
      ) : (
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" onClick={onToggle}>
          <RefreshCw className="size-3.5" />
          Connect
        </Button>
      )}
    </div>
  )
}
