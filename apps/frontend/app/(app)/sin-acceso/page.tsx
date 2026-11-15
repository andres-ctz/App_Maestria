import type { Metadata } from "next"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { rutaInicial } from "@/lib/access"
import { requerirSesion } from "@/lib/auth/session"

export const metadata: Metadata = { title: "Sin acceso" }

export default async function SinAccesoPage() {
  const { rolActivo, cuenta } = await requerirSesion()

  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShieldAlert />
        </EmptyMedia>
        <EmptyTitle>No tienes acceso a esta sección</EmptyTitle>
        <EmptyDescription>
          Tu rol actual no tiene permiso para ver esta pantalla. Si crees que es un error, contacta al administrador.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button render={<Link href={rutaInicial(rolActivo, cuenta)} />}>Volver al inicio</Button>
      </EmptyContent>
    </Empty>
  )
}
