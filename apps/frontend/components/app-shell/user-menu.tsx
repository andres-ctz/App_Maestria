"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown, FlaskConical, LogOut, UserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSesion } from "@/components/providers/sesion-provider"
import { etiquetaRol } from "@/lib/access"

/**
 * Menú de la cuenta.
 *
 * - «Cambiar de rol» solo aparece si la cuenta tiene varios roles autorizados.
 * - «Cambiar de cuenta» solo aparece en el modo de demostración local y no cambia permisos.
 * - «Cerrar sesión» elimina la cookie de demostración y vuelve al inicio de sesión.
 */
export function UserMenu() {
  const router = useRouter()
  // Estado controlado: en la compilación de producción el `aria-expanded` que pone Base UI
  // quedaba en "false" con el menú abierto. Se fija aquí y se pasa al disparador; no quitarlo.
  const [abierto, setAbierto] = useState(false)
  const { role, user, roles, cuentasDemo, switchRole, cambiarCuenta, cerrarSesion, cambiando } = useSesion()
  const cuentasActivas = cuentasDemo.filter((c) => c.estado === "activo")

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={abierto} onOpenChange={setAbierto}>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" aria-label="Menú de la cuenta" aria-expanded={abierto} />}>
            <Avatar>
              <AvatarFallback>{user.iniciales}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.nombre}</span>
              <span className="truncate text-xs text-muted-foreground">{etiquetaRol[role]}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="min-w-60">
            {roles.length > 1 && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Cambiar de rol</DropdownMenuLabel>
                  {roles.map((r) => (
                    <DropdownMenuItem key={r} disabled={cambiando} onClick={() => r !== role && switchRole(r)}>
                      <span className="flex-1">{etiquetaRol[r]}</span>
                      {r === role && <Check />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/perfil")}>
                <UserRound />
                Mi perfil
              </DropdownMenuItem>
              {cuentasActivas.length > 0 && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger disabled={cambiando}>
                    <FlaskConical />
                    Cambiar de cuenta (demostración)
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-80 min-w-72 overflow-y-auto">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Solo para pruebas locales</DropdownMenuLabel>
                      {cuentasActivas.map((c) => (
                        <DropdownMenuItem key={c.id} disabled={cambiando || c.id === user.id} onClick={() => cambiarCuenta(c.id)}>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate">{c.nombre}</span>
                            <span className="truncate text-xs text-muted-foreground">
                              {c.roles.map((r) => etiquetaRol[r]).join(" · ")}
                            </span>
                          </span>
                          {c.id === user.id && <Check />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}
              <DropdownMenuItem disabled={cambiando} onClick={cerrarSesion}>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
