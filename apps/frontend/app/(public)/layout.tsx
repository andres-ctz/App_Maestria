import Link from "next/link"
import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { rutaInicial } from "@/lib/access"
import { leerSesion } from "@/lib/auth/session"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const sesion = await leerSesion()

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between gap-4 border-b px-4 py-3 md:px-8">
        <Brand />
        <nav className="flex items-center gap-2" aria-label="Acceso">
          {sesion ? (
            <Button render={<Link href={rutaInicial(sesion.rolActivo, sesion.cuenta)} />}>Ir a mi cuenta</Button>
          ) : (
            <>
              <Button variant="ghost" render={<Link href="/registro" />}>
                Registrarme
              </Button>
              <Button render={<Link href="/login" />}>Iniciar sesión</Button>
            </>
          )}
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">{children}</main>
    </div>
  )
}
