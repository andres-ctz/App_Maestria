"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { ToneBadge } from "@/components/status/status-badge"

/**
 * Botón de notificaciones.
 *
 * El centro de notificaciones pertenece a una fase posterior (módulo 14 del Documento Maestro).
 * Mientras tanto el botón sigue en su lugar y responde con un aviso claro, sin mostrar
 * notificaciones inventadas ni contadores. Cuando exista el módulo se conectará con los tipos
 * y las preferencias de notificación.
 */
export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Notificaciones (próximamente)" title="Notificaciones · próximamente" />
        }
      >
        <Bell />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <PopoverHeader>
          <div className="flex items-center gap-2">
            <PopoverTitle>Notificaciones</PopoverTitle>
            <ToneBadge tone="info">Próximamente</ToneBadge>
          </div>
          <PopoverDescription>
            El centro de notificaciones se habilitará en una fase posterior. Por ahora no hay avisos que mostrar.
          </PopoverDescription>
        </PopoverHeader>
        <Button variant="outline" size="sm" render={<Link href="/notificaciones" />}>
          Ver qué incluirá
        </Button>
      </PopoverContent>
    </Popover>
  )
}
