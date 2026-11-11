"use client"

import { ChevronsUpDown, Check } from "lucide-react"
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
import { useRole } from "@/components/providers/role-provider"
import { roleLabels } from "@/lib/navigation"
import type { Role } from "@/lib/types"

const roles: Role[] = ["admin", "coordinador", "tutor", "postulante"]

export function RoleSwitcher() {
  const { role, user, switchRole } = useRole()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" aria-label="Cambiar rol de vista" />}
          >
            <Avatar>
              <AvatarFallback>{user.iniciales}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.nombre}</span>
              <span className="truncate text-xs text-muted-foreground">{roleLabels[role]}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="min-w-60">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ver la plataforma como</DropdownMenuLabel>
              {roles.map((r) => (
                <DropdownMenuItem key={r} onClick={() => switchRole(r)}>
                  <span className="flex-1">{roleLabels[r]}</span>
                  {r === role && <Check />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
