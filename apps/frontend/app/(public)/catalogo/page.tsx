import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ModulePlaceholder } from "@/components/module-placeholder"
import { buscarRuta } from "@/lib/modules"

export const metadata: Metadata = { title: "Convocatorias disponibles" }

export default function Page() {
  const ruta = buscarRuta("/catalogo")
  if (!ruta) notFound()
  return <ModulePlaceholder ruta={ruta} />
}
