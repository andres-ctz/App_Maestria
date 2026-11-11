"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DeadlineBadge } from "@/components/status/deadline-badge"
import { EvidenciaBadge } from "@/components/status/status-badge"
import { UploadDialog } from "@/components/portal/upload-dialog"
import { daysUntil, formatDate } from "@/lib/format"
import type { Actividad } from "@/lib/types"

type Filter = "todas" | "pendientes" | "completadas"

export function ActivityList({ initial }: { initial: Actividad[] }) {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState<Filter>("pendientes")

  const visible = items
    .filter((a) =>
      filter === "todas" ? true : filter === "completadas" ? a.estado === "aprobado" : a.estado !== "aprobado",
    )
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite))

  function markUploaded(id: string) {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, estado: "entregado", progreso: Math.max(a.progreso, 80) } : a)),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        variant="outline"
        value={[filter]}
        onValueChange={(v) => v[0] && setFilter(v[0] as Filter)}
        aria-label="Filtrar actividades"
      >
        <ToggleGroupItem value="pendientes">Pendientes</ToggleGroupItem>
        <ToggleGroupItem value="completadas">Completadas</ToggleGroupItem>
        <ToggleGroupItem value="todas">Todas</ToggleGroupItem>
      </ToggleGroup>
      <ul className="flex flex-col gap-3">
        {visible.map((a) => {
          const days = daysUntil(a.fechaLimite)
          const done = a.estado === "aprobado"
          return (
            <li key={a.id}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <CardTitle>{a.titulo}</CardTitle>
                      <CardDescription>{a.curso}</CardDescription>
                    </div>
                    <EvidenciaBadge estado={a.estado} />
                    {!done && <DeadlineBadge days={days} />}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground text-pretty">{a.descripcion}</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" aria-hidden />
                          Vence {formatDate(a.fechaLimite)}
                        </span>
                        <span className="tabular-nums">
                          {a.progreso}% · pondera {a.ponderacion}%
                        </span>
                      </div>
                      <Progress value={a.progreso} aria-label={`Progreso ${a.titulo}`} />
                    </div>
                    {!done && a.estado !== "entregado" && <UploadDialog actividad={a} onUploaded={markUploaded} />}
                  </div>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
