"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarClock, AudioLines, Bell, Check, Save } from "lucide-react"
import { BrandMark } from "./brand-mark"
import { ScheduleConfig } from "./schedule-config"
import { VoiceControls } from "./voice-controls"
import { SettingsCard, ToggleRow } from "./settings-card"
import { Button } from "@/components/ui/button"
import { useSpeech } from "@/hooks/use-speech"
import type { ScheduleId } from "@/lib/mail-reader"

export function MailReaderSettings() {
  const [schedule, setSchedule] = useState<ScheduleId>("daily")
  const [time, setTime] = useState("08:00")
  const [activeDays, setActiveDays] = useState<boolean[]>([
    false,
    true,
    true,
    true,
    true,
    true,
    false,
  ])
  const [voice, setVoice] = useState("sonia")
  const [speed, setSpeed] = useState(1.1)

  const [notifyNewMail, setNotifyNewMail] = useState(true)
  const [notifyFinished, setNotifyFinished] = useState(true)
  const [notifyImportant, setNotifyImportant] = useState(false)

  const [saved, setSaved] = useState(false)
  const { voices } = useSpeech()

  const toggleDay = (index: number) =>
    setActiveDays((prev) => prev.map((d, i) => (i === index ? !d : d)))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Back to popup"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <BrandMark />
        <div className="flex-1">
          <h1 className="text-lg font-semibold leading-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure how Mail Reader works</p>
        </div>
      </header>

      <div className="grid gap-4">
        <SettingsCard
          icon={CalendarClock}
          title="Reading schedule"
          description="Choose when Mail Reader should automatically read your inbox."
        >
          <ScheduleConfig
            schedule={schedule}
            onScheduleChange={setSchedule}
            time={time}
            onTimeChange={setTime}
            activeDays={activeDays}
            onToggleDay={toggleDay}
          />
        </SettingsCard>

        <SettingsCard
          icon={AudioLines}
          title="Voice preferences"
          description="Set your default reading voice and playback speed."
        >
          <VoiceControls
            voices={voices}
            voice={voice}
            onVoiceChange={setVoice}
            speed={speed}
            onSpeedChange={setSpeed}
          />
        </SettingsCard>

        <SettingsCard
          icon={Bell}
          title="Notifications"
          description="Decide when Mail Reader should send you desktop alerts."
        >
          <div className="grid gap-2">
            <ToggleRow
              id="notify-new"
              label="New mail arrives"
              description="Alert me when new messages match my filters."
              checked={notifyNewMail}
              onCheckedChange={setNotifyNewMail}
            />
            <ToggleRow
              id="notify-finished"
              label="Reading finished"
              description="Let me know when a reading session completes."
              checked={notifyFinished}
              onCheckedChange={setNotifyFinished}
            />
            <ToggleRow
              id="notify-important"
              label="Important only"
              description="Only notify me about important or starred mail."
              checked={notifyImportant}
              onCheckedChange={setNotifyImportant}
            />
          </div>
        </SettingsCard>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-4 mt-6 flex items-center justify-end gap-3 rounded-2xl border border-border bg-card/80 p-3 backdrop-blur">
        {saved && (
          <span className="mr-auto inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="size-4" />
            Settings saved
          </span>
        )}
        <Button variant="ghost">Reset</Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="size-4" />
          Save settings
        </Button>
      </div>
    </div>
  )
}
