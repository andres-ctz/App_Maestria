import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { EstudiantesTable } from "@/components/estudiantes/estudiantes-table"
import { estudiantes } from "@/lib/mock-data"
import type { RiskLevel } from "@/lib/types"

export const metadata: Metadata = { title: "Estudiantes y seguimiento" }

export default async function EstudiantesPage({ searchParams }: { searchParams: Promise<{ riesgo?: string; q?: string }> }) {
  const { riesgo, q } = await searchParams
  const initialRisk = (["alto", "medio", "bajo"] as const).includes(riesgo as RiskLevel) ? (riesgo as RiskLevel) : "todos"

  return (
    <>
      <PageHeader
        title="Estudiantes y seguimiento"
        description="Asigna tutores y prioriza intervenciones según el nivel de riesgo. La admisión de postulantes se gestiona en Postulaciones."
        actions={
          <Button variant="outline" render={<Link href="/reportes" />}>
            <Download data-icon="inline-start" />
            Exportar
          </Button>
        }
      />
      <EstudiantesTable data={estudiantes} mode="coordinador" initialRisk={initialRisk} initialQuery={q ?? ""} />
    </>
  )
}
