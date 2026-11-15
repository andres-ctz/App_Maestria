import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ActivityList } from "@/components/estudiante/activity-list"
import { actividadesEstudiante } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Mis actividades" }

export default function ActividadesPage() {
  return (
    <>
      <PageHeader
        title="Mis actividades"
        description="Sube tus entregas antes de la fecha límite. Si tu tutor solicita correcciones, podrás enviar una nueva versión."
      />
      <ActivityList initial={actividadesEstudiante} />
    </>
  )
}
