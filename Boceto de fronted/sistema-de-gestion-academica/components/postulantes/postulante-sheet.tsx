"use client"

import { useState } from "react"
import { FileX, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiskBadge } from "@/components/status/risk-badge"
import { InscripcionBadge } from "@/components/status/status-badge"
import { ContactTimeline } from "@/components/tutoria/contact-timeline"
import { ContactForm } from "@/components/tutoria/contact-form"
import { EvidenceReview } from "@/components/evidencias/evidence-review"
import { evidencias as allEvidencias, getConvocatoria, getPrograma, getTutor, seguimientos } from "@/lib/mock-data"
import { formatDate, relativeDays } from "@/lib/format"
import type { Evidencia, EstadoEvidencia, Postulante, Seguimiento } from "@/lib/types"

export function PostulanteSheet({
  postulante,
  open,
  onOpenChange,
}: {
  postulante: Postulante | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        {postulante && <PostulanteDetail key={postulante.id} postulante={postulante} />}
      </SheetContent>
    </Sheet>
  )
}

function PostulanteDetail({ postulante: p }: { postulante: Postulante }) {
  const [log, setLog] = useState<Seguimiento[]>(() =>
    seguimientos.filter((s) => s.postulanteId === p.id).sort((a, b) => b.fecha.localeCompare(a.fecha)),
  )
  const [evs, setEvs] = useState<Evidencia[]>(() => allEvidencias.filter((e) => e.postulanteId === p.id))
  const tutor = getTutor(p.tutorId)

  function handleDecision(id: string, estado: EstadoEvidencia, feedback: string) {
    setEvs((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              estado,
              versiones: [{ ...e.versiones[0], estado, feedback: feedback || undefined, revisor: tutor?.nombre }, ...e.versiones.slice(1)],
            }
          : e,
      ),
    )
  }

  return (
    <>
      <SheetHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarFallback>{p.iniciales}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <SheetTitle className="truncate">{p.nombre}</SheetTitle>
            <SheetDescription className="truncate">
              {getPrograma(p.programaId)?.nombre} · {getConvocatoria(p.convocatoriaId)?.nombre}
            </SheetDescription>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <RiskBadge level={p.riesgo} reasons={p.motivosRiesgo} />
          <InscripcionBadge estado={p.estadoInscripcion} />
        </div>
      </SheetHeader>

      <Tabs defaultValue="bitacora" className="min-h-0 flex-1 gap-0">
        <div className="border-b px-4 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="bitacora">Bitácora</TabsTrigger>
            <TabsTrigger value="evidencias">Evidencias</TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <TabsContent value="perfil" className="flex flex-col gap-5 p-4">
            <section className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Avance de actividades</span>
                <span className="tabular-nums text-muted-foreground">
                  {p.actividadesCompletadas}/{p.actividadesTotales} · {p.avance}%
                </span>
              </div>
              <Progress value={p.avance} aria-label="Avance" />
              <span className="text-xs text-muted-foreground">Última actividad: {relativeDays(p.ultimaActividad)}</span>
            </section>
            {p.motivosRiesgo.length > 0 && (
              <section className="flex flex-col gap-2 rounded-lg border p-3">
                <h3 className="text-sm font-medium">Motivos de riesgo</h3>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
                  {p.motivosRiesgo.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </section>
            )}
            <Separator />
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Detail label="Grado académico" value={p.formacion.grado} full />
              <Detail label="Universidad" value={p.formacion.universidad} full />
              <Detail label="Año de egreso" value={String(p.formacion.egreso)} />
              <Detail label="Promedio ponderado" value={p.formacion.promedio.toFixed(1)} />
              <Detail label="Documento" value={p.documento} />
              <Detail label="Tutor asignado" value={tutor?.nombre ?? "Sin asignar"} />
            </dl>
            <Separator />
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${p.email}`} className="flex items-center gap-2 hover:underline">
                <Mail className="size-4 text-muted-foreground" aria-hidden />
                {p.email}
              </a>
              <a href={`tel:${p.telefono}`} className="flex items-center gap-2 hover:underline">
                <Phone className="size-4 text-muted-foreground" aria-hidden />
                {p.telefono}
              </a>
            </div>
          </TabsContent>

          <TabsContent value="bitacora" className="flex flex-col gap-6 p-4">
            <section className="flex flex-col gap-3 rounded-lg border p-4">
              <h3 className="text-sm font-medium">Registrar nuevo contacto / compromiso</h3>
              <ContactForm
                postulanteId={p.id}
                tutorId={p.tutorId ?? "t-1"}
                onCreated={(s) => setLog((prev) => [s, ...prev])}
              />
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Historial de seguimiento</h3>
              <ContactTimeline items={log} />
            </section>
          </TabsContent>

          <TabsContent value="evidencias" className="flex flex-col gap-4 p-4">
            {evs.length === 0 ? (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileX />
                  </EmptyMedia>
                  <EmptyTitle>Sin evidencias cargadas</EmptyTitle>
                  <EmptyDescription>El postulante aún no ha subido documentos.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              evs.map((e) => (
                <section key={e.id} className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">{e.titulo}</h3>
                    <span className="text-xs text-muted-foreground">
                      {e.curso} · enviado {formatDate(e.versiones[0].fecha)}
                    </span>
                  </div>
                  <EvidenceReview evidencia={e} onDecision={handleDecision} />
                </section>
              ))
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  )
}

function Detail({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2 flex flex-col gap-0.5" : "flex flex-col gap-0.5"}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
