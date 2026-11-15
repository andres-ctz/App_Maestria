import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { ToneBadge } from "@/components/status/status-badge"
import type { DefinicionRuta } from "@/lib/modules"

/**
 * Pantalla provisional de un módulo que aún no se desarrolla.
 * Muestra el estado y lo que incluirá, tomado del registro de rutas (Documento Maestro v0.3).
 */
export function ModulePlaceholder({ ruta, volver }: { ruta: DefinicionRuta; volver?: { href: string; etiqueta: string } }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title={ruta.titulo}
        description={ruta.descripcion}
        actions={
          <ToneBadge tone="info">
            <Construction data-icon="inline-start" />
            Pantalla provisional
          </ToneBadge>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Esta sección aún no está desarrollada</CardTitle>
          <CardDescription>
            {ruta.modulo ? `Módulo ${ruta.modulo} del Documento Maestro v0.3.` : "Se implementará en una fase posterior."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {ruta.incluira && ruta.incluira.length > 0 && (
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-medium">Qué incluirá</h2>
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
                {ruta.incluira.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
          )}
          {ruta.pendientes && ruta.pendientes.length > 0 && (
            <section className="flex flex-col gap-2 rounded-lg border p-3">
              <h2 className="text-sm font-medium">Pendiente de definición</h2>
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
                {ruta.pendientes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
          )}
          {volver && (
            <div>
              <Button variant="outline" render={<Link href={volver.href} />}>
                {volver.etiqueta}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
