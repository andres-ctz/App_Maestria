import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { EntregasInbox } from "@/components/entregas/entregas-inbox"
import { requerirSesion } from "@/lib/auth/session"
import { entregas, estudiantes } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Entregas por revisar" }

export default async function EntregasPage() {
  const { cuenta } = await requerirSesion()
  const mine = estudiantes.filter((e) => e.tutorId === cuenta.id)
  const ids = new Set(mine.map((e) => e.id))

  return (
    <>
      <PageHeader
        title="Entregas por revisar"
        description="Aprueba, solicita corrección o rechaza con retroalimentación. Cada decisión queda versionada y auditada."
      />
      <EntregasInbox
        initial={entregas.filter((e) => ids.has(e.estudianteId))}
        estudiantes={mine}
        revisor={cuenta.nombre}
      />
    </>
  )
}
