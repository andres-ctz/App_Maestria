"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { ToneBadge } from "@/components/status/status-badge"

/**
 * Botón de notificaciones.
 *
 * El centro de notificaciones pertenece a una fase posterior (módulo 14 del Documento Maestro).
 * Mientras tanto la campana abre un panel flotante anclado a ella, sin cambiar de ruta, que
 * indica que la función está pendiente. No muestra notificaciones inventadas ni contadores.
 * El panel se cierra al pulsar de nuevo la campana, al pulsar fuera y con Escape.
 * Cuando exista el módulo se conectará con los tipos y las preferencias de notificación.
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
      {/* La anchura se limita al ancho de la pantalla para que no se salga en móviles. */}
      <PopoverContent align="end" className="w-72 max-w-[calc(100vw-1.5rem)]">
        <PopoverHeader>
          <div className="flex items-center gap-2">
            <PopoverTitle>Notificaciones</PopoverTitle>
            <ToneBadge tone="info">Próximamente</ToneBadge>
          </div>
          <PopoverDescription>
            El centro de notificaciones se habilitará en una fase posterior. Por ahora no hay avisos que mostrar.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
