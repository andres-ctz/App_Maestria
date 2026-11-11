"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { alertas } from "@/lib/mock-data"
import { formatDate } from "@/lib/format"
import { DeadlineBadge } from "@/components/status/deadline-badge"

export function Notifications() {
  const urgent = alertas.filter((a) => a.diasRestantes <= 3).length

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative" aria-label={`Notificaciones, ${urgent} urgentes`} />
        }
      >
        <Bell />
        {urgent > 0 && (
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] tabular-nums">{urgent}</Badge>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <PopoverHeader className="p-4 pb-2">
          <PopoverTitle>Alertas de vencimiento</PopoverTitle>
          <PopoverDescription>Recordatorios automáticos a 15, 10, 5, 3 y 1 día.</PopoverDescription>
        </PopoverHeader>
        <Separator />
        <ul className="flex max-h-80 flex-col overflow-y-auto">
          {alertas.map((a) => (
            <li key={a.id} className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium">{a.titulo}</span>
                <span className="truncate text-xs text-muted-foreground">{a.descripcion}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(a.fecha)} · {a.destinatarios} postulantes
                </span>
              </div>
              <DeadlineBadge days={a.diasRestantes} />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
