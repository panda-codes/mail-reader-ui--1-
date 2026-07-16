"use client"

import { Mic, Gauge, ChevronDown } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
// import { Slider } from "@base-ui/react/slider"

export function VoiceControls({
  voices = [],
  voice,
  onVoiceChange,
  speed,
  onSpeedChange,
}: {
  voices?: SpeechSynthesisVoice[]
  voice: string
  onVoiceChange: (value: string) => void
  speed: number
  onSpeedChange: (value: number) => void
}) {
  const hasVoices = voices.length > 0
  const selectedVoice = voices.find((v) => v.voiceURI === voice)

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Mic className="size-3.5" />
          Voice
        </Label>
        <div className="relative">
          <select
            value={selectedVoice?.voiceURI ?? (hasVoices ? voices[0]?.voiceURI ?? "" : "")}
            onChange={(event) => onVoiceChange(event.target.value)}
            disabled={!hasVoices}
            className="w-full appearance-none rounded-lg border border-input bg-background py-2 pr-9 pl-2.5 text-sm text-foreground shadow-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!hasVoices ? (
              <option value="">Loading voices…</option>
            ) : (
              voices.map((voiceOption) => (
                <option key={voiceOption.voiceURI} value={voiceOption.voiceURI}>
                  {voiceOption.name} ({voiceOption.lang})
                  {voiceOption.default ? " · Default" : ""}
                </option>
              ))
            )}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Gauge className="size-3.5" />
            Speech speed
          </Label>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground tabular-nums">
            {Number(speed).toFixed(1)}x
          </span>
        </div>
<Slider.Root
  value={speed}
  onValueChange={(value) => {
    console.log("Base UI value:", value)
    if (typeof value === "number") {
      onSpeedChange(value)
    }
  }}
  min={0.5}
  max={2}
  step={0.1}
>
  <Slider.Control className="relative flex w-full items-center">
    <Slider.Track className="relative h-1 w-full rounded-full bg-muted">
      <Slider.Indicator className="h-full bg-primary" />
      <Slider.Thumb
        aria-label="Speech speed"
        className="size-4 rounded-full border bg-background"
      />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
        <div className="flex justify-between text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>Slow</span>
          <span>Normal</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
  )
}
