import { NextResponse, type NextRequest } from "next/server"
import { puedeAcceder, rutaInicial } from "@/lib/access"
import { COOKIE_SESION } from "@/lib/auth/constants"
import { resolverSesion } from "@/lib/auth/sesion"
import { buscarRuta, esRutaPublica } from "@/lib/modules"

/**
 * Protección de rutas por sesión y rol.
 *
 * Es control de experiencia de usuario: la sesión de esta fase es de demostración y la
 * seguridad real se valida en el backend en una fase posterior.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sesion = resolverSesion(request.cookies.get(COOKIE_SESION)?.value)
  const ir = (destino: string) => NextResponse.redirect(new URL(destino, request.url))

  if (pathname === "/") return ir(sesion ? rutaInicial(sesion.rolActivo, sesion.cuenta) : "/login")

  // /login se puede abrir con sesión activa: en la demostración sirve para cambiar de cuenta.
  if (esRutaPublica(pathname)) return NextResponse.next()

  if (!sesion) {
    const destino = new URL("/login", request.url)
    destino.searchParams.set("next", pathname)
    return NextResponse.redirect(destino)
  }

  // Las rutas que no existen siguen su curso normal hacia la página 404.
  if (!buscarRuta(pathname)) return NextResponse.next()

  if (!puedeAcceder(pathname, sesion.rolActivo, sesion.cuenta)) return ir("/sin-acceso")
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
