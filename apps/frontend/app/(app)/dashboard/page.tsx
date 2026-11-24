import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, FileClock, TrendingUp, Users, Download } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { RetentionChart } from "@/components/dashboard/retention-chart"
import { RiskByProgramChart } from "@/components/dashboard/risk-by-program-chart"
import { AlertsCard } from "@/components/dashboard/alerts-card"
import { AtRiskCard } from "@/components/dashboard/at-risk-card"
import { RiskRulesCard } from "@/components/dashboard/risk-rules-card"
import { convocatorias, entregas, estudiantes, postulaciones, programas } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Panel ejecutivo" }

/** Postulaciones que todavía requieren una acción del equipo de admisión. */
const ESTADOS_EN_PROCESO = ["recibida", "en-revision", "pendiente-correccion"]

export default function DashboardPage() {
  const totalMatriculados = convocatorias.filter((c) => c.estado === "en-curso").reduce((s, c) => s + c.inscritos, 0)
  const altoRiesgo = estudiantes.filter((e) => e.riesgo === "alto").length
  const porRevisar = entregas.filter((e) => e.estado === "pendiente" || e.versiones[0].estado === "pendiente").length
  const avanceGeneral = Math.round(estudiantes.reduce((s, e) => s + e.avance, 0) / estudiantes.length)
  const enProceso = postulaciones.filter((p) => ESTADOS_EN_PROCESO.includes(p.estado)).length

  const riskData = programas
    .filter((p) => p.estado === "activo")
    .map((p) => {
      const list = estudiantes.filter((x) => x.programaId === p.id)
      return {
        programa: p.nombre.replace("Maestría en ", "").split(" ").slice(0, 2).join(" "),
        bajo: list.filter((x) => x.riesgo === "bajo").length,
        medio: list.filter((x) => x.riesgo === "medio").length,
        alto: list.filter((x) => x.riesgo === "alto").length,
      }
    })

  return (
    <>
      <PageHeader
        title="Panel ejecutivo"
        description="Visión consolidada de la convocatoria 2026-II: retención, riesgo académico y vencimientos próximos. Datos de demostración; los indicadores definitivos están por definir."
        actions={
          <>
            <Button variant="outline" render={<Link href="/reportes" />}>
              <Download data-icon="inline-start" />
              Exportar
            </Button>
            <Button render={<Link href="/estudiantes" />}>Estudiantes y seguimiento</Button>
          </>
        }
      />
      <section aria-label="Indicadores clave" className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Estudiantes matriculados" value={String(totalMatriculados)} hint="en convocatorias en curso" icon={Users} trend={{ value: "+12", positive: true }} />
        <StatCard label="Avance general" value={`${avanceGeneral}%`} hint="promedio de actividades completadas" icon={TrendingUp} trend={{ value: "+6 pp", positive: true }} />
        <StatCard label="Postulaciones en proceso" value={String(enProceso)} hint={`${porRevisar} entregas por revisar`} icon={FileClock} />
        <StatCard label="En riesgo crítico" value={String(altoRiesgo)} hint="requieren intervención tutorial" icon={AlertTriangle} trend={{ value: "+1", positive: false }} />
      </section>
      <section className="grid min-w-0 gap-4 lg:grid-cols-3">
        <RetentionChart />
        <RiskByProgramChart data={riskData} />
      </section>
      <section className="grid min-w-0 gap-4 lg:grid-cols-3">
        <AtRiskCard />
        <div className="flex flex-col gap-4">
          <AlertsCard />
          <RiskRulesCard />
        </div>
      </section>
    </>
  )
}
