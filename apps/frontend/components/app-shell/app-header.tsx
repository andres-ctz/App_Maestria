"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { buscarRuta, titulosPorSegmento } from "@/lib/modules"
import { useSesion } from "@/components/providers/sesion-provider"
import { GlobalSearch } from "@/components/app-shell/global-search"
import { Notifications } from "@/components/app-shell/notifications"
import { ThemeToggle } from "@/components/app-shell/theme-toggle"

export function AppHeader() {
  const pathname = usePathname()
  const { inicio } = useSesion()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={inicio} />}>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((seg, i) => {
            const href = `/${segments.slice(0, i + 1).join("/")}`
            const title = titulosPorSegmento[seg] ?? seg
            const isLast = i === segments.length - 1
            return (
              <Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  ) : buscarRuta(href) ? (
                    <BreadcrumbLink render={<Link href={href} />}>{title}</BreadcrumbLink>
                  ) : (
                    <span className="text-muted-foreground">{title}</span>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex flex-1 items-center justify-end gap-1 md:flex-none">
        <GlobalSearch />
        <Notifications />
        <ThemeToggle />
      </div>
    </header>
  )
}
