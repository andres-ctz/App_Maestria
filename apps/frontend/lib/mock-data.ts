import type {
  Actividad,
  Alerta,
  Convocatoria,
  Curso,
  Entrega,
  EventoAuditoria,
  Estudiante,
  Postulacion,
  Programa,
  ReglaRiesgo,
  Seguimiento,
  Usuario,
} from "@/lib/types"

/**
 * Datos de DEMOSTRACIÓN. Todas las personas, instituciones, correos, teléfonos y
 * cédulas son ficticios. Las cédulas usan el prefijo 99, que no corresponde a ninguna
 * provincia, y los correos usan el dominio reservado .example.
 */

/** Fecha fija de la demostración (para que los vencimientos no cambien con el reloj). */
export const TODAY = "2026-10-27"

export const usuarios: Usuario[] = [
  { id: "u-admin", nombre: "Ricardo Salazar", email: "rsalazar@posgrado.example", roles: ["admin"], estado: "activo", ultimoAcceso: "2026-10-27T08:12:00", iniciales: "RS", protegida: true },
  { id: "u-admin-2", nombre: "Verónica Andrade", email: "vandrade@posgrado.example", roles: ["admin"], estado: "activo", ultimoAcceso: "2026-10-26T17:40:00", iniciales: "VA", protegida: true },
  { id: "u-coord", nombre: "Dra. Marisol Herrera", email: "mherrera@posgrado.example", roles: ["coordinador"], estado: "activo", ultimoAcceso: "2026-10-27T09:40:00", iniciales: "MH" },
  { id: "u-coord-2", nombre: "Mg. Fernando Rojas", email: "frojas@posgrado.example", roles: ["coordinador"], estado: "activo", ultimoAcceso: "2026-10-24T13:30:00", iniciales: "FR" },
  { id: "t-1", nombre: "Mg. Jorge Paredes", email: "jparedes@posgrado.example", roles: ["tutor", "coordinador"], estado: "activo", ultimoAcceso: "2026-10-27T10:05:00", iniciales: "JP" },
  { id: "t-2", nombre: "Mg. Lucía Quishpe", email: "lquishpe@posgrado.example", roles: ["tutor"], estado: "activo", ultimoAcceso: "2026-10-26T18:22:00", iniciales: "LQ" },
  { id: "t-3", nombre: "Dr. Andrés Villacís", email: "avillacis@posgrado.example", roles: ["tutor"], estado: "activo", ultimoAcceso: "2026-10-25T16:48:00", iniciales: "AV" },
  { id: "t-4", nombre: "Mg. Carla Benítez", email: "cbenitez@posgrado.example", roles: ["tutor"], estado: "inactivo", ultimoAcceso: "2026-09-30T11:10:00", iniciales: "CB" },
  { id: "p-1", nombre: "Valeria Gutiérrez Ramos", email: "valeria.gutierrez@correo.example", roles: ["postulante"], estado: "activo", ultimoAcceso: "2026-10-27T07:55:00", iniciales: "VG", situacion: { tienePostulaciones: true, tieneMatricula: true } },
  { id: "po-2", nombre: "Isabella Chávez Rojas", email: "isabella.chavez@correo.example", roles: ["postulante"], estado: "activo", ultimoAcceso: "2026-10-26T20:10:00", iniciales: "IC", situacion: { tienePostulaciones: true, tieneMatricula: false } },
]

export const tutores = usuarios.filter((u) => u.roles.includes("tutor") && u.estado === "activo")

export const programas: Programa[] = [
  { id: "pr-1", nombre: "Maestría en Gestión Pública", facultad: "Ciencias Sociales", modalidad: "Híbrida", vacantes: 40, estado: "activo" },
  { id: "pr-2", nombre: "Maestría en Educación Superior", facultad: "Educación", modalidad: "Virtual", vacantes: 60, estado: "activo" },
  { id: "pr-3", nombre: "Maestría en Ingeniería de Software", facultad: "Ingeniería", modalidad: "Presencial", vacantes: 30, estado: "activo" },
  { id: "pr-4", nombre: "Maestría en Salud Pública", facultad: "Ciencias de la Salud", modalidad: "Híbrida", vacantes: 35, estado: "borrador" },
]

