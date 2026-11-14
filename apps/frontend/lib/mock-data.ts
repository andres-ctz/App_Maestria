import type {
  Actividad,
  Alerta,
  Convocatoria,
  Curso,
  EventoAuditoria,
  Evidencia,
  PasoInscripcion,
  Postulante,
  Programa,
  ReglaRiesgo,
  Seguimiento,
  Usuario,
} from "@/lib/types"

export const TODAY = "2026-10-27"

export const usuarios: Usuario[] = [
  { id: "u-admin", nombre: "Ricardo Salazar", email: "rsalazar@posgrado.edu", rol: "admin", estado: "activo", ultimoAcceso: "2026-10-27T08:12:00", iniciales: "RS" },
  { id: "u-coord", nombre: "Dra. Marisol Herrera", email: "mherrera@posgrado.edu", rol: "coordinador", estado: "activo", ultimoAcceso: "2026-10-27T09:40:00", iniciales: "MH" },
  { id: "t-1", nombre: "Mg. Jorge Paredes", email: "jparedes@posgrado.edu", rol: "tutor", estado: "activo", ultimoAcceso: "2026-10-27T10:05:00", iniciales: "JP" },
  { id: "t-2", nombre: "Mg. Lucía Quispe", email: "lquispe@posgrado.edu", rol: "tutor", estado: "activo", ultimoAcceso: "2026-10-26T18:22:00", iniciales: "LQ" },
  { id: "t-3", nombre: "Dr. Andrés Villanueva", email: "avillanueva@posgrado.edu", rol: "tutor", estado: "activo", ultimoAcceso: "2026-10-25T16:48:00", iniciales: "AV" },
  { id: "t-4", nombre: "Mg. Carla Benítez", email: "cbenitez@posgrado.edu", rol: "tutor", estado: "inactivo", ultimoAcceso: "2026-09-30T11:10:00", iniciales: "CB" },
  { id: "p-1", nombre: "Valeria Gutiérrez Ramos", email: "valeria.gutierrez@mail.com", rol: "postulante", estado: "activo", ultimoAcceso: "2026-10-27T07:55:00", iniciales: "VG" },
  { id: "u-coord-2", nombre: "Mg. Fernando Rojas", email: "frojas@posgrado.edu", rol: "coordinador", estado: "activo", ultimoAcceso: "2026-10-24T13:30:00", iniciales: "FR" },
]

export const tutores = usuarios.filter((u) => u.rol === "tutor")

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

