import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PostulantesTable } from "@/components/postulantes/postulantes-table"
import { postulantes } from "@/lib/mock-data"
import type { RiskLevel } from "@/lib/types"

export const metadata: Metadata = { title: "Matriz de postulantes" }

export default async function PostulantesPage({ searchParams }: { searchParams: Promise<{ riesgo?: string }> }) {
  const { riesgo } = await searchParams
  const initialRisk = (["alto", "medio", "bajo"] as const).includes(riesgo as RiskLevel) ? (riesgo as RiskLevel) : "todos"

  return (
    <>
      <PageHeader
        title="Matriz de postulantes"
        description="Asigna tutores, aprueba inscripciones y prioriza intervenciones según el nivel de riesgo."
        actions={
          <Button variant="outline" render={<Link href="/reportes" />}>
            <Download data-icon="inline-start" />
            Exportar matriz
          </Button>
        }
      />
      <PostulantesTable data={postulantes} mode="coordinador" initialRisk={initialRisk} />
    </>
  )
}