export const convocatorias: Convocatoria[] = [
  { id: "cv-1", programaId: "pr-1", nombre: "GP 2026-II", inicio: "2026-09-01", fin: "2026-12-15", inscritos: 38, estado: "en-curso" },
  { id: "cv-2", programaId: "pr-2", nombre: "ES 2026-II", inicio: "2026-09-15", fin: "2026-12-20", inscritos: 52, estado: "en-curso" },
  { id: "cv-3", programaId: "pr-3", nombre: "IS 2026-II", inicio: "2026-10-01", fin: "2027-01-30", inscritos: 27, estado: "en-curso" },
  { id: "cv-4", programaId: "pr-4", nombre: "SP 2027-I", inicio: "2027-01-10", fin: "2027-04-15", inscritos: 0, estado: "abierta" },
  { id: "cv-5", programaId: "pr-1", nombre: "GP 2026-I", inicio: "2026-03-01", fin: "2026-06-30", inscritos: 41, estado: "cerrada" },
]

export const cursos: Curso[] = [
  { id: "c-1", convocatoriaId: "cv-1", nombre: "Redacción Académica", docente: "Dra. Elena Campos", creditos: 2, actividades: 4 },
  { id: "c-2", convocatoriaId: "cv-1", nombre: "Metodología de la Investigación", docente: "Dr. Raúl Medina", creditos: 3, actividades: 5 },
  { id: "c-3", convocatoriaId: "cv-2", nombre: "Estadística Aplicada", docente: "Mg. Sofía Lara", creditos: 3, actividades: 4 },
  { id: "c-4", convocatoriaId: "cv-3", nombre: "Fundamentos de Arquitectura de Software", docente: "Dr. Iván Torres", creditos: 2, actividades: 3 },
  { id: "c-5", convocatoriaId: "cv-2", nombre: "Pensamiento Crítico", docente: "Dra. Elena Campos", creditos: 2, actividades: 3 },
]

