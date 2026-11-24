import type { LucideIcon } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
}: {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">{value}</CardTitle>
        <CardAction>
          <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-4" aria-hidden />
          </div>
        </CardAction>
      </CardHeader>
      <CardFooter className="gap-2 text-xs text-muted-foreground">
        {trend && (
          <span className={cn("shrink-0 whitespace-nowrap font-medium tabular-nums", trend.positive ? "text-success" : "text-destructive")}>
            {trend.value}
          </span>
        )}
        <span>{hint}</span>
      </CardFooter>
    </Card>
  )
}
