import { differenceInCalendarDays, format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { FORMATO_FECHA, FORMATO_FECHA_HORA } from "@/lib/config/institucion"
import { TODAY } from "@/lib/mock-data"
import type { Identificacion } from "@/lib/types"

/** Fecha en formato DD/MM/AAAA (v0.3). Se puede pasar otro patrón para casos puntuales (por ejemplo "MMM"). */
export function formatDate(value: string, pattern = FORMATO_FECHA) {
  return format(parseISO(value), pattern, { locale: es })
}

export function formatDateTime(value: string) {
  return format(parseISO(value), FORMATO_FECHA_HORA, { locale: es })
}

export function daysUntil(value: string) {
  return differenceInCalendarDays(parseISO(value), parseISO(TODAY))
}

export function daysSince(value: string) {
  return differenceInCalendarDays(parseISO(TODAY), parseISO(value))
}

export function relativeDays(value: string) {
  const diff = daysUntil(value)
  if (diff === 0) return "Hoy"
  if (diff === 1) return "Mañana"
  if (diff === -1) return "Ayer"
  if (diff > 0) return `En ${diff} días`
  return `Hace ${Math.abs(diff)} días`
}

const etiquetaIdentificacion: Record<Identificacion["tipo"], string> = {
  cedula: "Cédula",
  pasaporte: "Pasaporte",
}

export function formatIdentificacion(id: Identificacion) {
  return `${etiquetaIdentificacion[id.tipo]} ${id.numero}`
}
