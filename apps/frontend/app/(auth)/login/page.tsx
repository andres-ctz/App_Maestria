import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { demoHabilitado } from "@/lib/auth/constants"
import { usuarios } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Iniciar sesión" }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  const demo = demoHabilitado()

  return <LoginForm siguiente={next} demo={demo} cuentas={demo ? usuarios : []} />
}
