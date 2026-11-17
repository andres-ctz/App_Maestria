"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const sinSuscripcion = () => () => {}

/** Verdadero solo en el navegador, después de hidratar: el tema real no se conoce en el servidor. */
function useMontado() {
  return useSyncExternalStore(sinSuscripcion, () => true, () => false)
}

/**
 * Alterna entre tema claro y oscuro. El icono muestra el tema activo (sol en claro, luna en
 * oscuro) y el nombre accesible indica el estado y la acción. El tema elegido lo guarda
 * next-themes y se conserva al navegar y al recargar.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const montado = useMontado()
  const oscuro = montado && resolvedTheme === "dark"
  const accion = oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={montado ? `${oscuro ? "Tema oscuro activo" : "Tema claro activo"}. ${accion}` : "Cambiar tema"}
            onClick={() => setTheme(oscuro ? "light" : "dark")}
          />
        }
      >
        <Sun className="dark:hidden" />
        <Moon className="hidden dark:block" />
      </TooltipTrigger>
      <TooltipContent>{montado ? accion : "Cambiar tema"}</TooltipContent>
    </Tooltip>
  )
}
