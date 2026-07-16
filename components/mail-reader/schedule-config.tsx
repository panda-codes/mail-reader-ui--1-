"use client"

import { Clock } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SCHEDULE_OPTIONS, type ScheduleId } from "@/lib/mail-reader"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

export function ScheduleConfig({
  schedule,
  onScheduleChange,
  time,
  onTimeChange,
  activeDays,
  onToggleDay,
}: {
  schedule: ScheduleId
  onScheduleChange: (value: ScheduleId) => void
  time: string
  onTimeChange: (value: string) => void
  activeDays: boolean[]
  onToggleDay: (index: number) => void
}) {
  return (
    <div className="grid gap-4">
      <RadioGroup
        value={schedule}
        onValueChange={(v) => onScheduleChange(v as ScheduleId)}
        className="grid gap-2 sm:grid-cols-2"
      >
        {SCHEDULE_OPTIONS.map((option) => {
          const isActive = schedule === option.id
          return (
            <label
              key={option.id}
              htmlFor={`schedule-${option.id}`}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                isActive ? "border-primary/40 bg-accent" : "border-border bg-card hover:bg-secondary/60",
              )}
            >
              <RadioGroupItem id={`schedule-${option.id}`} value={option.id} className="mt-0.5" />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{option.label}</span>
                <span className="block text-xs text-muted-foreground">{option.description}</span>
              </span>
            </label>
          )
        })}
      </RadioGroup>

      {(schedule === "daily" || schedule === "custom" || schedule === "weekdays") && (
        <div className="grid gap-2 rounded-xl border border-border bg-secondary/40 p-3">
          <Label htmlFor="schedule-time" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" />
            Reading time
          </Label>
          <Input
            id="schedule-time"
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-40 bg-background"
          />
        </div>
      )}

      {schedule === "custom" && (
        <div className="grid gap-2">
          <Label className="text-xs font-medium text-muted-foreground">Repeat on</Label>
          <div className="flex gap-1.5">
            {WEEKDAYS.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onToggleDay(index)}
                aria-pressed={activeDays[index]}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  activeDays[index]
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/70",
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
