import { demoHabilitado } from "@/lib/auth/constants"
import { usuarios } from "@/lib/mock-data"
import type { Usuario } from "@/lib/types"

/**
 * Contrato de autenticación.
 *
 * En esta fase no existe backend: solo hay un proveedor de demostración. Cuando exista
 * la API real, se implementa otra versión de este contrato y se reemplaza en
 * `obtenerAuthService`, sin tocar las pantallas.
 */
export type ErrorInicioSesion = "credenciales" | "desactivada" | "no-disponible"

export type ResultadoInicioSesion = { ok: true; cuenta: Usuario } | { ok: false; error: ErrorInicioSesion }

export interface AuthService {
  readonly modo: "demo" | "no-disponible"
  iniciarSesion(entrada: { email: string; contrasena?: string }): Promise<ResultadoInicioSesion>
}

/** Proveedor de demostración: identifica la cuenta por correo y NO valida contraseñas. */
const authDemo: AuthService = {
  modo: "demo",
  async iniciarSesion({ email }) {
    const cuenta = usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (!cuenta) return { ok: false, error: "credenciales" }
    if (cuenta.estado !== "activo") return { ok: false, error: "desactivada" }
    return { ok: true, cuenta }
  },
}

const authNoDisponible: AuthService = {
  modo: "no-disponible",
  async iniciarSesion() {
    return { ok: false, error: "no-disponible" }
  },
}

export function obtenerAuthService(): AuthService {
  return demoHabilitado() ? authDemo : authNoDisponible
}

export const mensajesError: Record<ErrorInicioSesion, string> = {
  credenciales: "No encontramos una cuenta con ese correo.",
  desactivada: "Esta cuenta está desactivada. Contacta al administrador.",
  "no-disponible": "El proveedor de autenticación no está configurado en este entorno.",
}
