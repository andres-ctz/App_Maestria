export type Role = "admin" | "coordinador" | "tutor" | "postulante"

export type RiskLevel = "bajo" | "medio" | "alto"

export type EstadoInscripcion = "pendiente" | "aprobada" | "observada" | "rechazada"

export type EstadoEntrega = "al-dia" | "atrasado" | "sin-entregas"

export type EstadoEvidencia = "pendiente" | "en-correccion" | "aprobado" | "rechazado"

export type TipoContacto = "llamada" | "correo" | "reunion" | "whatsapp"

export type ResultadoContacto = "contactado" | "no-contesta" | "reprogramado"

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: Role
  estado: "activo" | "inactivo"
  ultimoAcceso: string
  iniciales: string
}

export interface Programa {
  id: string
  nombre: string
  facultad: string
  modalidad: "Presencial" | "Virtual" | "Híbrida"
  vacantes: number
  estado: "activo" | "borrador" | "cerrado"
}

export interface Convocatoria {
  id: string
  programaId: string
  nombre: string
  inicio: string
  fin: string
  inscritos: number
  estado: "abierta" | "en-curso" | "cerrada"
}

export interface Curso {
  id: string
  convocatoriaId: string
  nombre: string
  docente: string
  creditos: number
  actividades: number
}

export interface Postulante {
  id: string
  nombre: string
  email: string
  telefono: string
  documento: string
  iniciales: string
  programaId: string
  convocatoriaId: string
  tutorId: string | null
  avance: number
  actividadesCompletadas: number
  actividadesTotales: number
  riesgo: RiskLevel
  motivosRiesgo: string[]
  estadoInscripcion: EstadoInscripcion
  estadoEntrega: EstadoEntrega
  ultimaActividad: string
  formacion: {
    grado: string
    universidad: string
    egreso: number
    promedio: number
  }
}

export interface Compromiso {
  descripcion: string
  fechaLimite: string
  cumplido: boolean
}

export interface Seguimiento {
  id: string
  postulanteId: string
  tutorId: string
  fecha: string
  tipo: TipoContacto
  resultado: ResultadoContacto
  observaciones: string
  compromiso?: Compromiso
  proximaAccion?: string
}

export interface VersionEvidencia {
  version: number
  fecha: string
  archivo: string
  tamano: string
  estado: EstadoEvidencia
  feedback?: string
  revisor?: string
}

export interface Evidencia {
  id: string
  postulanteId: string
  actividadId: string
  titulo: string
  curso: string
  estado: EstadoEvidencia
  versiones: VersionEvidencia[]
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
  diasRestantes: 15 | 10 | 5 | 3 | 1
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

export interface PasoInscripcion {
  id: string
  titulo: string
  descripcion: string
  completado: boolean
  fecha?: string
}

export interface ReglaRiesgo {
  id: string
  regla: string
  nivel: RiskLevel
  afectados: number
}
