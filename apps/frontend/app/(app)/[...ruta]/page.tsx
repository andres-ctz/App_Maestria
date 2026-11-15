import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { ModulePlaceholder } from "@/components/module-placeholder"
import { puedeAcceder } from "@/lib/access"
import { requerirSesion } from "@/lib/auth/session"
import { buscarRuta } from "@/lib/modules"

type Props = { params: Promise<{ ruta: string[] }> }

/** Pantalla provisional para toda ruta registrada que todavía no tiene su propia página. */
function resolver(segmentos: string[]) {
  const definicion = buscarRuta(`/${segmentos.join("/")}`)
  return definicion && definicion.estado === "provisional" && !definicion.publica ? definicion : undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ruta } = await params
  return { title: resolver(ruta)?.titulo ?? "No encontrado" }
}

export default async function ProvisionalPage({ params }: Props) {
  const { ruta } = await params
  const definicion = resolver(ruta)
  if (!definicion) notFound()

  // El proxy ya filtra por rol; esta comprobación evita depender solo de él.
  const sesion = await requerirSesion()
  if (!puedeAcceder(definicion.ruta, sesion.rolActivo, sesion.cuenta)) redirect("/sin-acceso")

  return <ModulePlaceholder ruta={definicion} />
}
