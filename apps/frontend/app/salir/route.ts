import { NextResponse, type NextRequest } from "next/server"
import { COOKIE_SESION } from "@/lib/auth/constants"

/** Limpia una sesión inválida y vuelve al inicio de sesión. */
export function GET(request: NextRequest) {
  const respuesta = NextResponse.redirect(new URL("/login", request.url))
  respuesta.cookies.delete(COOKIE_SESION)
  return respuesta
}
