import { CalendarCheck, Mail, MessageCircle, Phone, Users, type LucideIcon } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ToneBadge } from "@/components/status/status-badge"
import { formatDate, formatDateTime } from "@/lib/format"
import type { ResultadoContacto, Seguimiento, TipoContacto } from "@/lib/types"

const tipoMeta: Record<TipoContacto, { label: string; icon: LucideIcon }> = {
  llamada: { label: "Llamada", icon: Phone },
  correo: { label: "Correo", icon: Mail },
  reunion: { label: "Reunión", icon: Users },
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
}

const resultadoMeta: Record<ResultadoContacto, { label: string; tone: "success" | "warning" | "info" }> = {
  contactado: { label: "Contactado", tone: "success" },
  "no-contesta": { label: "No contesta", tone: "warning" },
  reprogramado: { label: "Reprogramado", tone: "info" },
}

export function ContactTimeline({ items }: { items: Seguimiento[] }) {
  if (items.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircle />
          </EmptyMedia>
          <EmptyTitle>Sin contactos registrados</EmptyTitle>
          <EmptyDescription>Registra el primer contacto para iniciar la bitácora de tutoría.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <ol className="relative flex flex-col gap-5 border-l pl-6" aria-label="Historial de seguimiento">
      {items.map((s) => {
        const tipo = tipoMeta[s.tipo]
        const res = resultadoMeta[s.resultado]
        const Icon = tipo.icon
        return (
          <li key={s.id} className="relative flex flex-col gap-2">
            <span className="absolute -left-[37px] flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground">
              <Icon className="size-3" aria-hidden />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{tipo.label}</span>
              <ToneBadge tone={res.tone}>{res.label}</ToneBadge>
              <time className="ml-auto text-xs text-muted-foreground tabular-nums" dateTime={s.fecha}>
                {formatDateTime(s.fecha)}
              </time>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{s.observaciones}</p>
            {s.compromiso && (
              <div className="flex items-start gap-2 rounded-md border bg-muted/40 p-2.5 text-sm">
                <CalendarCheck
                  className={s.compromiso.cumplido ? "mt-0.5 size-4 text-success" : "mt-0.5 size-4 text-warning"}
                  aria-hidden
                />
                <div className="flex flex-1 flex-col">
                  <span>{s.compromiso.descripcion}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.compromiso.cumplido ? "Cumplido" : "Vence"} · {formatDate(s.compromiso.fechaLimite)}
                  </span>
                </div>
              </div>
            )}
            {s.proximaAccion && (
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Próxima acción:</span> {s.proximaAccion}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
