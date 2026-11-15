import { usuarios } from "@/lib/mock-data"
import type { Role, Usuario } from "@/lib/types"

export interface Sesion {
  cuenta: Usuario
  rolActivo: Role
}

export function serializarSesion(cuentaId: string, rol: Role): string {
  return `${cuentaId}:${rol}`
}

/**
 * Interpreta el valor de la cookie de demostración. Devuelve null si la cuenta no
 * existe, está desactivada o no tiene el rol indicado.
 */
export function resolverSesion(valor: string | null | undefined): Sesion | null {
  if (!valor) return null
  const separador = valor.lastIndexOf(":")
  if (separador < 1) return null
  const id = valor.slice(0, separador)
  const rol = valor.slice(separador + 1) as Role
  const cuenta = usuarios.find((u) => u.id === id)
  if (!cuenta || cuenta.estado !== "activo" || !cuenta.roles.includes(rol)) return null
  return { cuenta, rolActivo: rol }
}

export function rolInicial(cuenta: Usuario): Role {
  return cuenta.roles[0]
}
