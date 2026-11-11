"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/types"

const riskStyles: Record<RiskLevel, { label: string; className: string; dot: string }> = {
  bajo: { label: "Bajo", className: "bg-risk-low/12 text-risk-low", dot: "bg-risk-low" },
  medio: { label: "Medio", className: "bg-risk-medium/15 text-warning-foreground dark:text-risk-medium", dot: "bg-risk-medium" },
  alto: { label: "Alto", className: "bg-risk-high/12 text-risk-high", dot: "bg-risk-high" },
}

export function RiskBadge({ level, reasons }: { level: RiskLevel; reasons?: string[] }) {
  const style = riskStyles[level]
  const badge = (
    <Badge variant="outline" className={cn("gap-1.5 border-transparent", style.className)}>
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
      Riesgo {style.label.toLowerCase()}
    </Badge>
  )

  if (!reasons || reasons.length === 0) return badge

  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex cursor-help" />}>{badge}</TooltipTrigger>
      <TooltipContent className="max-w-64">
        <p className="mb-1 font-medium">Reglas activadas</p>
        <ul className="flex list-disc flex-col gap-0.5 pl-4">
          {reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  )
}

export function RiskDot({ level }: { level: RiskLevel }) {
  return <span className={cn("inline-block size-2 rounded-full", riskStyles[level].dot)} aria-label={`Riesgo ${level}`} />
}
