"use client"

import { Play, Pause, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type PlaybackState = "idle" | "playing" | "paused"

export function PlaybackControls({
  state,
  onStart,
  onPause,
  onResume,
  onStop,
  disabled,
}: {
  state: PlaybackState
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  disabled?: boolean
}) {
  const isPlaying = state === "playing"
  const handleMainClick = () => {
    if (isPlaying) onPause()
    else if (state === "paused") onResume()
    else onStart()
  }
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
      <Button
        onClick={handleMainClick}
        disabled={disabled}
        className="h-11 gap-2 text-sm font-semibold"
      >
        {isPlaying ? (
          <>
            <Pause className="size-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="size-4" />
            {state === "paused" ? "Resume" : "Start Reading"}
          </>
        )}
      </Button>

      <Button
        variant="secondary"
        onClick={onPause}
        disabled={disabled || state !== "playing"}
        className="size-11 p-0"
        aria-label="Pause"
      >
        <Pause className="size-4" />
      </Button>

      <Button
        variant="secondary"
        onClick={onStop}
        disabled={disabled || state === "idle"}
        className={cn(
          "size-11 p-0",
          state !== "idle" && "text-destructive hover:text-destructive",
        )}
        aria-label="Stop"
      >
        <Square className="size-4 fill-current" />
      </Button>
    </div>
  )
}
