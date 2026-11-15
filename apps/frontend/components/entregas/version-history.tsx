import { MessageSquareQuote } from "lucide-react"
import { RevisionBadge } from "@/components/status/status-badge"
import { formatDateTime } from "@/lib/format"
import type { VersionEntrega } from "@/lib/types"

export function VersionHistory({ versiones }: { versiones: VersionEntrega[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Historial de versiones</h4>
      <ol className="flex flex-col gap-2">
        {versiones.map((v) => (
          <li key={v.version} className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">v{v.version}</span>
              <span className="min-w-0 flex-1 truncate text-sm">{v.archivo}</span>
              <RevisionBadge estado={v.estado} />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatDateTime(v.fecha)} · {v.tamano}
            </span>
            {v.feedback && (
              <div className="flex gap-2 rounded-md bg-muted/50 p-2.5 text-sm">
                <MessageSquareQuote className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <span className="text-pretty">{v.feedback}</span>
                  {v.revisor && <span className="text-xs text-muted-foreground">— {v.revisor}</span>}
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
