import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CalendarClock, FileClock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { PostulantesTable } from "@/components/postulantes/postulantes-table"
import { evidencias, postulantes, seguimientos } from "@/lib/mock-data"
import { daysUntil } from "@/lib/format"

export const metadata: Metadata = { title: "Mis postulantes" }

const TUTOR_ID = "t-1"

export default function TutorPage() {
  const mine = postulantes.filter((p) => p.tutorId === TUTOR_ID)
  const ids = new Set(mine.map((p) => p.id))
  const alto = mine.filter((p) => p.riesgo === "alto").length
  const compromisos = seguimientos.filter(
    (s) =>
      s.tutorId === TUTOR_ID &&
      s.compromiso &&
      !s.compromiso.cumplido &&
      daysUntil(s.compromiso.fechaLimite) >= 0 &&
      daysUntil(s.compromiso.fechaLimite) <= 7,
  ).length
  const porRevisar = evidencias.filter((e) => ids.has(e.postulanteId) && e.estado === "pendiente").length

  return (
    <>
      <PageHeader
        title="Mis postulantes asignados"
        description="Prioriza el seguimiento según el nivel de riesgo y registra cada contacto en la bitácora."
        actions={
          <Button render={<Link href="/tutor/evidencias" />}>
            <FileClock data-icon="inline-start" />
            Revisar evidencias
          </Button>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen">
        <StatCard label="Asignados" value={String(mine.length)} hint="en 2 convocatorias" icon={Users} />
        <StatCard label="Riesgo alto" value={String(alto)} hint="contactar en menos de 48 h" icon={AlertTriangle} />
        <StatCard label="Compromisos esta semana" value={String(compromisos)} hint="vencen en 7 días o menos" icon={CalendarClock} />
        <StatCard label="Evidencias por revisar" value={String(porRevisar)} hint="en tu bandeja" icon={FileClock} />
      </section>
      <PostulantesTable data={mine} mode="tutor" />
    </>
  )
}
