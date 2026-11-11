import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function DeadlineBadge({ days }: { days: number }) {
  const tone =
    days <= 1
      ? "bg-risk-high/12 text-risk-high"
      : days <= 5
        ? "bg-risk-medium/15 text-warning-foreground dark:text-risk-medium"
        : "bg-secondary text-secondary-foreground"

  const label = days < 0 ? `Vencido` : days === 0 ? "Hoy" : `${days} ${days === 1 ? "día" : "días"}`

  return (
    <Badge variant="outline" className={cn("shrink-0 border-transparent tabular-nums", tone)}>
      {label}
    </Badge>
  )
}
