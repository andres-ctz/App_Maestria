"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { construirNavegacion } from "@/lib/navigation"
import { institucion } from "@/lib/config/institucion"
import { useSesion } from "@/components/providers/sesion-provider"
import { UserMenu } from "@/components/app-shell/user-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const { role, user, inicio } = useSesion()
  const sections = construirNavegacion(role, user)
  const hrefs = sections.flatMap((s) => s.items.map((i) => i.href))

  // Un elemento está activo si la ruta coincide o es un hijo suyo, salvo que otro elemento del menú coincida mejor.
  const isActive = (href: string) => {
    if (pathname === href) return true
    if (!pathname.startsWith(`${href}/`)) return false
    return !hrefs.some((h) => h !== href && h.length > href.length && (pathname === h || pathname.startsWith(`${h}/`)))
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href={inicio} />} tooltip={institucion.nombre}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{institucion.nombre}</span>
                <span className="truncate text-xs text-muted-foreground">{institucion.unidad}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive(item.href)}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
