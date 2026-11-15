import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { EstadoCumplimiento, EstadoPostulacion, EstadoRevision } from "@/lib/types"

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

/** Estados de la postulación (v0.3 §6.3). La lista oficial sigue en revisión. */
const postulacionMap: Record<EstadoPostulacion, { label: string; tone: Tone }> = {
  borrador: { label: "Borrador", tone: "neutral" },
  recibida: { label: "Recibida", tone: "info" },
  "en-revision": { label: "En revisión", tone: "info" },
  "pendiente-correccion": { label: "Pendiente de corrección", tone: "warning" },
  validada: { label: "Validada", tone: "success" },
  admitida: { label: "Admitida", tone: "success" },
  "no-admitida": { label: "No admitida", tone: "danger" },
  "en-lista-de-espera": { label: "En lista de espera", tone: "warning" },
}

export function PostulacionBadge({ estado }: { estado: EstadoPostulacion }) {
  const s = postulacionMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}

const cumplimientoMap: Record<EstadoCumplimiento, { label: string; tone: Tone }> = {
  "al-dia": { label: "Al día", tone: "success" },
  atrasado: { label: "Atrasado", tone: "danger" },
  "sin-entregas": { label: "Sin entregas", tone: "neutral" },
}

export function CumplimientoBadge({ estado }: { estado: EstadoCumplimiento }) {
  const s = cumplimientoMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}

const revisionMap: Record<EstadoRevision | "entregado", { label: string; tone: Tone }> = {
  pendiente: { label: "Pendiente de revisión", tone: "warning" },
  "en-correccion": { label: "En corrección", tone: "info" },
  aprobado: { label: "Aprobado", tone: "success" },
  rechazado: { label: "Rechazado", tone: "danger" },
  entregado: { label: "Entregado", tone: "info" },
}

export function RevisionBadge({ estado }: { estado: EstadoRevision | "entregado" }) {
  const s = revisionMap[estado]
  return <ToneBadge tone={s.tone}>{s.label}</ToneBadge>
}
