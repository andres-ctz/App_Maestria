"use client"

import { useState } from "react"
import { Check, FileText, RotateCcw, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { EvidenciaBadge } from "@/components/status/status-badge"
import { VersionHistory } from "@/components/evidencias/version-history"
import { formatDateTime } from "@/lib/format"
import type { Evidencia, EstadoEvidencia } from "@/lib/types"

export function EvidenceReview({
  evidencia,
  onDecision,
}: {
  evidencia: Evidencia
  onDecision?: (id: string, estado: EstadoEvidencia, feedback: string) => void
}) {
  const [feedback, setFeedback] = useState("")
  const latest = evidencia.versiones[0]
  const reviewable = latest.estado === "pendiente"

  function decide(estado: EstadoEvidencia) {
    if (estado !== "aprobado" && feedback.trim().length < 5) {
      toast.error("Agrega retroalimentación", { description: "Es obligatoria para solicitar corrección o rechazar." })
      return
    }
    onDecision?.(evidencia.id, estado, feedback.trim())
    const labels: Record<string, string> = {
      aprobado: "Evidencia aprobada",
      "en-correccion": "Corrección solicitada",
      rechazado: "Evidencia rechazada",
    }
    toast.success(labels[estado], { description: `${evidencia.titulo} · v${latest.version}` })
    setFeedback("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3 rounded-lg border p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <FileText className="size-5" aria-hidden />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-medium">{latest.archivo}</span>
            <EvidenciaBadge estado={latest.estado} />
          </div>
          <span className="text-xs text-muted-foreground">
            v{latest.version} · {latest.tamano} · {formatDateTime(latest.fecha)}
          </span>
        </div>
      </div>

      {reviewable && onDecision && (
        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor={`fb-${evidencia.id}`}>Retroalimentación para el postulante</FieldLabel>
            <Textarea
              id={`fb-${evidencia.id}`}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Indica fortalezas, observaciones y qué debe corregir..."
              className="min-h-20"
            />
          </Field>
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="outline" onClick={() => decide("rechazado")}>
              <X data-icon="inline-start" />
              Rechazar
            </Button>
            <Button variant="outline" onClick={() => decide("en-correccion")}>
              <RotateCcw data-icon="inline-start" />
              Solicitar corrección
            </Button>
            <Button onClick={() => decide("aprobado")}>
              <Check data-icon="inline-start" />
              Aprobar
            </Button>
          </div>
        </div>
      )}

      <VersionHistory versiones={evidencia.versiones} />
    </div>
  )
}
