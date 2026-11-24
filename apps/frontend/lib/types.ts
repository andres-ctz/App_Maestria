/**
 * Tipos del dominio del frontend.
 *
 * Referencia funcional: Documento Maestro de Requisitos v0.3. Estos tipos son una
 * guía para la interfaz, no el esquema final de la base de datos. Los nombres de
 * dominio están en español, igual que en el boceto original; la correspondencia con
 * los nombres de la API se resolverá en la capa de acceso a datos.
 */

/** "postulante" es el rol Postulante/Estudiante: una misma cuenta pasa de uno a otro (v0.3 §2.1). */
export type Role = "admin" | "coordinador" | "tutor" | "postulante"

export type RiskLevel = "bajo" | "medio" | "alto"

/**
 * Estados de la postulación: exactamente los ocho del v0.3 §6.3, confirmados por el equipo
 * (decisión D-016). No existen los estados «En nivelación» ni «Retirada».
 */
export const ESTADOS_POSTULACION = [
  "borrador",
  "recibida",
  "en-revision",
  "pendiente-correccion",
  "validada",
  "admitida",
  "no-admitida",
  "en-lista-de-espera",
] as const

export type EstadoPostulacion = (typeof ESTADOS_POSTULACION)[number]

/**
 * Estados de la convocatoria: los ocho del v0.3 §5.2. Las reglas de visibilidad y de
 * transición entre estados (suspensión, cancelación) siguen pendientes de decisión.
 */
export const ESTADOS_CONVOCATORIA = [
  "borrador",
  "programada",
  "abierta",
  "preparacion",
  "en-curso",
  "cerrada",
  "suspendida",
  "cancelada",
] as const

export type EstadoConvocatoria = (typeof ESTADOS_CONVOCATORIA)[number]

/**
 * Estados del programa: solo activo e inactivo (v0.3 §4.2, decisión D-024). Solo el
 * administrador crea, activa y desactiva programas; no se eliminan si tienen historial.
 */
export const ESTADOS_PROGRAMA = ["activo", "inactivo"] as const

export type EstadoPrograma = (typeof ESTADOS_PROGRAMA)[number]

/** Resultado de revisar un documento de postulación o una entrega de actividad. */
export type EstadoRevision = "pendiente" | "en-correccion" | "aprobado" | "rechazado"

/** Cumplimiento de entregas de un estudiante (no es el estado de revisión de una entrega). */
export type EstadoCumplimiento = "al-dia" | "atrasado" | "sin-entregas"

export type TipoContacto = "llamada" | "correo" | "reunion" | "whatsapp"

export type ResultadoContacto = "contactado" | "no-contesta" | "reprogramado"

export type TipoIdentificacion = "cedula" | "pasaporte"

export interface Identificacion {
  tipo: TipoIdentificacion
  numero: string
}

/**
 * Cuenta de usuario. Una cuenta puede tener varios roles (v0.3 §2.2).
 * `protegida` marca las cuentas administrativas protegidas (v0.3 §2.9): no se pueden
 * eliminar, desactivar ni cambiarles el correo. La regla definitiva se aplica en el backend.
 */
export interface Usuario {
  id: string
  nombre: string
  email: string
  roles: Role[]
  estado: "activo" | "inactivo"
  ultimoAcceso: string
  iniciales: string
  protegida?: boolean
  /** Solo para el rol Postulante/Estudiante: define qué secciones ve. */
  situacion?: {
    tienePostulaciones: boolean
    tieneMatricula: boolean
  }
}

export interface Programa {
  id: string
  nombre: string
  facultad: string
  modalidad: "Presencial" | "Virtual" | "Híbrida"
  estado: EstadoPrograma
}

export interface Convocatoria {
  id: string
  programaId: string
  nombre: string
  inicio: string
  fin: string
  /** Cupos de la convocatoria (v0.3 §5.1). Los cupos no pertenecen al programa. */
  cupos: number
  /**
   * Solo para la demostración. Con el backend, los cupos ocupados y disponibles se calculan
   * a partir de las asignaciones (D-031); no se guardan.
   */
  inscritos: number
  estado: EstadoConvocatoria
}

export interface Curso {
  id: string
  convocatoriaId: string
  nombre: string
  docente: string
  creditos: number
  actividades: number
}

export interface DocumentoPostulacion {
  requisito: string
  obligatorio: boolean
  estado: EstadoRevision | "sin-cargar"
}

/** Flujo de admisión: la persona aún no está matriculada. */
export interface Postulacion {
  id: string
  nombre: string
  email: string
  telefono: string
  identificacion: Identificacion
  iniciales: string
  programaId: string
  convocatoriaId: string
  estado: EstadoPostulacion
  fechaEnvio?: string
  documentos: DocumentoPostulacion[]
  observaciones: string[]
}

/** Seguimiento académico: la persona ya está matriculada en un curso. */
export interface Estudiante {
  id: string
  nombre: string
  email: string
  telefono: string
  identificacion: Identificacion
  iniciales: string
  programaId: string
  convocatoriaId: string
  tutorId: string | null
  avance: number
  actividadesCompletadas: number
  actividadesTotales: number
  riesgo: RiskLevel
  motivosRiesgo: string[]
  estadoEntrega: EstadoCumplimiento
  ultimaActividad: string
  formacion: {
    grado: string
    institucion: string
    egreso: number
  }
}

export interface Compromiso {
  descripcion: string
  fechaLimite: string
  cumplido: boolean
}

export interface Seguimiento {
  id: string
  estudianteId: string
  tutorId: string
  fecha: string
  tipo: TipoContacto
  resultado: ResultadoContacto
  observaciones: string
  compromiso?: Compromiso
  proximaAccion?: string
}

export interface VersionEntrega {
  version: number
  fecha: string
  archivo: string
  tamano: string
  estado: EstadoRevision
  feedback?: string
  revisor?: string
}

/** Entrega de una actividad académica, con sus versiones (intentos). */
export interface Entrega {
  id: string
  estudianteId: string
  actividadId: string
  titulo: string
  curso: string
  estado: EstadoRevision
  versiones: VersionEntrega[]
}

export interface Actividad {
  id: string
  cursoId: string
  curso: string
  titulo: string
  descripcion: string
  ponderacion: number
  fechaLimite: string
  estado: "pendiente" | "entregado" | "aprobado" | "en-correccion"
  progreso: number
}

export interface Alerta {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  diasRestantes: number
  destinatarios: number
}

export interface EventoAuditoria {
  id: string
  fecha: string
  actor: string
  rol: Role
  accion: string
  entidad: string
  entidadId: string
  estado: "exito" | "advertencia" | "error"
  ip: string
}

/** Regla de riesgo de EJEMPLO: los criterios definitivos siguen pendientes (v0.3 §23). */
export interface ReglaRiesgo {
  id: string
  regla: string
  nivel: RiskLevel
  afectados: number
}
