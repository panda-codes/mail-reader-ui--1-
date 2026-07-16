import type { LucideIcon } from "lucide-react"

export function SectionLabel({
  icon: Icon,
  children,
  action,
}: {
  icon: LucideIcon
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 text-primary" />
        {children}
      </h3>
      {action}
    </div>
  )
}
