import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { AppHeader } from "@/components/app-shell/app-header"
import { SesionProvider } from "@/components/providers/sesion-provider"
import { requerirSesion } from "@/lib/auth/session"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sesion = await requerirSesion()

  return (
    <SesionProvider cuenta={sesion.cuenta} rolActivo={sesion.rolActivo}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SesionProvider>
  )
}
