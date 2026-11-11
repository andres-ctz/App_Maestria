import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { AppHeader } from "@/components/app-shell/app-header"
import { RoleProvider } from "@/components/providers/role-provider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </RoleProvider>
  )
}