export const postulantes: Postulante[] = [
  {
    id: "p-1", nombre: "Valeria Gutiérrez Ramos", email: "valeria.gutierrez@mail.com", telefono: "+51 987 654 321", documento: "DNI 74581236", iniciales: "VG",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 68, actividadesCompletadas: 6, actividadesTotales: 9,
    riesgo: "bajo", motivosRiesgo: [], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-27",
    formacion: { grado: "Lic. en Ciencia Política", universidad: "Universidad Nacional Mayor de San Marcos", egreso: 2021, promedio: 16.4 },
  },
  {
    id: "p-2", nombre: "Diego Fernández Castro", email: "diego.fc@mail.com", telefono: "+51 912 345 678", documento: "DNI 70123498", iniciales: "DF",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 22, actividadesCompletadas: 2, actividadesTotales: 9,
    riesgo: "alto", motivosRiesgo: ["Sin actividad en 7 días", "Evidencia rechazada", "Compromiso vencido"], estadoInscripcion: "aprobada", estadoEntrega: "atrasado", ultimaActividad: "2026-10-16",
    formacion: { grado: "Bach. en Economía", universidad: "Universidad del Pacífico", egreso: 2019, promedio: 14.1 },
  },
  {
    id: "p-3", nombre: "Camila Torres Mendoza", email: "camila.torres@mail.com", telefono: "+51 934 112 908", documento: "DNI 72984510", iniciales: "CT",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-2", avance: 45, actividadesCompletadas: 3, actividadesTotales: 7,
    riesgo: "medio", motivosRiesgo: ["Entrega fuera de plazo", "Evidencia en corrección"], estadoInscripcion: "aprobada", estadoEntrega: "atrasado", ultimaActividad: "2026-10-23",
    formacion: { grado: "Lic. en Educación Primaria", universidad: "Pontificia Universidad Católica del Perú", egreso: 2018, promedio: 15.8 },
  },
  {
    id: "p-4", nombre: "Mateo Ríos Valdivia", email: "mateo.rios@mail.com", telefono: "+51 956 220 114", documento: "DNI 71230987", iniciales: "MR",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: "t-3", avance: 81, actividadesCompletadas: 3, actividadesTotales: 3,
    riesgo: "bajo", motivosRiesgo: [], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Ing. de Sistemas", universidad: "Universidad Nacional de Ingeniería", egreso: 2022, promedio: 17.2 },
  },
  {
    id: "p-5", nombre: "Lucía Paredes Huamán", email: "lucia.ph@mail.com", telefono: "+51 978 445 003", documento: "DNI 73345120", iniciales: "LP",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-2", avance: 12, actividadesCompletadas: 1, actividadesTotales: 7,
    riesgo: "alto", motivosRiesgo: ["Sin actividad en 10 días", "No responde a contactos (3 intentos)"], estadoInscripcion: "observada", estadoEntrega: "sin-entregas", ultimaActividad: "2026-10-14",
    formacion: { grado: "Lic. en Psicología", universidad: "Universidad San Martín de Porres", egreso: 2017, promedio: 13.9 },
  },
  {
    id: "p-6", nombre: "Sebastián Morales Díaz", email: "sebastian.md@mail.com", telefono: "+51 901 778 662", documento: "DNI 70987321", iniciales: "SM",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 54, actividadesCompletadas: 5, actividadesTotales: 9,
    riesgo: "medio", motivosRiesgo: ["Avance por debajo del promedio de la cohorte"], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-22",
    formacion: { grado: "Lic. en Administración", universidad: "Universidad de Lima", egreso: 2020, promedio: 15.0 },
  },
  {
    id: "p-7", nombre: "Andrea Salinas Cruz", email: "andrea.sc@mail.com", telefono: "+51 945 321 776", documento: "DNI 74120983", iniciales: "AS",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: null, avance: 0, actividadesCompletadas: 0, actividadesTotales: 3,
    riesgo: "medio", motivosRiesgo: ["Sin tutor asignado", "Inscripción pendiente de aprobación"], estadoInscripcion: "pendiente", estadoEntrega: "sin-entregas", ultimaActividad: "2026-10-25",
    formacion: { grado: "Ing. Informática", universidad: "Universidad Peruana Cayetano Heredia", egreso: 2023, promedio: 16.0 },
  },
  {
    id: "p-8", nombre: "Joaquín Herrera Luna", email: "joaquin.hl@mail.com", telefono: "+51 923 908 551", documento: "DNI 71987650", iniciales: "JH",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-3", avance: 92, actividadesCompletadas: 7, actividadesTotales: 7,
    riesgo: "bajo", motivosRiesgo: [], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-27",
    formacion: { grado: "Lic. en Educación Secundaria", universidad: "Universidad Nacional de San Agustín", egreso: 2016, promedio: 17.8 },
  },
  {
    id: "p-9", nombre: "Renata Vargas Soto", email: "renata.vs@mail.com", telefono: "+51 967 101 239", documento: "DNI 72561098", iniciales: "RV",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-1", avance: 33, actividadesCompletadas: 3, actividadesTotales: 9,
    riesgo: "alto", motivosRiesgo: ["Evidencia rechazada (2 veces)", "Entrega fuera de plazo"], estadoInscripcion: "aprobada", estadoEntrega: "atrasado", ultimaActividad: "2026-10-20",
    formacion: { grado: "Lic. en Derecho", universidad: "Universidad de Piura", egreso: 2019, promedio: 14.6 },
  },
  {
    id: "p-10", nombre: "Tomás Aguilar Pinto", email: "tomas.ap@mail.com", telefono: "+51 918 667 012", documento: "DNI 70345671", iniciales: "TA",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: "t-3", avance: 61, actividadesCompletadas: 2, actividadesTotales: 3,
    riesgo: "bajo", motivosRiesgo: [], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Ing. Electrónica", universidad: "Universidad Nacional de Trujillo", egreso: 2020, promedio: 15.5 },
  },
  {
    id: "p-11", nombre: "Isabella Chávez Rojas", email: "isabella.cr@mail.com", telefono: "+51 990 554 128", documento: "DNI 73908124", iniciales: "IC",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: null, avance: 5, actividadesCompletadas: 0, actividadesTotales: 7,
    riesgo: "alto", motivosRiesgo: ["Sin tutor asignado", "Sin entregas a 10 días del cierre"], estadoInscripcion: "pendiente", estadoEntrega: "sin-entregas", ultimaActividad: "2026-10-18",
    formacion: { grado: "Lic. en Comunicación", universidad: "Universidad de Lima", egreso: 2021, promedio: 15.2 },
  },
  {
    id: "p-12", nombre: "Gabriel Núñez Ortiz", email: "gabriel.no@mail.com", telefono: "+51 976 330 445", documento: "DNI 71654320", iniciales: "GN",
    programaId: "pr-1", convocatoriaId: "cv-1", tutorId: "t-2", avance: 74, actividadesCompletadas: 7, actividadesTotales: 9,
    riesgo: "bajo", motivosRiesgo: [], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-26",
    formacion: { grado: "Lic. en Sociología", universidad: "Pontificia Universidad Católica del Perú", egreso: 2018, promedio: 16.9 },
  },
  {
    id: "p-13", nombre: "Mariana Delgado Silva", email: "mariana.ds@mail.com", telefono: "+51 955 887 210", documento: "DNI 72019834", iniciales: "MD",
    programaId: "pr-2", convocatoriaId: "cv-2", tutorId: "t-2", avance: 40, actividadesCompletadas: 3, actividadesTotales: 7,
    riesgo: "medio", motivosRiesgo: ["Compromiso próximo a vencer"], estadoInscripcion: "aprobada", estadoEntrega: "al-dia", ultimaActividad: "2026-10-24",
    formacion: { grado: "Lic. en Educación Inicial", universidad: "Universidad Nacional de Educación", egreso: 2015, promedio: 15.4 },
  },
  {
    id: "p-14", nombre: "Nicolás Ramírez Vega", email: "nicolas.rv@mail.com", telefono: "+51 939 210 667", documento: "DNI 70876123", iniciales: "NR",
    programaId: "pr-3", convocatoriaId: "cv-3", tutorId: "t-3", avance: 0, actividadesCompletadas: 0, actividadesTotales: 3,
    riesgo: "medio", motivosRiesgo: ["Inscripción observada: documento ilegible"], estadoInscripcion: "observada", estadoEntrega: "sin-entregas", ultimaActividad: "2026-10-21",
    formacion: { grado: "Bach. en Matemáticas", universidad: "Universidad Nacional de Ingeniería", egreso: 2024, promedio: 16.2 },
  },
]

