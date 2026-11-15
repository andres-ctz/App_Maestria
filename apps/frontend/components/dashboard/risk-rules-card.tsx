import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskDot } from "@/components/status/risk-badge"
import { ToneBadge } from "@/components/status/status-badge"
import { AVISO_EJEMPLO } from "@/lib/config/ejemplos"
import { reglasRiesgoEjemplo } from "@/lib/mock-data"

/** Los criterios de riesgo definitivos están pendientes (v0.3 §23): estas reglas son solo de ejemplo. */
export function RiskRulesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reglas de riesgo (ejemplo)</CardTitle>
        <CardDescription>Estudiantes afectados por cada regla de demostración</CardDescription>
        <CardAction>
          <ToneBadge tone="warning" className="whitespace-normal text-center">
            {AVISO_EJEMPLO}
          </ToneBadge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {reglasRiesgoEjemplo.map((r) => (
            <li key={r.id} className="flex items-center gap-3">
              <RiskDot level={r.nivel} />
              <span className="flex-1 text-sm">{r.regla}</span>
              <span className="text-sm font-medium tabular-nums">{r.afectados}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
