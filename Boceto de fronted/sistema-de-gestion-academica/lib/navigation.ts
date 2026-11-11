import {
  BookOpenCheck,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  FileText,
  GraduationCap,
  History,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UserRoundSearch,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { Role } from "@/lib/types"

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

export const roleLabels: Record<Role, string> = {
  admin: "Administrador",
  coordinador: "Coordinador",
  tutor: "Tutor",
  postulante: "Postulante",
}

export const roleUserIds: Record<Role, string> = {
  admin: "u-admin",
  coordinador: "u-coord",
  tutor: "t-1",
  postulante: "p-1",
}

export const navigationByRole: Record<Role, NavSection[]> = {
  admin: [
    {
      label: "Administración",
      items: [
        { title: "Usuarios y roles", href: "/usuarios", icon: Users },
        { title: "Configuración", href: "/configuracion", icon: Settings },
        { title: "Auditoría", href: "/auditoria", icon: ShieldCheck },
      ],
    },
  ],
  coordinador: [
    {
      label: "Gestión académica",
      items: [
        { title: "Panel ejecutivo", href: "/dashboard", icon: LayoutDashboard },
        { title: "Matriz de postulantes", href: "/postulantes", icon: UserRoundSearch, badge: "3" },
        { title: "Programas y cursos", href: "/programas", icon: GraduationCap },
      ],
    },
    {
      label: "Análisis",
      items: [
        { title: "Reportes", href: "/reportes", icon: FileText },
        { title: "Trazabilidad", href: "/auditoria", icon: History },
      ],
    },
  ],
  tutor: [
    {
      label: "Tutoría",
      items: [
        { title: "Mis postulantes", href: "/tutor", icon: Users },
        { title: "Revisión de evidencias", href: "/tutor/evidencias", icon: FileCheck2, badge: "3" },
      ],
    },
  ],
  postulante: [
    {
      label: "Mi portal",
      items: [
        { title: "Mi inscripción", href: "/portal", icon: ClipboardList },
        { title: "Actividades y evidencias", href: "/portal/actividades", icon: BookOpenCheck },
        { title: "Cronograma", href: "/portal/actividades#cronograma", icon: CalendarClock },
      ],
    },
  ],
}

export const roleHome: Record<Role, string> = {
  admin: "/usuarios",
  coordinador: "/dashboard",
  tutor: "/tutor",
  postulante: "/portal",
}

export const routeTitles: Record<string, string> = {
  dashboard: "Panel ejecutivo",
  postulantes: "Matriz de postulantes",
  programas: "Programas y cursos",
  reportes: "Reportes",
  auditoria: "Auditoría y trazabilidad",
  usuarios: "Usuarios y roles",
  configuracion: "Configuración",
  tutor: "Mis postulantes",
  evidencias: "Revisión de evidencias",
  portal: "Mi inscripción",
  actividades: "Actividades y evidencias",
}

export function inferRoleFromPath(pathname: string): Role {
  if (pathname.startsWith("/tutor")) return "tutor"
  if (pathname.startsWith("/portal")) return "postulante"
  if (pathname.startsWith("/usuarios") || pathname.startsWith("/configuracion")) return "admin"
  return "coordinador"
}