export const estudiantes: Estudiante[] = [
  {
    id: "p-1", nombre: "Valeria Gutiérrez Ramos", email: "valeria.gutierrez@correo.example", telefono: "+593 91 101 1007", identificacion: { tipo: "cedula", numero: "9900000001" }, iniciales: "VG",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 68, actividadesCompletadas: 6, actividadesTotales: 9,
    riesgo: "bajo", motivosRiesgo: [], estadoEntrega: "al-dia", ultimaActividad: "2026-10-27",
    formacion: { grado: "Lic. en Ciencia Política", institucion: "Universidad Andina del Norte", egreso: 2021 },
  },
  {
    id: "p-2", nombre: "Diego Fernández Castro", email: "diego.fernandez@correo.example", telefono: "+593 92 102 1014", identificacion: { tipo: "cedula", numero: "9900000002" }, iniciales: "DF",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 22, actividadesCompletadas: 2, actividadesTotales: 9,
    riesgo: "alto", motivosRiesgo: ["Sin actividad en 7 días", "Entrega rechazada", "Compromiso vencido"], estadoEntrega: "atrasado", ultimaActividad: "2026-10-16",
    formacion: { grado: "Bach. en Economía", institucion: "Universidad Costa Azul", egreso: 2019 },
  },
  {
    id: "p-3", nombre: "Camila Torres Mendoza", email: "camila.torres@correo.example", telefono: "+593 93 103 1021", identificacion: { tipo: "cedula", numero: "9900000003" }, iniciales: "CT",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-2", avance: 45, actividadesCompletadas: 3, actividadesTotales: 7,
    riesgo: "medio", motivosRiesgo: ["Entrega fuera de plazo", "Entrega en corrección"], estadoEntrega: "atrasado", ultimaActividad: "2026-10-23",
    formacion: { grado: "Lic. en Educación Primaria", institucion: "Instituto Superior del Valle Central", egreso: 2018 },
  },
  {
    id: "p-4", nombre: "Mateo Ríos Andrade", email: "mateo.rios@correo.example", telefono: "+593 94 104 1028", identificacion: { tipo: "cedula", numero: "9900000004" }, iniciales: "MR",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: "t-3", avance: 81, actividadesCompletadas: 3, actividadesTotales: 3,
    riesgo: "bajo", motivosRiesgo: [], estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Ing. de Sistemas", institucion: "Universidad Politécnica del Pacífico", egreso: 2022 },
  },
  {
    id: "p-6", nombre: "Sebastián Morales Díaz", email: "sebastian.morales@correo.example", telefono: "+593 95 105 1035", identificacion: { tipo: "cedula", numero: "9900000005" }, iniciales: "SM",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 54, actividadesCompletadas: 5, actividadesTotales: 9,
    riesgo: "medio", motivosRiesgo: ["Avance por debajo del promedio de la cohorte"], estadoEntrega: "al-dia", ultimaActividad: "2026-10-22",
    formacion: { grado: "Lic. en Administración", institucion: "Universidad Metropolitana del Valle", egreso: 2020 },
  },
  {
    id: "p-8", nombre: "Joaquín Herrera Luna", email: "joaquin.herrera@correo.example", telefono: "+593 96 106 1042", identificacion: { tipo: "cedula", numero: "9900000006" }, iniciales: "JH",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-3", avance: 92, actividadesCompletadas: 7, actividadesTotales: 7,
    riesgo: "bajo", motivosRiesgo: [], estadoEntrega: "al-dia", ultimaActividad: "2026-10-27",
    formacion: { grado: "Lic. en Educación Secundaria", institucion: "Universidad Técnica del Litoral", egreso: 2016 },
  },
  {
    id: "p-9", nombre: "Renata Vargas Soto", email: "renata.vargas@correo.example", telefono: "+593 97 107 1049", identificacion: { tipo: "cedula", numero: "9900000007" }, iniciales: "RV",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 33, actividadesCompletadas: 3, actividadesTotales: 9,
    riesgo: "alto", motivosRiesgo: ["Entrega rechazada (2 veces)", "Entrega fuera de plazo"], estadoEntrega: "atrasado", ultimaActividad: "2026-10-20",
    formacion: { grado: "Lic. en Derecho", institucion: "Universidad Costa Azul", egreso: 2019 },
  },
  {
    id: "p-10", nombre: "Tomás Aguilar Pinto", email: "tomas.aguilar@correo.example", telefono: "+593 98 108 1056", identificacion: { tipo: "cedula", numero: "9900000008" }, iniciales: "TA",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: "t-3", avance: 61, actividadesCompletadas: 2, actividadesTotales: 3,
    riesgo: "bajo", motivosRiesgo: [], estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Ing. Electrónica", institucion: "Universidad Politécnica del Pacífico", egreso: 2020 },
  },
  {
    id: "p-12", nombre: "Gabriel Núñez Ortiz", email: "gabriel.nunez@correo.example", telefono: "+593 99 109 1063", identificacion: { tipo: "cedula", numero: "9900000009" }, iniciales: "GN",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-2", avance: 74, actividadesCompletadas: 7, actividadesTotales: 9,
    riesgo: "bajo", motivosRiesgo: [], estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Lic. en Sociología", institucion: "Universidad Andina del Norte", egreso: 2018 },
  },
  {
    id: "p-13", nombre: "Mariana Delgado Silva", email: "mariana.delgado@correo.example", telefono: "+593 90 110 1070", identificacion: { tipo: "cedula", numero: "9900000010" }, iniciales: "MD",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-2", avance: 40, actividadesCompletadas: 3, actividadesTotales: 7,
    riesgo: "medio", motivosRiesgo: ["Compromiso próximo a vencer"], estadoEntrega: "al-dia", ultimaActividad: "2026-10-24",
    formacion: { grado: "Lic. en Educación Inicial", institucion: "Universidad Central del Litoral", egreso: 2015 },
  },
]

