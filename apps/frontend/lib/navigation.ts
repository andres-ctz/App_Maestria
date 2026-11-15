import {
  Award,
  Bell,
  BookOpen,
  BookOpenCheck,
  Building2,
  CalendarRange,
  ClipboardList,
  FileCheck2,
  FileText,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  Settings,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserRound,
  UserRoundSearch,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import { puedeAcceder } from "@/lib/access"
import { RUTAS } from "@/lib/modules"
import { entregas, estudiantes, postulaciones } from "@/lib/mock-data"
import type { Role, Usuario } from "@/lib/types"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export interface NavSection {
  label: string
  items: NavItem[]
}

/** Iconos por id de ruta. Se exporta para las pruebas. */
export const ICONOS_NAVEGACION: Record<string, LucideIcon> = {
  usuarios: Users,
  configuracion: Settings,
  facultades: Building2,
  programas: GraduationCap,
  periodos: CalendarRange,
  convocatorias: Megaphone,
  postulaciones: Inbox,
  admisiones: UserCheck,
  matriculas: ClipboardList,
  cursos: BookOpen,
  tutores: UserCog,
  calificaciones: Award,
  dashboard: LayoutDashboard,
  estudiantes: UserRoundSearch,
  reportes: FileText,
  auditoria: ShieldCheck,
  tutor: Users,
  "tutor-entregas": FileCheck2,
  "tutor-cursos": BookOpen,
  "tutor-actividades": ClipboardList,
  "tutor-evaluaciones": ListChecks,
  "tutor-calificaciones": Award,
  "tutor-grupos": UsersRound,
  catalogo: Megaphone,
  "postulante-postulaciones": Inbox,
  estudiante: GraduationCap,
  "estudiante-actividades": BookOpenCheck,
  "estudiante-evaluaciones": ListChecks,
  "estudiante-calificaciones": Award,
  notificaciones: Bell,
  perfil: UserRound,
}

/** Secciones de cada rol. Cada elemento se filtra después por permisos y por el estado de la cuenta. */
export const ESTRUCTURA_NAVEGACION: Record<Role, { label: string; ids: string[] }[]> = {
  admin: [
    { label: "Administración", ids: ["usuarios", "configuracion"] },
    { label: "Estructura académica", ids: ["facultades", "programas", "periodos"] },
    { label: "Procesos", ids: ["convocatorias", "postulaciones", "admisiones", "matriculas"] },
    { label: "Gestión académica", ids: ["cursos", "tutores", "calificaciones"] },
    { label: "Seguimiento y control", ids: ["dashboard", "estudiantes", "reportes", "auditoria"] },
  ],
  coordinador: [
    { label: "Gestión académica", ids: ["dashboard", "programas", "convocatorias", "cursos", "tutores"] },
    { label: "Admisión", ids: ["postulaciones", "admisiones", "matriculas"] },
    { label: "Seguimiento y control", ids: ["estudiantes", "reportes", "auditoria"] },
  ],
  tutor: [
    { label: "Tutoría", ids: ["tutor", "tutor-entregas"] },
    { label: "Docencia", ids: ["tutor-cursos", "tutor-actividades", "tutor-evaluaciones", "tutor-calificaciones", "tutor-grupos"] },
    { label: "Reportes", ids: ["reportes"] },
  ],
  postulante: [
    { label: "Admisión", ids: ["catalogo", "postulante-postulaciones"] },
    { label: "Mi curso", ids: ["estudiante", "estudiante-actividades", "estudiante-evaluaciones", "estudiante-calificaciones", "reportes"] },
  ],
}

export const IDS_CUENTA_COMUN = ["notificaciones", "perfil"]

function insignia(id: string, cuenta: Usuario): string | undefined {
  if (id === "postulaciones") {
    const n = postulaciones.filter((p) => ["recibida", "en-revision", "pendiente-correccion"].includes(p.estado)).length
    return n > 0 ? String(n) : undefined
  }
  if (id === "tutor-entregas") {
    const suyos = new Set(estudiantes.filter((e) => e.tutorId === cuenta.id).map((e) => e.id))
    const n = entregas.filter((e) => suyos.has(e.estudianteId) && e.estado === "pendiente").length
    return n > 0 ? String(n) : undefined
  }
  return undefined
}

/** Construye el menú de un rol para una cuenta. Solo incluye rutas a las que realmente puede entrar. */
export function construirNavegacion(rol: Role, cuenta: Usuario): NavSection[] {
  const secciones = [...ESTRUCTURA_NAVEGACION[rol], { label: "Mi cuenta", ids: IDS_CUENTA_COMUN }]
  return secciones
    .map((s) => ({
      label: s.label,
      items: s.ids.flatMap((id): NavItem[] => {
        const ruta = RUTAS.find((r) => r.id === id)
        if (!ruta || !puedeAcceder(ruta.ruta, rol, cuenta)) return []
        return [{ title: ruta.titulo, href: ruta.ruta, icon: ICONOS_NAVEGACION[id], badge: insignia(id, cuenta) }]
      }),
    }))
    .filter((s) => s.items.length > 0)
}
