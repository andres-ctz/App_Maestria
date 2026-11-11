import { differenceInCalendarDays, format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { TODAY } from "@/lib/mock-data"

export function formatDate(value: string, pattern = "d MMM yyyy") {
  return format(parseISO(value), pattern, { locale: es })
}

export function formatDateTime(value: string) {
  return format(parseISO(value), "d MMM yyyy · HH:mm", { locale: es })
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
