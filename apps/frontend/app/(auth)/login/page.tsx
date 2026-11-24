import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { rutaInicial } from "@/lib/access"
import { listarCuentasDemo } from "@/lib/auth/auth-service"
import { demoHabilitado } from "@/lib/auth/constants"
import { leerSesion } from "@/lib/auth/session"

export const metadata: Metadata = { title: "Iniciar sesión" }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  const demo = demoHabilitado()
  const sesion = await leerSesion()

  return (
    <LoginForm
      siguiente={next}
      demo={demo}
      cuentas={listarCuentasDemo()}
      sesionActual={sesion ? { cuentaId: sesion.cuenta.id, nombre: sesion.cuenta.nombre, rol: sesion.rolActivo, inicio: rutaInicial(sesion.rolActivo, sesion.cuenta) } : null}
    />
  )
}