export const postulaciones: Postulacion[] = [
  {
    id: "po-1", nombre: "Andrea Salinas Cruz", email: "andrea.salinas@correo.example", telefono: "+593 91 201 1707", identificacion: { tipo: "cedula", numero: "9900000101" }, iniciales: "AS",
    programaId: "pr-3", convocatoriaId: "cv-3", estado: "en-revision", fechaEnvio: "2026-10-25",
    documentos: [{ requisito: "Cédula o pasaporte", obligatorio: true, estado: "aprobado" }, { requisito: "Título de grado", obligatorio: true, estado: "pendiente" }, { requisito: "Hoja de vida", obligatorio: false, estado: "sin-cargar" }],
    observaciones: [],
  },
  {
    id: "po-2", nombre: "Isabella Chávez Rojas", email: "isabella.chavez@correo.example", telefono: "+593 92 202 1714", identificacion: { tipo: "cedula", numero: "9900000102" }, iniciales: "IC",
    programaId: "pr-2", convocatoriaId: "cv-2", estado: "recibida", fechaEnvio: "2026-10-26",
    documentos: [{ requisito: "Cédula o pasaporte", obligatorio: true, estado: "pendiente" }, { requisito: "Título de grado", obligatorio: true, estado: "pendiente" }, { requisito: "Hoja de vida", obligatorio: false, estado: "sin-cargar" }],
    observaciones: [],
  },
  {
    id: "po-3", nombre: "Nicolás Ramírez Vega", email: "nicolas.ramirez@correo.example", telefono: "+593 93 203 1721", identificacion: { tipo: "cedula", numero: "9900000103" }, iniciales: "NR",
    programaId: "pr-3", convocatoriaId: "cv-3", estado: "pendiente-correccion", fechaEnvio: "2026-10-21",
    documentos: [{ requisito: "Cédula o pasaporte", obligatorio: true, estado: "en-correccion" }, { requisito: "Título de grado", obligatorio: true, estado: "aprobado" }, { requisito: "Hoja de vida", obligatorio: false, estado: "aprobado" }],
    observaciones: ["Documento de identidad ilegible"],
  },
  {
    id: "po-4", nombre: "Lucía Paredes Huamán", email: "lucia.paredes@correo.example", telefono: "+593 94 204 1728", identificacion: { tipo: "cedula", numero: "9900000104" }, iniciales: "LP",
    programaId: "pr-2", convocatoriaId: "cv-2", estado: "en-lista-de-espera", fechaEnvio: "2026-10-14",
    documentos: [{ requisito: "Cédula o pasaporte", obligatorio: true, estado: "aprobado" }, { requisito: "Título de grado", obligatorio: true, estado: "aprobado" }, { requisito: "Hoja de vida", obligatorio: false, estado: "aprobado" }],
    observaciones: [],
  },
]

