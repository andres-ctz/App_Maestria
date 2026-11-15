import { buscarRuta, esRutaPublica, normalizarRuta } from "@/lib/modules"
import type { Role, Usuario } from "@/lib/types"

export const etiquetaRol: Record<Role, string> = {
  admin: "Administrador",
  coordinador: "Coordinador",
  tutor: "Tutor",
  postulante: "Postulante / Estudiante",
}

/**
 * Indica si un rol activo puede abrir una ruta.
 *
 * IMPORTANTE: esto es control de experiencia de usuario en el frontend. La seguridad
 * real (permisos por rol y por asignación) debe validarse en el backend.
 */
export function puedeAcceder(pathname: string, rol: Role, cuenta?: Pick<Usuario, "situacion">): boolean {
  if (esRutaPublica(pathname)) return true
  const ruta = buscarRuta(pathname)
  if (!ruta || !ruta.roles.includes(rol)) return false
  if (rol === "postulante" && ruta.requiere) {
    const s = cuenta?.situacion
    if (ruta.requiere === "matricula") return Boolean(s?.tieneMatricula)
    if (ruta.requiere === "postulacion") return Boolean(s?.tienePostulaciones)
  }
  return true
}

/** Primera pantalla de cada rol. Para Postulante/Estudiante depende de su situación. */
export function rutaInicial(rol: Role, cuenta?: Pick<Usuario, "situacion">): string {
  switch (rol) {
    case "admin":
      return "/usuarios"
    case "coordinador":
      return "/dashboard"
    case "tutor":
      return "/tutor"
    case "postulante":
      if (cuenta?.situacion?.tieneMatricula) return "/estudiante"
      if (cuenta?.situacion?.tienePostulaciones) return "/postulante/postulaciones"
      return "/catalogo"
  }
}

/** Evita redirecciones abiertas: solo rutas internas a las que el rol puede acceder. */
export function destinoSeguro(destino: string | null | undefined, rol: Role, cuenta?: Pick<Usuario, "situacion">): string | null {
  if (!destino || !destino.startsWith("/") || destino.startsWith("//")) return null
  const ruta = normalizarRuta(destino)
  if (ruta === "/login" || ruta === "/salir") return null
  return puedeAcceder(ruta, rol, cuenta) ? ruta : null
}
