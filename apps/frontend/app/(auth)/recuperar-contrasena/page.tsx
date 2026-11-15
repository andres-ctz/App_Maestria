import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ModulePlaceholder } from "@/components/module-placeholder"
import { buscarRuta } from "@/lib/modules"

export const metadata: Metadata = { title: "Recuperar contraseña" }

export default function Page() {
  const ruta = buscarRuta("/recuperar-contrasena")
  if (!ruta) notFound()
  return <ModulePlaceholder ruta={ruta} volver={{ href: "/login", etiqueta: "Volver a iniciar sesión" }} />
}