export const seguimientos: Seguimiento[] = [
  {
    id: "s-1", estudianteId: "p-2", tutorId: "t-1", fecha: "2026-10-24T10:30:00", tipo: "llamada", resultado: "no-contesta",
    observaciones: "Se realizaron dos intentos de llamada sin respuesta. Se dejó mensaje de voz.",
    proximaAccion: "Enviar correo formal con copia a coordinación",
  },
  {
    id: "s-2", estudianteId: "p-2", tutorId: "t-1", fecha: "2026-10-18T16:00:00", tipo: "reunion", resultado: "contactado",
    observaciones: "El estudiante indica sobrecarga laboral. Se acuerda plan de recuperación para el ensayo de Redacción Académica.",
    compromiso: { descripcion: "Entregar versión corregida del ensayo argumentativo", fechaLimite: "2026-10-23", cumplido: false },
    proximaAccion: "Verificar entrega el 23/10",
  },
  {
    id: "s-3", estudianteId: "p-2", tutorId: "t-1", fecha: "2026-10-09T09:15:00", tipo: "correo", resultado: "contactado",
    observaciones: "Bienvenida al curso preparatorio y envío de cronograma de actividades.",
  },
  {
    id: "s-4", estudianteId: "p-1", tutorId: "t-1", fecha: "2026-10-25T11:00:00", tipo: "reunion", resultado: "contactado",
    observaciones: "Revisión del avance del anteproyecto. Buena disposición y entregas a tiempo.",
    compromiso: { descripcion: "Subir matriz de consistencia v2", fechaLimite: "2026-11-01", cumplido: false },
    proximaAccion: "Revisar matriz de consistencia",
  },
  {
    id: "s-5", estudianteId: "p-1", tutorId: "t-1", fecha: "2026-10-12T15:30:00", tipo: "whatsapp", resultado: "contactado",
    observaciones: "Consulta sobre formato APA 7. Se compartió guía institucional.",
    compromiso: { descripcion: "Aplicar normas APA 7 en ensayo", fechaLimite: "2026-10-16", cumplido: true },
  },
  {
    id: "s-6", estudianteId: "p-9", tutorId: "t-1", fecha: "2026-10-22T17:45:00", tipo: "llamada", resultado: "reprogramado",
    observaciones: "Solicita reprogramar la reunión por motivos de salud.",
    proximaAccion: "Reunión virtual el 28/10 a las 19:00",
  },
  {
    id: "s-7", estudianteId: "p-6", tutorId: "t-1", fecha: "2026-10-20T10:00:00", tipo: "correo", resultado: "contactado",
    observaciones: "Se envió retroalimentación detallada de la reseña crítica.",
    compromiso: { descripcion: "Completar foro de Metodología", fechaLimite: "2026-10-30", cumplido: false },
  },
]

