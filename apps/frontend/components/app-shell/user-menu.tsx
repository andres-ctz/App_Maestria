"use client"

import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown, LogOut, UserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSesion } from "@/components/providers/sesion-provider"
import { etiquetaRol } from "@/lib/access"

/** Menú de la cuenta. El cambio de rol solo aparece si la cuenta tiene varios roles autorizados. */
export function UserMenu() {
  const router = useRouter()
  const { role, user, roles, switchRole, cerrarSesion, cambiando } = useSesion()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" aria-label="Menú de la cuenta" />}>
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
