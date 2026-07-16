"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { READING_MODES, type ReadingModeId } from "@/lib/mail-reader"
import { cn } from "@/lib/utils"

export function ReadingMode({
  value,
  onValueChange,
}: {
  value: ReadingModeId
  onValueChange: (value: ReadingModeId) => void
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onValueChange(v as ReadingModeId)}
      className="grid gap-1.5"
    >
      {READING_MODES.map((mode) => {
        const isActive = value === mode.id
        return (
          <label
            key={mode.id}
            htmlFor={`mode-${mode.id}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
              isActive
                ? "border-primary/30 bg-accent"
                : "border-transparent bg-secondary/60 hover:bg-secondary",
            )}
          >
            <RadioGroupItem id={`mode-${mode.id}`} value={mode.id} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">{mode.label}</span>
              <span className="block truncate text-xs text-muted-foreground">{mode.description}</span>
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}
