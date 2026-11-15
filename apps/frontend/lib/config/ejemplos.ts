/**
 * Valores de EJEMPLO.
 *
 * No son reglas aprobadas: el Documento Maestro v0.3 deja pendientes el tamaño máximo
 * de archivos, los tipos permitidos y los criterios de riesgo (§23). Se usan solo para
 * que la interfaz de demostración tenga datos. Mientras sigan pendientes, la interfaz
 * los muestra marcados como ejemplo.
 */
export const LIMITES_ARCHIVO_EJEMPLO = {
  maxMB: 20,
  extensiones: [".pdf", ".docx", ".xlsx", ".pptx", ".zip"],
} as const

export const AVISO_EJEMPLO = "Ejemplo · pendiente de definición institucional"
