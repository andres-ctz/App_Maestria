"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { AlertTriangle, FlaskConical } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ToneBadge } from "@/components/status/status-badge"
import { etiquetaRol } from "@/lib/access"
import { iniciarSesionAction, type EstadoLogin } from "@/lib/auth/actions"
import type { Usuario } from "@/lib/types"

export function LoginForm({ siguiente, demo, cuentas }: { siguiente?: string; demo: boolean; cuentas: Usuario[] }) {
  const [estado, accion, pendiente] = useActionState<EstadoLogin, FormData>(iniciarSesionAction, {})
  const [email, setEmail] = useState("")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Accede con tu correo electrónico.</CardDescription>
        </CardHeader>
        <form action={accion}>
          <CardContent className="flex flex-col gap-4">
            {demo ? (
              <Alert>
                <FlaskConical />
                <AlertTitle>Modo demostración</AlertTitle>
                <AlertDescription>
                  Esta versión no tiene backend: la cuenta se identifica solo por el correo y no se valida la contraseña.
                  Solo para desarrollo.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle />
                <AlertTitle>Autenticación no disponible</AlertTitle>
                <AlertDescription>El proveedor de autenticación no está configurado en este entorno.</AlertDescription>
              </Alert>
            )}
            <input type="hidden" name="next" value={siguiente ?? ""} />
            <FieldGroup>
              <Field data-invalid={Boolean(estado.error)}>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(estado.error)}
                  disabled={!demo}
                  required
                />
                {estado.error && <FieldError>{estado.error}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="contrasena">Contraseña</FieldLabel>
                <Input id="contrasena" name="contrasena" type="password" autoComplete="current-password" disabled={!demo} />
                {demo && <FieldDescription>No se valida en modo demostración.</FieldDescription>}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3">
            <Button type="submit" disabled={!demo || pendiente}>
              {pendiente ? "Ingresando…" : "Ingresar"}
            </Button>
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <Link href="/recuperar-contrasena" className="text-muted-foreground hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
              <Link href="/registro" className="text-muted-foreground hover:underline">
                Crear cuenta de postulante
              </Link>
              <Link href="/catalogo" className="text-muted-foreground hover:underline">
                Ver convocatorias
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {demo && (
        <Card>
          <CardHeader>
            <CardTitle>Cuentas de demostración</CardTitle>
            <CardDescription>Elige una para rellenar el correo y probar cada rol.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y">
              {cuentas.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className="flex w-full flex-wrap items-center gap-2 py-2.5 text-left text-sm hover:bg-muted/50 focus-visible:outline-2 disabled:opacity-60"
                    onClick={() => setEmail(c.email)}
                    disabled={c.estado !== "activo"}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{c.nombre}</span>
                      <span className="truncate text-xs text-muted-foreground">{c.email}</span>
                    </span>
                    <span className="flex flex-wrap justify-end gap-1">
                      {c.roles.map((r) => (
                        <ToneBadge key={r} tone="info">
                          {etiquetaRol[r]}
                        </ToneBadge>
                      ))}
                      {c.protegida && <ToneBadge tone="neutral">Cuenta protegida</ToneBadge>}
                      {c.estado !== "activo" && <ToneBadge tone="danger">Desactivada</ToneBadge>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  )
}
