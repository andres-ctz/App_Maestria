/**
 * Configuración institucional por defecto.
 *
 * Es el único punto donde viven los textos de marca. En el futuro estos valores
 * vendrán de la configuración que gestiona el administrador (v0.3 §3).
 */
export const institucion = {
  nombre: "Precursus",
  unidad: "Escuela de Posgrado",
  titulo: "Gestión de Cursos Preparatorios de Maestría",
  descripcion:
    "Plataforma de gestión de programas, convocatorias, postulaciones, matrículas, cursos y seguimiento académico para cursos preparatorios de programas de maestría.",
} as const

/** Zona horaria del sistema: hora de Ecuador (Quito, GMT-5), decidida por el equipo el 14/11/2026. */
export const ZONA_HORARIA = "America/Guayaquil"

/** Formato de fecha pedido en el v0.3: DD/MM/AAAA. */
export const FORMATO_FECHA = "dd/MM/yyyy"
export const FORMATO_FECHA_HORA = "dd/MM/yyyy HH:mm"
