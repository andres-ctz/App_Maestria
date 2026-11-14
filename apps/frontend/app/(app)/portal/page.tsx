import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Mail, MessageSquareText } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/page-header"
import { DeadlineBadge } from "@/components/status/deadline-badge"
import { EvidenciaBadge } from "@/components/status/status-badge"
import { actividadesPostulante, evidencias, getTutor, pasosInscripcion, postulantes } from "@/lib/mock-data"
import { daysUntil, formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Mi portal" }

export default function PortalPage() {
  const me = postulantes[0]
  const tutor = getTutor(me.tutorId)
  const pendientes = actividadesPostulante
    .filter((a) => a.estado !== "aprobado")
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite))
  const avance = Math.round(
    actividadesPostulante.reduce((acc, a) => acc + (a.progreso * a.ponderacion) / 100, 0),
  )
  const ultimoFeedback = evidencias
    .flatMap((e) => e.versiones.map((v) => ({ ...v, titulo: e.titulo })))
    .find((v) => v.feedback)
  const pasosHechos = pasosInscripcion.filter((p) => p.completado).length

  return (
    <>
      <PageHeader
        title={`Hola, ${me.nombre.split(" ")[0]}`}
        description="Este es el estado de tu inscripción y de tu curso preparatorio para el doctorado."
        actions={
          <Button render={<Link href="/portal/actividades" />}>
            Ir a mis actividades
            <ArrowRight data-icon="inline-end" />
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Estado de inscripción</CardTitle>
            <CardDescription>
              {pasosHechos} de {pasosInscripcion.length} etapas completadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pasosInscripcion.map((paso, i) => {
                const current = !paso.completado && pasosInscripcion[i - 1]?.completado
                return (
                  <li key={paso.id} className="flex gap-3">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums",
                        paso.completado && "border-primary bg-primary text-primary-foreground",
                        current && "border-primary text-primary",
                      )}
                      aria-hidden
                    >
                      {paso.completado ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className={cn("text-sm font-medium", !paso.completado && !current && "text-muted-foreground")}>
                        {paso.titulo}
                        <span className="sr-only">{paso.completado ? " (completado)" : current ? " (en curso)" : " (pendiente)"}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {paso.fecha ? formatDate(paso.fecha) : current ? "En curso" : paso.descripcion}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
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
            <span className="text-xs text-muted-foreground">Necesitas 100% para acceder a la evaluación final.</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Próximas entregas</CardTitle>
            <CardDescription>Ordenadas por fecha límite</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" render={<Link href="/portal/actividades" />}>
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
                  <EvidenciaBadge estado={a.estado} />
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
          <CardFooter>
            <Button variant="outline" className="w-full" render={<a href={`mailto:${tutor?.email}`} />}>
              <Mail data-icon="inline-start" />
              Escribir a mi tutor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
