import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ModulePlaceholder } from "@/components/module-placeholder"
import { buscarRuta } from "@/lib/modules"

export const metadata: Metadata = { title: "Registro de postulantes" }

export default function Page() {
  const ruta = buscarRuta("/registro")
  if (!ruta) notFound()
  return <ModulePlaceholder ruta={ruta} volver={{ href: "/login", etiqueta: "Volver a iniciar sesión" }} />
}
