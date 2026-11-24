"use client"

import { createContext, useContext, useMemo, useTransition } from "react"
import { rutaInicial } from "@/lib/access"
import { cambiarCuentaDemoAction, cambiarRolAction, cerrarSesionAction } from "@/lib/auth/actions"
import type { Role, Usuario } from "@/lib/types"

interface SesionContextValue {
  /** Rol activo en esta sesión. */
  role: Role
  /** Cuenta de la sesión. */
  user: Usuario
  /** Roles que la cuenta tiene autorizados. El cambio de rol solo se ofrece si hay más de uno. */
  roles: Role[]
  inicio: string
  /** Cuentas entre las que se puede cambiar. Vacío fuera del modo demostración. */
  cuentasDemo: Usuario[]
  cambiando: boolean
  switchRole: (role: Role) => void
  cambiarCuenta: (cuentaId: string) => void
  cerrarSesion: () => void
}

const SesionContext = createContext<SesionContextValue | null>(null)

export function SesionProvider({
  cuenta,
  rolActivo,
  cuentasDemo,
  children,
}: {
  cuenta: Usuario
  rolActivo: Role
  cuentasDemo: Usuario[]
  children: React.ReactNode
}) {
  const [cambiando, startTransition] = useTransition()

  const value = useMemo<SesionContextValue>(
    () => ({
      role: rolActivo,
      user: cuenta,
      roles: cuenta.roles,
      inicio: rutaInicial(rolActivo, cuenta),
      cuentasDemo,
      cambiando,
      switchRole: (rol) => startTransition(() => cambiarRolAction(rol)),
      cambiarCuenta: (id) => startTransition(() => cambiarCuentaDemoAction(id)),
      cerrarSesion: () => startTransition(() => cerrarSesionAction()),
    }),
    [cuenta, rolActivo, cuentasDemo, cambiando],
  )

  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>
}

export function useSesion() {
  const ctx = useContext(SesionContext)
  if (!ctx) throw new Error("useSesion debe usarse dentro de SesionProvider")
  return ctx
}
