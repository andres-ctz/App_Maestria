import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { COOKIE_SESION } from "@/lib/auth/constants"
import { resolverSesion, type Sesion } from "@/lib/auth/sesion"

/** Lee la sesión desde la cookie (solo servidor). */
export async function leerSesion(): Promise<Sesion | null> {
  const almacen = await cookies()
  return resolverSesion(almacen.get(COOKIE_SESION)?.value)
}

/** Exige una sesión válida; si no la hay, limpia la cookie y vuelve al login. */
export async function requerirSesion(): Promise<Sesion> {
  const sesion = await leerSesion()
  if (!sesion) redirect("/salir")
  return sesion
}
