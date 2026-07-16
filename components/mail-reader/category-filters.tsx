"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { MAIL_CATEGORIES, type CategoryId } from "@/lib/mail-reader"
import { cn } from "@/lib/utils"

export function CategoryFilters({
  selected,
  onToggle,
}: {
  selected: Record<CategoryId, boolean>
  onToggle: (id: CategoryId) => void
}) {
  return (
    <div className="grid gap-1.5">
      {MAIL_CATEGORIES.map((category) => {
        const Icon = category.icon
        const isChecked = selected[category.id]
        return (
          <label
            key={category.id}
            htmlFor={`cat-${category.id}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
              isChecked
                ? "border-primary/30 bg-accent"
                : "border-transparent bg-secondary/60 hover:bg-secondary",
            )}
          >
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors",
                isChecked ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">{category.label}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {category.description}
              </span>
            </span>
            <Checkbox
              id={`cat-${category.id}`}
              checked={isChecked}
              onCheckedChange={() => onToggle(category.id)}
            />
          </label>
        )
      })}
    </div>
  )
}
