import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskDot } from "@/components/status/risk-badge"
import { reglasRiesgo } from "@/lib/mock-data"

export function RiskRulesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reglas de riesgo activas</CardTitle>
        <CardDescription>Postulantes afectados por cada regla</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {reglasRiesgo.map((r) => (
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
