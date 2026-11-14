import { BellRing } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeadlineBadge } from "@/components/status/deadline-badge"
import { alertas } from "@/lib/mock-data"
import { formatDate } from "@/lib/format"

export function AlertsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos vencimientos</CardTitle>
        <CardDescription>Recordatorios automáticos programados</CardDescription>
        <CardAction>
          <Badge variant="secondary">
            <BellRing data-icon="inline-start" />
            15 · 10 · 5 · 3 · 1
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {alertas.map((a) => (
            <li key={a.id} className="flex items-center gap-3 border-b py-3 first:pt-0 last:border-b-0 last:pb-0">
              <div className="flex w-11 shrink-0 flex-col items-center rounded-md bg-muted py-1">
                <span className="text-[10px] font-medium uppercase text-muted-foreground">
                  {formatDate(a.fecha, "MMM")}
                </span>
                <span className="text-base font-semibold leading-none tabular-nums">{formatDate(a.fecha, "d")}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{a.titulo}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {a.descripcion} · {a.destinatarios} notificados
                </span>
              </div>
              <DeadlineBadge days={a.diasRestantes} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
