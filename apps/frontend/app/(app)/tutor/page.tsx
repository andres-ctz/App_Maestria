import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CalendarClock, FileClock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { EstudiantesTable } from "@/components/estudiantes/estudiantes-table"
import { requerirSesion } from "@/lib/auth/session"
import { entregas, estudiantes, seguimientos } from "@/lib/mock-data"
import { daysUntil } from "@/lib/format"

export const metadata: Metadata = { title: "Mis estudiantes" }

export default async function TutorPage() {
  const { cuenta } = await requerirSesion()
  const mine = estudiantes.filter((e) => e.tutorId === cuenta.id)
  const ids = new Set(mine.map((e) => e.id))
  const alto = mine.filter((e) => e.riesgo === "alto").length
  const convocatorias = new Set(mine.map((e) => e.convocatoriaId)).size
  const compromisos = seguimientos.filter(
    (s) =>
      s.tutorId === cuenta.id &&
      s.compromiso &&
      !s.compromiso.cumplido &&
      daysUntil(s.compromiso.fechaLimite) >= 0 &&
      daysUntil(s.compromiso.fechaLimite) <= 7,
  ).length
  const porRevisar = entregas.filter((e) => ids.has(e.estudianteId) && e.estado === "pendiente").length

  return (
    <>
      <PageHeader
        title="Mis estudiantes asignados"
        description="Prioriza el seguimiento según el nivel de riesgo y registra cada contacto en la bitácora."
        actions={
          <Button render={<Link href="/tutor/entregas" />}>
            <FileClock data-icon="inline-start" />
            Revisar entregas
          </Button>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen">
        <StatCard label="Asignados" value={String(mine.length)} hint={`en ${convocatorias} ${convocatorias === 1 ? "convocatoria" : "convocatorias"}`} icon={Users} />
        <StatCard label="Riesgo alto" value={String(alto)} hint="requieren seguimiento prioritario" icon={AlertTriangle} />
        <StatCard label="Compromisos esta semana" value={String(compromisos)} hint="vencen en 7 días o menos" icon={CalendarClock} />
        <StatCard label="Entregas por revisar" value={String(porRevisar)} hint="en tu bandeja" icon={FileClock} />
      </section>
      <EstudiantesTable data={mine} mode="tutor" />
    </>
  )
}
