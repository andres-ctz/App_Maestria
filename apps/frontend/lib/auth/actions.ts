"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { destinoSeguro, rutaInicial } from "@/lib/access"
import { mensajesError, obtenerAuthService } from "@/lib/auth/auth-service"
import { COOKIE_SESION } from "@/lib/auth/constants"
import { rolInicial, serializarSesion } from "@/lib/auth/sesion"
import { leerSesion } from "@/lib/auth/session"
import type { Role } from "@/lib/types"

export interface EstadoLogin {
  error?: string
}

/**
 * La cookie solo se marca Secure cuando la conexión es HTTPS (o producción sin demostración),
 * para que la compilación local (`next start` con AUTH_DEMO=true sobre http) siga funcionando.
 */
async function opcionesCookie() {
  const encabezados = await headers()
  const https = encabezados.get("x-forwarded-proto") === "https"
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: https || (process.env.NODE_ENV === "production" && process.env.AUTH_DEMO !== "true"),
  }
}

export async function iniciarSesionAction(_previo: EstadoLogin, datos: FormData): Promise<EstadoLogin> {
  const email = String(datos.get("email") ?? "")
  const contrasena = String(datos.get("contrasena") ?? "")
  const siguiente = String(datos.get("next") ?? "")

  if (!email.trim()) return { error: "Escribe tu correo electrónico." }

  const resultado = await obtenerAuthService().iniciarSesion({ email, contrasena })
  if (!resultado.ok) return { error: mensajesError[resultado.error] }

  const { cuenta } = resultado
  const rol = rolInicial(cuenta)
  const almacen = await cookies()
  almacen.set(COOKIE_SESION, serializarSesion(cuenta.id, rol), await opcionesCookie())
  redirect(destinoSeguro(siguiente, rol, cuenta) ?? rutaInicial(rol, cuenta))
}

/** Solo permite cambiar a un rol que la cuenta ya tiene. */
export async function cambiarRolAction(rol: Role): Promise<void> {
  const sesion = await leerSesion()
  if (!sesion || !sesion.cuenta.roles.includes(rol)) redirect("/login")
  const almacen = await cookies()
  almacen.set(COOKIE_SESION, serializarSesion(sesion.cuenta.id, rol), await opcionesCookie())
  redirect(rutaInicial(rol, sesion.cuenta))
}

export async function cerrarSesionAction(): Promise<void> {
  const almacen = await cookies()
  almacen.delete(COOKIE_SESION)
  redirect("/login")
}
