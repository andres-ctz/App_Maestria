import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GraduationCap, Mail, MessageSquareText } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/page-header"
import { DeadlineBadge } from "@/components/status/deadline-badge"
import { RevisionBadge } from "@/components/status/status-badge"
import { requerirSesion } from "@/lib/auth/session"
import { actividadesEstudiante, cursos, entregas, getConvocatoria, getEstudiante, getPrograma, getTutor } from "@/lib/mock-data"
import { daysUntil, formatDate } from "@/lib/format"

export const metadata: Metadata = { title: "Mi curso" }

export default async function MiCursoPage() {
  const { cuenta } = await requerirSesion()
  const me = getEstudiante(cuenta.id)

  if (!me) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <GraduationCap />
          </EmptyMedia>
          <EmptyTitle>Aún no tienes una matrícula</EmptyTitle>
          <EmptyDescription>Cuando tu admisión se complete, aquí verás tu curso, tu avance y tus entregas.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const tutor = getTutor(me.tutorId)
  const programa = getPrograma(me.programaId)
  const convocatoria = getConvocatoria(me.convocatoriaId)
  const susCursos = cursos.filter((c) => c.convocatoriaId === me.convocatoriaId)
  const pendientes = actividadesEstudiante
    .filter((a) => a.estado !== "aprobado")
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite))
  const avance = Math.round(actividadesEstudiante.reduce((acc, a) => acc + (a.progreso * a.ponderacion) / 100, 0))
  const ultimoFeedback = entregas
    .filter((e) => e.estudianteId === me.id)
    .flatMap((e) => e.versiones.map((v) => ({ ...v, titulo: e.titulo })))
    .find((v) => v.feedback)

  return (
    <>
      <PageHeader
        title={`Hola, ${me.nombre.split(" ")[0]}`}
        description="Este es el estado de tu matrícula y de tu curso preparatorio."
        actions={
          <Button render={<Link href="/estudiante/actividades" />}>
            Ir a mis actividades
            <ArrowRight data-icon="inline-end" />
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mi matrícula</CardTitle>
            <CardDescription>
              {programa?.nombre} · {convocatoria?.nombre}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Programa</dt>
                <dd className="text-sm font-medium">{programa?.nombre}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Convocatoria</dt>
                <dd className="text-sm font-medium">
                  {convocatoria?.nombre} · {convocatoria && `${formatDate(convocatoria.inicio)} al ${formatDate(convocatoria.fin)}`}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Cursos</dt>
                <dd className="text-sm font-medium">{susCursos.map((c) => c.nombre).join(" · ")}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avance del curso</CardTitle>
            <CardDescription>Ponderado por actividad</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <span className="text-4xl font-semibold tabular-nums">{avance}%</span>
            <Progress value={avance} aria-label="Avance ponderado" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Próximas entregas</CardTitle>
            <CardDescription>Ordenadas por fecha límite</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" render={<Link href="/estudiante/actividades" />}>
                Ver todas
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y">
              {pendientes.map((a) => (
                <li key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{a.titulo}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {a.curso} · {formatDate(a.fechaLimite)}
                    </span>
                  </div>
                  <RevisionBadge estado={a.estado} />
                  <DeadlineBadge days={daysUntil(a.fechaLimite)} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tu tutor</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback>{tutor?.iniciales}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">{tutor?.nombre}</span>
                <span className="truncate text-xs text-muted-foreground">{tutor?.email}</span>
              </div>
            </div>
            {ultimoFeedback && (
              <div className="flex flex-col gap-1.5 rounded-md bg-muted/50 p-3 text-sm">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MessageSquareText className="size-3.5" aria-hidden />
                  Última retroalimentación · {ultimoFeedback.titulo}
                </span>
                <p className="text-pretty">{ultimoFeedback.feedback}</p>
              </div>
            )}
          </CardContent>
          {tutor && (
            <CardFooter>
              <Button variant="outline" className="w-full" render={<a href={`mailto:${tutor.email}`} />}>
                <Mail data-icon="inline-start" />
                Escribir a mi tutor
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  )
}
