import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { EvidenceInbox } from "@/components/evidencias/evidence-inbox"
import { evidencias, getTutor, postulantes } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Revisión de evidencias" }

export default function EvidenciasPage() {
  const mine = postulantes.filter((p) => p.tutorId === "t-1")
  const ids = new Set(mine.map((p) => p.id))

  return (
    <>
      <PageHeader
        title="Revisión de evidencias"
        description="Aprueba, solicita corrección o rechaza con retroalimentación. Cada decisión queda versionada y auditada."
      />
      <EvidenceInbox
        initial={evidencias.filter((e) => ids.has(e.postulanteId))}
        postulantes={mine}
        revisor={getTutor("t-1")?.nombre ?? "Tutor"}
      />
    </>
  )
}
