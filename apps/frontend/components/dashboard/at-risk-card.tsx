import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RiskBadge } from "@/components/status/risk-badge"
import { getPrograma, getTutor, estudiantes } from "@/lib/mock-data"

export function AtRiskCard() {
  const atRisk = estudiantes.filter((p) => p.riesgo === "alto")

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Estudiantes que requieren intervención</CardTitle>
        <CardDescription>Riesgo alto según reglas configuradas. Pasa el cursor para ver los motivos.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" render={<Link href="/estudiantes?riesgo=alto" />}>
            Ver matriz
            <ArrowRight data-icon="inline-end" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {atRisk.map((p) => {
            const tutor = getTutor(p.tutorId)
            return (
              <li
                key={p.id}
                className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 border-b py-3 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[auto_1fr_10rem_auto]"
              >
                <Avatar>
                  <AvatarFallback>{p.iniciales}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">{p.nombre}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {getPrograma(p.programaId)?.nombre} · {tutor ? tutor.nombre : "Sin tutor"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                  <Progress value={p.avance} className="flex-1" aria-label={`Avance ${p.avance}%`} />
                  <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{p.avance}%</span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <RiskBadge level={p.riesgo} reasons={p.motivosRiesgo} />
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
