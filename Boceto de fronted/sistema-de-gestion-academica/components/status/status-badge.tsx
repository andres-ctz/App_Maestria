import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { EstadoEntrega, EstadoEvidencia, EstadoInscripcion } from "@/lib/types"

type Tone = "success" | "warning" | "danger" | "neutral" | "info"

const toneClass: Record<Tone, string> = {
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning",
  danger: "bg-destructive/12 text-destructive",
  neutral: "bg-muted text-muted-foreground",
  info: "bg-primary/10 text-primary",
}

export function ToneBadge({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <Badge variant="outline" className={cn("border-transparent", toneClass[tone], className)}>
      {children}
    </Badge>
  )
}

const inscripcionMap: Record<EstadoInscripcion, { label: string; tone: Tone }> = {
  pendiente: { label: "Pendiente", tone: "warning" },
  aprobada: { label: "Aprobada", tone: "success" },
  observada: { label: "Observada", tone: "info" },
  rechazada: { label: "Rechazada", tone: "danger" },
}

export function InscripcionBadge({ estado }: { estado: EstadoInscripcion }) {
  const s = inscripcionMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}

const entregaMap: Record<EstadoEntrega, { label: string; tone: Tone }> = {
  "al-dia": { label: "Al día", tone: "success" },
  atrasado: { label: "Atrasado", tone: "danger" },
  "sin-entregas": { label: "Sin entregas", tone: "neutral" },
}

export function EntregaBadge({ estado }: { estado: EstadoEntrega }) {
  const s = entregaMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}

const evidenciaMap: Record<EstadoEvidencia | "entregado", { label: string; tone: Tone }> = {
  pendiente: { label: "Pendiente de revisión", tone: "warning" },
  "en-correccion": { label: "En corrección", tone: "info" },
  aprobado: { label: "Aprobado", tone: "success" },
  rechazado: { label: "Rechazado", tone: "danger" },
  entregado: { label: "Entregado", tone: "info" },
}

export function EvidenciaBadge({ estado }: { estado: EstadoEvidencia | "entregado" }) {
  const s = evidenciaMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}
