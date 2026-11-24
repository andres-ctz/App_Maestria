/**
 * Escala institucional de calificaciones.
 *
 * Confirmada por el equipo el 15/11/2026 (decisiones D-014 y D-015).
 *
 * La escala institucional es independiente de la distribución interna de ponderaciones
 * (v0.3 §12.2): esta reparte cien puntos entre las actividades y evaluaciones de un plan.
 * Sigue pendiente confirmar si la nota mínima puede variar por programa o asignatura.
 */
export const ESCALA_CALIFICACION = { minimo: 0, maximo: 100 } as const

/** Nota mínima de aprobación, en puntos de la escala institucional. */
export const NOTA_MINIMA_APROBACION = 70

export const TEXTO_ESCALA = `Escala institucional de ${ESCALA_CALIFICACION.minimo} a ${ESCALA_CALIFICACION.maximo} y nota mínima de aprobación de ${NOTA_MINIMA_APROBACION} puntos`