export const seguimientos: Seguimiento[] = [
  {
    id: "s-1", postulanteId: "p-2", tutorId: "t-1", fecha: "2026-10-24T10:30:00", tipo: "llamada", resultado: "no-contesta",
    observaciones: "Se realizaron dos intentos de llamada sin respuesta. Se dejó mensaje de voz.",
    proximaAccion: "Enviar correo formal con copia a coordinación",
  },
  {
    id: "s-2", postulanteId: "p-2", tutorId: "t-1", fecha: "2026-10-18T16:00:00", tipo: "reunion", resultado: "contactado",
    observaciones: "El postulante indica sobrecarga laboral. Se acuerda plan de recuperación para el ensayo de Redacción Académica.",
    compromiso: { descripcion: "Entregar versión corregida del ensayo argumentativo", fechaLimite: "2026-10-23", cumplido: false },
    proximaAccion: "Verificar entrega el 23/10",
  },
  {
    id: "s-3", postulanteId: "p-2", tutorId: "t-1", fecha: "2026-10-09T09:15:00", tipo: "correo", resultado: "contactado",
    observaciones: "Bienvenida al curso preparatorio y envío de cronograma de actividades.",
  },
  {
    id: "s-4", postulanteId: "p-1", tutorId: "t-1", fecha: "2026-10-25T11:00:00", tipo: "reunion", resultado: "contactado",
    observaciones: "Revisión del avance del anteproyecto. Buena disposición y entregas a tiempo.",
    compromiso: { descripcion: "Subir matriz de consistencia v2", fechaLimite: "2026-11-01", cumplido: false },
    proximaAccion: "Revisar matriz de consistencia",
  },
  {
    id: "s-5", postulanteId: "p-1", tutorId: "t-1", fecha: "2026-10-12T15:30:00", tipo: "whatsapp", resultado: "contactado",
    observaciones: "Consulta sobre formato APA 7. Se compartió guía institucional.",
    compromiso: { descripcion: "Aplicar normas APA 7 en ensayo", fechaLimite: "2026-10-16", cumplido: true },
  },
  {
    id: "s-6", postulanteId: "p-9", tutorId: "t-1", fecha: "2026-10-22T17:45:00", tipo: "llamada", resultado: "reprogramado",
    observaciones: "Solicita reprogramar la reunión por motivos de salud.",
    proximaAccion: "Reunión virtual el 28/10 a las 19:00",
  },
  {
    id: "s-7", postulanteId: "p-6", tutorId: "t-1", fecha: "2026-10-20T10:00:00", tipo: "correo", resultado: "contactado",
    observaciones: "Se envió retroalimentación detallada de la reseña crítica.",
    compromiso: { descripcion: "Completar foro de Metodología", fechaLimite: "2026-10-30", cumplido: false },
  },
]

