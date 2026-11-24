"use client"

import { useState } from "react"
import { Inbox } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EntregaReview } from "@/components/entregas/entrega-review"
import { RiskBadge } from "@/components/status/risk-badge"
import { relativeDays } from "@/lib/format"
import type { Entrega, EstadoRevision, Estudiante } from "@/lib/types"

type Tab = "pendiente" | "en-correccion" | "resueltas"

export function EntregasInbox({
  initial,
  estudiantes,
  revisor,
}: {
  initial: Entrega[]
  estudiantes: Estudiante[]
  revisor: string
}) {
  const [items, setItems] = useState(initial)
  const byId = new Map(estudiantes.map((p) => [p.id, p]))

  const groups: Record<Tab, Entrega[]> = {
    pendiente: items.filter((e) => e.estado === "pendiente"),
    "en-correccion": items.filter((e) => e.estado === "en-correccion"),
    resueltas: items.filter((e) => e.estado === "aprobado" || e.estado === "rechazado"),
  }

  function handleDecision(id: string, estado: EstadoRevision, feedback: string) {
    setItems((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              estado,
              versiones: [{ ...e.versiones[0], estado, feedback: feedback || undefined, revisor }, ...e.versiones.slice(1)],
            }
          : e,
      ),
    )
  }

  return (
    <Tabs defaultValue="pendiente">
      <TabsList className="max-w-full overflow-x-auto">
        <TabsTrigger value="pendiente">
          Pendientes <Badge variant="secondary">{groups.pendiente.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="en-correccion">
          En corrección <Badge variant="secondary">{groups["en-correccion"].length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="resueltas">Resueltas</TabsTrigger>
      </TabsList>
      {(Object.keys(groups) as Tab[]).map((tab) => (
        <TabsContent key={tab} value={tab} className="pt-2">
          {groups[tab].length === 0 ? (
            <Card>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Inbox />
                  </EmptyMedia>
                  <EmptyTitle>Bandeja al día</EmptyTitle>
                  <EmptyDescription>No hay entregas en esta categoría.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {groups[tab].map((e) => {
                const p = byId.get(e.estudianteId)
                return (
                  <Card key={e.id}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="text-xs">{p?.iniciales}</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <CardTitle className="truncate">{e.titulo}</CardTitle>
                          <CardDescription className="truncate">
                            {p?.nombre} · {e.curso}
                          </CardDescription>
                        </div>
                        {p && <RiskBadge level={p.riesgo} reasons={p.motivosRiesgo} />}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Última versión {relativeDays(e.versiones[0].fecha.slice(0, 10)).toLowerCase()}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <EntregaReview entrega={e} onDecision={handleDecision} />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