export const entregas: Entrega[] = [
  {
    id: "e-1", estudianteId: "p-2", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "rechazado",
    versiones: [
      { version: 2, fecha: "2026-10-15T22:10:00", archivo: "ensayo_dfernandez_v2.pdf", tamano: "1.2 MB", estado: "rechazado", feedback: "Persisten problemas de coherencia argumentativa y el texto no cumple con la extensión mínima (1500 palabras).", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-08T19:40:00", archivo: "ensayo_dfernandez_v1.pdf", tamano: "980 KB", estado: "en-correccion", feedback: "Falta tesis explícita en la introducción. Revisar citas en formato APA 7.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-2", estudianteId: "p-1", actividadId: "a-2", titulo: "Matriz de consistencia", curso: "Metodología de la Investigación", estado: "pendiente",
    versiones: [
      { version: 1, fecha: "2026-10-26T20:15:00", archivo: "matriz_vgutierrez_v1.xlsx", tamano: "340 KB", estado: "pendiente" },
    ],
  },
  {
    id: "e-3", estudianteId: "p-9", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "en-correccion",
    versiones: [
      { version: 3, fecha: "2026-10-25T09:00:00", archivo: "ensayo_rvargas_v3.pdf", tamano: "1.4 MB", estado: "pendiente" },
      { version: 2, fecha: "2026-10-18T23:50:00", archivo: "ensayo_rvargas_v2.pdf", tamano: "1.3 MB", estado: "rechazado", feedback: "Se detectó similitud del 38%. Reformular secciones 2 y 3.", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-10T18:20:00", archivo: "ensayo_rvargas_v1.pdf", tamano: "1.1 MB", estado: "rechazado", feedback: "No cumple con la estructura solicitada.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-4", estudianteId: "p-6", actividadId: "a-3", titulo: "Reseña crítica de artículo", curso: "Metodología de la Investigación", estado: "aprobado",
    versiones: [
      { version: 1, fecha: "2026-10-19T14:30:00", archivo: "resena_smorales_v1.docx", tamano: "210 KB", estado: "aprobado", feedback: "Excelente análisis. Bien fundamentado.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-5", estudianteId: "p-6", actividadId: "a-2", titulo: "Matriz de consistencia", curso: "Metodología de la Investigación", estado: "pendiente",
    versiones: [
      { version: 1, fecha: "2026-10-26T11:45:00", archivo: "matriz_smorales_v1.pdf", tamano: "512 KB", estado: "pendiente" },
    ],
  },
  {
    id: "e-6", estudianteId: "p-1", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "aprobado",
    versiones: [
      { version: 2, fecha: "2026-10-14T10:20:00", archivo: "ensayo_vgutierrez_v2.pdf", tamano: "1.1 MB", estado: "aprobado", feedback: "Correcciones aplicadas correctamente. Aprobado.", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-07T21:00:00", archivo: "ensayo_vgutierrez_v1.pdf", tamano: "1.0 MB", estado: "en-correccion", feedback: "Ajustar referencias al formato APA 7 y ampliar la conclusión.", revisor: "Mg. Jorge Paredes" },
    ],
  },
]

export const actividadesEstudiante: Actividad[] = [
  { id: "a-1", cursoId: "c-1", curso: "Redacción Académica", titulo: "Ensayo argumentativo", descripcion: "Ensayo de 1500–2000 palabras sobre una política pública reciente.", ponderacion: 30, fechaLimite: "2026-10-15", estado: "aprobado", progreso: 100 },
  { id: "a-2", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Matriz de consistencia", descripcion: "Matriz con problema, objetivos, hipótesis y variables del anteproyecto.", ponderacion: 25, fechaLimite: "2026-11-01", estado: "entregado", progreso: 80 },
  { id: "a-3", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Reseña crítica de artículo", descripcion: "Análisis crítico de un artículo indexado en Scopus (Q1–Q2).", ponderacion: 15, fechaLimite: "2026-10-30", estado: "en-correccion", progreso: 60 },
  { id: "a-4", cursoId: "c-1", curso: "Redacción Académica", titulo: "Resumen y abstract", descripcion: "Resumen de 250 palabras en español e inglés del anteproyecto.", ponderacion: 10, fechaLimite: "2026-11-06", estado: "pendiente", progreso: 20 },
  { id: "a-5", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Anteproyecto de investigación", descripcion: "Documento final integrando todas las secciones trabajadas en el curso.", ponderacion: 20, fechaLimite: "2026-11-11", estado: "pendiente", progreso: 0 },
]


export const alertas: Alerta[] = [
  { id: "al-1", titulo: "Cierre de Matriz de consistencia", descripcion: "Metodología de la Investigación · GP 2026-II", fecha: "2026-10-28", diasRestantes: 1, destinatarios: 14 },
  { id: "al-2", titulo: "Reseña crítica de artículo", descripcion: "Metodología de la Investigación · GP 2026-II", fecha: "2026-10-30", diasRestantes: 3, destinatarios: 21 },
  { id: "al-3", titulo: "Informe de estadística descriptiva", descripcion: "Estadística Aplicada · ES 2026-II", fecha: "2026-11-01", diasRestantes: 5, destinatarios: 33 },
  { id: "al-4", titulo: "Resumen y abstract", descripcion: "Redacción Académica · GP 2026-II", fecha: "2026-11-06", diasRestantes: 10, destinatarios: 38 },
  { id: "al-5", titulo: "Prototipo de arquitectura", descripcion: "Fundamentos de Arquitectura · IS 2026-II", fecha: "2026-11-11", diasRestantes: 15, destinatarios: 27 },
]

export const reglasRiesgoEjemplo: ReglaRiesgo[] = [
  { id: "r-1", regla: "Sin actividad en 7 días o más", nivel: "alto", afectados: 9 },
  { id: "r-2", regla: "Entrega rechazada", nivel: "alto", afectados: 6 },
  { id: "r-3", regla: "Compromiso tutorial vencido", nivel: "alto", afectados: 4 },
  { id: "r-4", regla: "Entrega fuera de plazo", nivel: "medio", afectados: 11 },
  { id: "r-5", regla: "Avance bajo el promedio de cohorte", nivel: "medio", afectados: 8 },
  { id: "r-6", regla: "Sin tutor asignado", nivel: "medio", afectados: 5 },
]

export const tendenciaRetencion = [
  { semana: "Sem 1", retencion: 100, desercion: 0 },
  { semana: "Sem 2", retencion: 98, desercion: 2 },
  { semana: "Sem 3", retencion: 96, desercion: 4 },
  { semana: "Sem 4", retencion: 95, desercion: 5 },
  { semana: "Sem 5", retencion: 92, desercion: 8 },
  { semana: "Sem 6", retencion: 91, desercion: 9 },
  { semana: "Sem 7", retencion: 90, desercion: 10 },
  { semana: "Sem 8", retencion: 89, desercion: 11 },
]

export const auditoria: EventoAuditoria[] = [
  { id: "ev-1", fecha: "2026-10-27T10:42:13", actor: "Mg. Jorge Paredes", rol: "tutor", accion: "Aprobó entrega v2", entidad: "Entrega", entidadId: "E-0006", estado: "exito", ip: "10.20.4.118" },
  { id: "ev-2", fecha: "2026-10-27T10:15:02", actor: "Dra. Marisol Herrera", rol: "coordinador", accion: "Modificó tutor asignado", entidad: "Estudiante", entidadId: "P-0013", estado: "exito", ip: "10.20.1.32" },
  { id: "ev-3", fecha: "2026-10-27T09:58:44", actor: "Valeria Gutiérrez Ramos", rol: "postulante", accion: "Subió entrega v1", entidad: "Entrega", entidadId: "E-0002", estado: "exito", ip: "203.0.113.4" },
  { id: "ev-4", fecha: "2026-10-27T09:31:20", actor: "Sistema", rol: "admin", accion: "Recalculó niveles de riesgo", entidad: "Motor de riesgo", entidadId: "JOB-221", estado: "advertencia", ip: "127.0.0.1" },
  { id: "ev-5", fecha: "2026-10-27T08:12:09", actor: "Ricardo Salazar", rol: "admin", accion: "Asignó rol Tutor", entidad: "Usuario", entidadId: "U-0045", estado: "exito", ip: "10.20.1.10" },
  { id: "ev-6", fecha: "2026-10-26T19:04:51", actor: "Diego Fernández Castro", rol: "postulante", accion: "Intento de carga fallido (formato no permitido)", entidad: "Entrega", entidadId: "E-0001", estado: "error", ip: "198.51.100.9" },
  { id: "ev-7", fecha: "2026-10-26T17:20:33", actor: "Mg. Jorge Paredes", rol: "tutor", accion: "Rechazó entrega v2", entidad: "Entrega", entidadId: "E-0001", estado: "exito", ip: "10.20.4.118" },
  { id: "ev-8", fecha: "2026-10-26T15:48:00", actor: "Dra. Marisol Herrera", rol: "coordinador", accion: "Registró decisión de admisión", entidad: "Postulación", entidadId: "PO-0128", estado: "exito", ip: "10.20.1.32" },
  { id: "ev-9", fecha: "2026-10-26T12:30:17", actor: "Mg. Lucía Quishpe", rol: "tutor", accion: "Registró contacto (llamada)", entidad: "Seguimiento", entidadId: "S-0342", estado: "exito", ip: "10.20.4.77" },
  { id: "ev-10", fecha: "2026-10-26T09:02:45", actor: "Dra. Marisol Herrera", rol: "coordinador", accion: "Creó convocatoria SP 2027-I", entidad: "Convocatoria", entidadId: "CV-0004", estado: "exito", ip: "10.20.1.32" },
  { id: "ev-11", fecha: "2026-10-25T22:14:10", actor: "Sistema", rol: "admin", accion: "Envió recordatorio (3 días)", entidad: "Notificación", entidadId: "N-1882", estado: "exito", ip: "127.0.0.1" },
  { id: "ev-12", fecha: "2026-10-25T16:40:29", actor: "Ricardo Salazar", rol: "admin", accion: "Desactivó usuario", entidad: "Usuario", entidadId: "U-0031", estado: "advertencia", ip: "10.20.1.10" },
]

export function getPrograma(id: string) {
  return programas.find((p) => p.id === id)
}

export function getConvocatoria(id: string) {
  return convocatorias.find((c) => c.id === id)
}

export function getTutor(id: string | null) {
  if (!id) return undefined
  return usuarios.find((u) => u.id === id)
}

export function getEstudiante(id: string) {
  return estudiantes.find((e) => e.id === id)
}
