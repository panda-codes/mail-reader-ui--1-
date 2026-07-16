import { Headphones } from "lucide-react"
import { cn } from "@/lib/utils"

export function BrandMark({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md"
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm",
        size === "md" ? "size-9" : "size-8",
        className,
      )}
      aria-hidden="true"
    >
      <Headphones className={size === "md" ? "size-5" : "size-4"} />
    </div>
  )
}