export const evidencias: Evidencia[] = [
  {
    id: "e-1", postulanteId: "p-2", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "rechazado",
    versiones: [
      { version: 2, fecha: "2026-10-15T22:10:00", archivo: "ensayo_dfernandez_v2.pdf", tamano: "1.2 MB", estado: "rechazado", feedback: "Persisten problemas de coherencia argumentativa y el texto no cumple con la extensión mínima (1500 palabras).", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-08T19:40:00", archivo: "ensayo_dfernandez_v1.pdf", tamano: "980 KB", estado: "en-correccion", feedback: "Falta tesis explícita en la introducción. Revisar citas en formato APA 7.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-2", postulanteId: "p-1", actividadId: "a-2", titulo: "Matriz de consistencia", curso: "Metodología de la Investigación", estado: "pendiente",
    versiones: [
      { version: 1, fecha: "2026-10-26T20:15:00", archivo: "matriz_vgutierrez_v1.xlsx", tamano: "340 KB", estado: "pendiente" },
    ],
  },
  {
    id: "e-3", postulanteId: "p-9", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "en-correccion",
    versiones: [
      { version: 3, fecha: "2026-10-25T09:00:00", archivo: "ensayo_rvargas_v3.pdf", tamano: "1.4 MB", estado: "pendiente" },
      { version: 2, fecha: "2026-10-18T23:50:00", archivo: "ensayo_rvargas_v2.pdf", tamano: "1.3 MB", estado: "rechazado", feedback: "Se detectó similitud del 38%. Reformular secciones 2 y 3.", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-10T18:20:00", archivo: "ensayo_rvargas_v1.pdf", tamano: "1.1 MB", estado: "rechazado", feedback: "No cumple con la estructura solicitada.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-4", postulanteId: "p-6", actividadId: "a-3", titulo: "Reseña crítica de artículo", curso: "Metodología de la Investigación", estado: "aprobado",
    versiones: [
      { version: 1, fecha: "2026-10-19T14:30:00", archivo: "resena_smorales_v1.docx", tamano: "210 KB", estado: "aprobado", feedback: "Excelente análisis. Bien fundamentado.", revisor: "Mg. Jorge Paredes" },
    ],
  },
  {
    id: "e-5", postulanteId: "p-6", actividadId: "a-2", titulo: "Matriz de consistencia", curso: "Metodología de la Investigación", estado: "pendiente",
    versiones: [
      { version: 1, fecha: "2026-10-26T11:45:00", archivo: "matriz_smorales_v1.pdf", tamano: "512 KB", estado: "pendiente" },
    ],
  },
  {
    id: "e-6", postulanteId: "p-1", actividadId: "a-1", titulo: "Ensayo argumentativo", curso: "Redacción Académica", estado: "aprobado",
    versiones: [
      { version: 2, fecha: "2026-10-14T10:20:00", archivo: "ensayo_vgutierrez_v2.pdf", tamano: "1.1 MB", estado: "aprobado", feedback: "Correcciones aplicadas correctamente. Aprobado.", revisor: "Mg. Jorge Paredes" },
      { version: 1, fecha: "2026-10-07T21:00:00", archivo: "ensayo_vgutierrez_v1.pdf", tamano: "1.0 MB", estado: "en-correccion", feedback: "Ajustar referencias al formato APA 7 y ampliar la conclusión.", revisor: "Mg. Jorge Paredes" },
    ],
  },
]

export const actividadesPostulante: Actividad[] = [
  { id: "a-1", cursoId: "c-1", curso: "Redacción Académica", titulo: "Ensayo argumentativo", descripcion: "Ensayo de 1500–2000 palabras sobre una política pública reciente.", ponderacion: 30, fechaLimite: "2026-10-15", estado: "aprobado", progreso: 100 },
  { id: "a-2", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Matriz de consistencia", descripcion: "Matriz con problema, objetivos, hipótesis y variables del anteproyecto.", ponderacion: 25, fechaLimite: "2026-11-01", estado: "entregado", progreso: 80 },
  { id: "a-3", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Reseña crítica de artículo", descripcion: "Análisis crítico de un artículo indexado en Scopus (Q1–Q2).", ponderacion: 15, fechaLimite: "2026-10-30", estado: "en-correccion", progreso: 60 },
  { id: "a-4", cursoId: "c-1", curso: "Redacción Académica", titulo: "Resumen y abstract", descripcion: "Resumen de 250 palabras en español e inglés del anteproyecto.", ponderacion: 10, fechaLimite: "2026-11-06", estado: "pendiente", progreso: 20 },
  { id: "a-5", cursoId: "c-2", curso: "Metodología de la Investigación", titulo: "Anteproyecto de investigación", descripcion: "Documento final integrando todas las secciones trabajadas en el curso.", ponderacion: 20, fechaLimite: "2026-11-11", estado: "pendiente", progreso: 0 },
]

export const pasosInscripcion: PasoInscripcion[] = [
  { id: "i-1", titulo: "Registro de datos", descripcion: "Información personal y académica", completado: true, fecha: "2026-08-20" },
  { id: "i-2", titulo: "Carga de documentos", descripcion: "DNI, grado académico y CV", completado: true, fecha: "2026-08-22" },
  { id: "i-3", titulo: "Pago de derecho", descripcion: "Voucher validado por tesorería", completado: true, fecha: "2026-08-25" },
  { id: "i-4", titulo: "Aprobación de inscripción", descripcion: "Validada por coordinación", completado: true, fecha: "2026-08-29" },
  { id: "i-5", titulo: "Curso preparatorio", descripcion: "Completar actividades al 100%", completado: false },
  { id: "i-6", titulo: "Evaluación final", descripcion: "Entrevista y examen de admisión", completado: false },
]

export const alertas: Alerta[] = [
  { id: "al-1", titulo: "Cierre de Matriz de consistencia", descripcion: "Metodología de la Investigación · GP 2026-II", fecha: "2026-10-28", diasRestantes: 1, destinatarios: 14 },
  { id: "al-2", titulo: "Reseña crítica de artículo", descripcion: "Metodología de la Investigación · GP 2026-II", fecha: "2026-10-30", diasRestantes: 3, destinatarios: 21 },
  { id: "al-3", titulo: "Informe de estadística descriptiva", descripcion: "Estadística Aplicada · ES 2026-II", fecha: "2026-11-01", diasRestantes: 5, destinatarios: 33 },
  { id: "al-4", titulo: "Resumen y abstract", descripcion: "Redacción Académica · GP 2026-II", fecha: "2026-11-06", diasRestantes: 10, destinatarios: 38 },
  { id: "al-5", titulo: "Prototipo de arquitectura", descripcion: "Fundamentos de Arquitectura · IS 2026-II", fecha: "2026-11-11", diasRestantes: 15, destinatarios: 27 },
]

export const reglasRiesgo: ReglaRiesgo[] = [
  { id: "r-1", regla: "Sin actividad en 7 días o más", nivel: "alto", afectados: 9 },
  { id: "r-2", regla: "Evidencia rechazada", nivel: "alto", afectados: 6 },
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
  { id: "ev-1", fecha: "2026-10-27T10:42:13", actor: "Mg. Jorge Paredes", rol: "tutor", accion: "Aprobó evidencia v2", entidad: "Evidencia", entidadId: "E-0006", estado: "exito", ip: "10.20.4.118" },
  { id: "ev-2", fecha: "2026-10-27T10:15:02", actor: "Dra. Marisol Herrera", rol: "coordinador", accion: "Modificó tutor asignado", entidad: "Postulante", entidadId: "P-0013", estado: "exito", ip: "10.20.1.32" },
  { id: "ev-3", fecha: "2026-10-27T09:58:44", actor: "Valeria Gutiérrez Ramos", rol: "postulante", accion: "Subió evidencia v1", entidad: "Evidencia", entidadId: "E-0002", estado: "exito", ip: "181.65.22.4" },
  { id: "ev-4", fecha: "2026-10-27T09:31:20", actor: "Sistema", rol: "admin", accion: "Recalculó niveles de riesgo", entidad: "Motor de riesgo", entidadId: "JOB-221", estado: "advertencia", ip: "127.0.0.1" },
  { id: "ev-5", fecha: "2026-10-27T08:12:09", actor: "Ricardo Salazar", rol: "admin", accion: "Asignó rol Tutor", entidad: "Usuario", entidadId: "U-0045", estado: "exito", ip: "10.20.1.10" },
  { id: "ev-6", fecha: "2026-10-26T19:04:51", actor: "Diego Fernández Castro", rol: "postulante", accion: "Intento de carga fallido (formato no permitido)", entidad: "Evidencia", entidadId: "E-0001", estado: "error", ip: "190.42.118.9" },
  { id: "ev-7", fecha: "2026-10-26T17:20:33", actor: "Mg. Jorge Paredes", rol: "tutor", accion: "Rechazó evidencia v2", entidad: "Evidencia", entidadId: "E-0001", estado: "exito", ip: "10.20.4.118" },
  { id: "ev-8", fecha: "2026-10-26T15:48:00", actor: "Dra. Marisol Herrera", rol: "coordinador", accion: "Aprobó inscripción", entidad: "Inscripción", entidadId: "I-0128", estado: "exito", ip: "10.20.1.32" },
  { id: "ev-9", fecha: "2026-10-26T12:30:17", actor: "Mg. Lucía Quispe", rol: "tutor", accion: "Registró contacto (llamada)", entidad: "Seguimiento", entidadId: "S-0342", estado: "exito", ip: "10.20.4.77" },
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
