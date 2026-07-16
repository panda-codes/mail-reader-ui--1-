"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Settings, Filter, BookOpen, AudioLines, Volume2 } from "lucide-react"
import { BrandMark } from "./brand-mark"
import { ConnectionStatus } from "./connection-status"
import { CategoryFilters } from "./category-filters"
import { ReadingMode } from "./reading-mode"
import { VoiceControls } from "./voice-controls"
import { PlaybackControls, type PlaybackState } from "./playback-controls"
import { SectionLabel } from "./section-label"
import { Separator } from "@/components/ui/separator"
import { useSpeech, type SpeechStatus } from "@/hooks/use-speech"
import { MOCK_EMAILS, buildReadingText, type CategoryId, type ReadingModeId } from "@/lib/mail-reader"

const DEFAULT_CATEGORIES: Record<CategoryId, boolean> = {
  primary: true,
  important: true,
  promotions: false,
  social: false,
  updates: false,
  starred: false,
  unread: true,
}

const STATUS_LABELS: Record<SpeechStatus, string> = {
  ready: "Ready",
  reading: "Reading",
  paused: "Paused",
  finished: "Finished",
}

export function MailReaderPopup() {
  const [connected, setConnected] = useState(true)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [readingMode, setReadingMode] = useState<ReadingModeId>("subject-preview")
  const [voice, setVoice] = useState("")
  const [speed, setSpeed] = useState(1)

  const { voices, status, currentIndex, supported, start, pause, resume, stop } = useSpeech()

  const selectedCount = Object.values(categories).filter(Boolean).length

  // Pick a sensible default voice once the system voices load.
  useEffect(() => {
    if (!voice && voices.length > 0) {
      const preferred = voices.find((v) => v.default && v.lang.startsWith("en")) ?? voices[0]
      setVoice(preferred.voiceURI)
    }
  }, [voices, voice])

  const toggleCategory = (id: CategoryId) =>
    setCategories((prev) => ({ ...prev, [id]: !prev[id] }))

  const handleStart = () => {
    const queue = MOCK_EMAILS.map((email) => buildReadingText(email, readingMode))
    start(queue, { voiceURI: voice, rate: speed, pitch: 1 })
  }

  // Map the speech status onto the playback control's visual state.
  const playbackState: PlaybackState =
    status === "reading" ? "playing" : status === "paused" ? "paused" : "idle"

  const currentEmail = currentIndex >= 0 ? MOCK_EMAILS[currentIndex] : null
  const showStatusBar = status !== "ready"

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <BrandMark />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight text-foreground">Mail Reader</p>
          <p className="text-xs text-muted-foreground">Listen to your inbox</p>
        </div>
        <Link
          href="/settings"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Open settings"
        >
          <Settings className="size-4" />
        </Link>
      </header>

      {/* Scrollable body */}
      <div className="flex max-h-[520px] flex-col gap-4 overflow-y-auto px-4 py-4">
        <ConnectionStatus
          connected={connected}
          email="alex.morgan@gmail.com"
          onToggle={() => setConnected((c) => !c)}
        />

        <section className="grid gap-2.5">
          <SectionLabel
            icon={Filter}
            action={
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                {selectedCount} selected
              </span>
            }
          >
            Categories
          </SectionLabel>
          <CategoryFilters selected={categories} onToggle={toggleCategory} />
        </section>

        <Separator />

        <section className="grid gap-2.5">
          <SectionLabel icon={BookOpen}>Reading mode</SectionLabel>
          <ReadingMode value={readingMode} onValueChange={setReadingMode} />
        </section>

        <Separator />

        <section className="grid gap-3">
          <SectionLabel icon={AudioLines}>Voice &amp; speed</SectionLabel>
          <VoiceControls
            voices={voices}
            voice={voice}
            onVoiceChange={setVoice}
            speed={speed}
            onSpeedChange={setSpeed}
          />
        </section>
      </div>

      {/* Sticky footer with playback */}
      <footer className="border-t border-border bg-card px-4 py-3">
        {!supported && (
          <p className="mb-2.5 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
            Text-to-speech is not supported in this browser.
          </p>
        )}
        {showStatusBar && (
          <div className="mb-2.5 flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">
            <Volume2 className="size-3.5 shrink-0" />
            <span className="truncate">
              <span className="font-semibold">{STATUS_LABELS[status]}</span>
              {currentEmail && (
                <>
                  {" · "}
                  <span>&ldquo;{currentEmail.subject}&rdquo;</span>
                </>
              )}
              {status === "finished" && " · All emails read"}
            </span>
          </div>
        )}
        <PlaybackControls
          state={playbackState}
          disabled={!connected || !supported}
          onStart={handleStart}
          onPause={pause}
          onResume={resume}
          onStop={stop}
        />
      </footer>
    </div>
  )
}
