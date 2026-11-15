import type { Role } from "@/lib/types"

/**
 * Registro de rutas de la aplicación.
 *
 * Es la única fuente de verdad de qué rutas existen, qué roles pueden entrar y qué
 * pantallas son todavía provisionales. Lo usan el proxy, la navegación, las migas de
 * pan y las pruebas. No importa componentes de React para poder ejecutarse en el proxy.
 *
 * Permisos: se derivan de la Matriz de permisos (borrador del v0.3). Donde la matriz
 * dice «Por definir», la ruta NO se habilita para ese rol.
 */

export type EstadoRuta = "implementada" | "provisional"

export interface DefinicionRuta {
  id: string
  ruta: string
  titulo: string
  descripcion: string
  /** Roles con acceso. Vacío no es válido: toda ruta privada tiene al menos un rol. */
  roles: Role[]
  estado: EstadoRuta
  /** Ruta accesible sin sesión. */
  publica?: boolean
  /** Solo aplica al rol Postulante/Estudiante: la sección depende del estado de su cuenta. */
  requiere?: "matricula" | "postulacion"
  /** Módulo del Documento Maestro v0.3 (§1.4). */
  modulo?: string
  incluira?: string[]
  pendientes?: string[]
}

const TODOS: Role[] = ["admin", "coordinador", "tutor", "postulante"]
const GESTION: Role[] = ["admin", "coordinador"]

export const RUTAS: DefinicionRuta[] = [
  // ---------------------------------------------------------------- implementadas
  { id: "dashboard", ruta: "/dashboard", titulo: "Panel ejecutivo", descripcion: "Visión consolidada de retención, riesgo académico y vencimientos próximos.", roles: GESTION, estado: "implementada", modulo: "13. Seguimiento académico y riesgos" },
  { id: "estudiantes", ruta: "/estudiantes", titulo: "Estudiantes y seguimiento", descripcion: "Asigna tutores y prioriza intervenciones según el nivel de riesgo.", roles: GESTION, estado: "implementada", modulo: "13. Seguimiento académico y riesgos" },
  { id: "tutor", ruta: "/tutor", titulo: "Mis estudiantes", descripcion: "Seguimiento de los estudiantes asignados.", roles: ["tutor"], estado: "implementada", modulo: "13. Seguimiento académico y riesgos" },
  { id: "tutor-entregas", ruta: "/tutor/entregas", titulo: "Entregas por revisar", descripcion: "Revisión de las entregas de actividades de tus estudiantes.", roles: ["tutor"], estado: "implementada", modulo: "10. Actividades y entregas" },
  { id: "estudiante", ruta: "/estudiante", titulo: "Mi curso", descripcion: "Estado de tu matrícula, avance y próximas entregas.", roles: ["postulante"], requiere: "matricula", estado: "implementada", modulo: "7. Matrículas" },
  { id: "estudiante-actividades", ruta: "/estudiante/actividades", titulo: "Mis actividades", descripcion: "Entrega tus actividades antes de la fecha límite.", roles: ["postulante"], requiere: "matricula", estado: "implementada", modulo: "10. Actividades y entregas" },
  { id: "sin-acceso", ruta: "/sin-acceso", titulo: "Sin acceso", descripcion: "No tienes permiso para ver esta sección.", roles: TODOS, estado: "implementada" },

  // ---------------------------------------------------------------- administración y gestión
  { id: "usuarios", ruta: "/usuarios", titulo: "Usuarios y roles", descripcion: "Cuentas de usuario, roles y asignaciones.", roles: ["admin"], estado: "provisional", modulo: "1. Usuarios, autenticación y permisos",
    incluira: ["Alta, edición, activación y desactivación de cuentas sin perder historial", "Un usuario con varios roles", "Asignaciones de coordinadores y tutores", "Cuentas administrativas protegidas"],
    pendientes: ["Quién asigna y reasigna tutores (Decisiones pendientes, sección C)"] },
  { id: "configuracion", ruta: "/configuracion", titulo: "Configuración institucional", descripcion: "Datos institucionales, tema y ajustes generales.", roles: ["admin"], estado: "provisional", modulo: "2. Gestión institucional y 18. Configuración institucional",
    incluira: ["Datos institucionales y logotipo", "Tema institucional", "Activación de los tipos de notificación", "Asistente de configuración inicial"] },
  { id: "facultades", ruta: "/facultades", titulo: "Facultades", descripcion: "Catálogo de facultades de la institución.", roles: ["admin"], estado: "provisional", modulo: "3. Facultades, programas y períodos",
    incluira: ["Facultades con código único", "Una facultad con programas activos no se puede desactivar"] },
  { id: "programas", ruta: "/programas", titulo: "Programas", descripcion: "Programas de maestría y su información académica.", roles: GESTION, estado: "provisional", modulo: "3. Facultades, programas y períodos",
    incluira: ["Programas con código institucional, facultad, modalidad y estado", "Información académica y duración"],
    pendientes: ["Quién crea y activa los programas (Decisiones pendientes, sección C)"] },
  { id: "periodos", ruta: "/periodos", titulo: "Períodos académicos", descripcion: "Períodos académicos y su relación con los programas.", roles: ["admin"], estado: "provisional", modulo: "3. Facultades, programas y períodos",
    incluira: ["Períodos con código, fechas y estado", "Relación entre programas y períodos"] },
  { id: "convocatorias", ruta: "/convocatorias", titulo: "Convocatorias", descripcion: "Convocatorias por programa y período.", roles: GESTION, estado: "provisional", modulo: "4. Convocatorias",
    incluira: ["Convocatorias con fechas, cupos y requisitos", "Estados de la convocatoria", "Documentos públicos y privados"] },
  { id: "postulaciones", ruta: "/postulaciones", titulo: "Postulaciones", descripcion: "Revisión de postulaciones y sus documentos.", roles: GESTION, estado: "provisional", modulo: "5. Postulaciones y documentos",
    incluira: ["Revisión documental por requisito", "Solicitudes de corrección", "Historial de estados de cada postulación"],
    pendientes: ["Lista oficial de estados de la postulación (Decisiones pendientes, sección B)"] },
  { id: "admisiones", ruta: "/admisiones", titulo: "Admisiones y lista de espera", descripcion: "Decisiones de admisión, cupos y lista de espera.", roles: GESTION, estado: "provisional", modulo: "6. Admisiones y listas de espera",
    incluira: ["Decisiones de admisión con responsable, fecha y observaciones", "Asignación de cupos sin doble asignación", "Lista de espera por orden de llegada"],
    pendientes: ["Ofertas de vacante con plazo de respuesta (Decisiones pendientes, sección B)"] },
  { id: "matriculas", ruta: "/matriculas", titulo: "Matrículas", descripcion: "Matrículas de los estudiantes admitidos.", roles: GESTION, estado: "provisional", modulo: "7. Matrículas",
    incluira: ["Matrícula del estudiante en un curso, con su postulación de origen", "Estados e historial de la matrícula"],
    pendientes: ["Comprobante de matrícula y retiros (Decisiones pendientes, sección B)"] },
  { id: "cursos", ruta: "/cursos", titulo: "Cursos y asignaturas", descripcion: "Cursos preparatorios, módulos y asignaturas.", roles: GESTION, estado: "provisional", modulo: "8. Cursos, módulos y asignaturas",
    incluira: ["Cursos con módulos opcionales y asignaturas", "Fechas del curso dentro del período"] },
  { id: "tutores", ruta: "/tutores", titulo: "Tutores y asignaciones", descripcion: "Asignación y seguimiento de tutores.", roles: GESTION, estado: "provisional", modulo: "9. Tutores, coordinadores y grupos",
    incluira: ["Asignación de tutores a cursos y asignaturas", "Historial de asignaciones con motivo"],
    pendientes: ["Alcance del coordinador en la asignación de tutores (Decisiones pendientes, sección C)"] },
  { id: "calificaciones", ruta: "/calificaciones", titulo: "Calificaciones", descripcion: "Planes de calificación, cierre y publicación.", roles: ["admin"], estado: "provisional", modulo: "12. Calificaciones y ponderaciones",
    incluira: ["Plantillas institucionales con categorías", "Planes por curso y asignatura (suma exacta de 100 puntos)", "Cierre, reapertura y publicación de calificaciones"],
    pendientes: ["Escala de calificaciones y nota mínima", "Papel del coordinador en el cierre y la publicación (la matriz de permisos dice «Por definir»)"] },
  { id: "auditoria", ruta: "/auditoria", titulo: "Auditoría y trazabilidad", descripcion: "Registro de las operaciones importantes del sistema.", roles: GESTION, estado: "provisional", modulo: "16. Auditoría",
    incluira: ["Usuario, acción, fecha y valores anterior y nuevo", "Alcance global para el administrador y por programa para el coordinador"] },
  { id: "reportes", ruta: "/reportes", titulo: "Reportes", descripcion: "Exportaciones en PDF y Excel según tu alcance.", roles: TODOS, requiere: "matricula", estado: "provisional", modulo: "17. Reportes y exportaciones",
    incluira: ["Reportes y exportaciones en PDF y Excel según el alcance de cada rol", "Reporte final del estudiante"] },

  // ---------------------------------------------------------------- tutor
  { id: "tutor-cursos", ruta: "/tutor/cursos", titulo: "Mis cursos y asignaturas", descripcion: "Cursos y asignaturas que tienes asignados.", roles: ["tutor"], estado: "provisional", modulo: "8. Cursos, módulos y asignaturas",
    incluira: ["Consulta de los cursos y asignaturas asignados", "Estudiantes matriculados en cada uno"] },
  { id: "tutor-actividades", ruta: "/tutor/actividades", titulo: "Actividades", descripcion: "Crea y administra las actividades de tus asignaturas.", roles: ["tutor"], estado: "provisional", modulo: "10. Actividades y entregas",
    incluira: ["Actividades con fechas, instrucciones y adjuntos", "Revisión y calificación de entregas", "Extensiones y reaperturas"] },
  { id: "tutor-evaluaciones", ruta: "/tutor/evaluaciones", titulo: "Evaluaciones", descripcion: "Evaluaciones en línea y banco de preguntas.", roles: ["tutor"], estado: "provisional", modulo: "11. Evaluaciones en línea",
    incluira: ["Evaluaciones con tiempo e intentos", "Banco de preguntas por asignatura y tema", "Calificación de los intentos"] },
  { id: "tutor-calificaciones", ruta: "/tutor/calificaciones", titulo: "Calificaciones", descripcion: "Calificaciones de tus asignaturas.", roles: ["tutor"], estado: "provisional", modulo: "12. Calificaciones y ponderaciones",
    incluira: ["Ajuste del plan de calificación dentro de la plantilla institucional", "Historial de calificaciones de tus asignaturas"],
    pendientes: ["Escala de calificaciones y nota mínima"] },
  { id: "tutor-grupos", ruta: "/tutor/grupos", titulo: "Grupos", descripcion: "Grupos de estudiantes de tus asignaturas.", roles: ["tutor"], estado: "provisional", modulo: "9. Tutores, coordinadores y grupos",
    incluira: ["Grupos de estudiantes por asignatura", "Solo el tutor mueve estudiantes entre grupos"] },

  // ---------------------------------------------------------------- postulante / estudiante
  { id: "postulante-postulaciones", ruta: "/postulante/postulaciones", titulo: "Mis postulaciones", descripcion: "Estado de tus postulaciones y de tus documentos.", roles: ["postulante"], requiere: "postulacion", estado: "provisional", modulo: "5. Postulaciones y documentos",
    incluira: ["Estado de cada postulación", "Carga y corrección de documentos", "Resultado de la admisión"] },
  { id: "estudiante-evaluaciones", ruta: "/estudiante/evaluaciones", titulo: "Evaluaciones", descripcion: "Evaluaciones disponibles en tus asignaturas.", roles: ["postulante"], requiere: "matricula", estado: "provisional", modulo: "11. Evaluaciones en línea",
    incluira: ["Evaluaciones disponibles y su ventana de tiempo", "Resultado según la configuración de cada evaluación"] },
  { id: "estudiante-calificaciones", ruta: "/estudiante/calificaciones", titulo: "Calificaciones", descripcion: "Calificaciones publicadas de tus asignaturas.", roles: ["postulante"], requiere: "matricula", estado: "provisional", modulo: "12. Calificaciones y ponderaciones",
    incluira: ["Calificaciones publicadas por asignatura", "Reporte final en PDF"],
    pendientes: ["Escala de calificaciones y nota mínima"] },

  // ---------------------------------------------------------------- transversales
  { id: "notificaciones", ruta: "/notificaciones", titulo: "Notificaciones", descripcion: "Centro de notificaciones y preferencias.", roles: TODOS, estado: "provisional", modulo: "14. Notificaciones",
    incluira: ["Centro de notificaciones de la plataforma", "Preferencias dentro de los tipos que habilita el administrador", "Correos simulados en el entorno local"],
    pendientes: ["Anticipación y frecuencia de los recordatorios", "Si hay correo electrónico además de las notificaciones internas (Decisiones pendientes, sección B)"] },
  { id: "perfil", ruta: "/perfil", titulo: "Mi perfil", descripcion: "Tus datos personales y de contacto.", roles: TODOS, estado: "provisional", modulo: "1. Usuarios, autenticación y permisos",
    incluira: ["Datos personales", "Contactos de emergencia"] },

  // ---------------------------------------------------------------- públicas
  { id: "login", ruta: "/login", titulo: "Iniciar sesión", descripcion: "Accede a tu cuenta.", roles: [], estado: "implementada", publica: true },
  { id: "registro", ruta: "/registro", titulo: "Registro de postulantes", descripcion: "Crea tu cuenta de postulante.", roles: [], estado: "provisional", publica: true, modulo: "1. Usuarios, autenticación y permisos",
    incluira: ["Registro público solo para postulantes", "Verificación del correo electrónico"] },
  { id: "recuperar-contrasena", ruta: "/recuperar-contrasena", titulo: "Recuperar contraseña", descripcion: "Restablece tu contraseña.", roles: [], estado: "provisional", publica: true, modulo: "1. Usuarios, autenticación y permisos",
    incluira: ["Recuperación de la contraseña por el propio usuario", "El administrador no puede ver ni fijar contraseñas ajenas"] },
  { id: "verificar-correo", ruta: "/verificar-correo", titulo: "Verificar correo", descripcion: "Confirma tu correo electrónico.", roles: [], estado: "provisional", publica: true, modulo: "1. Usuarios, autenticación y permisos",
    incluira: ["Confirmación del correo del postulante después del registro"] },
  { id: "catalogo", ruta: "/catalogo", titulo: "Convocatorias disponibles", descripcion: "Catálogo público de convocatorias.", roles: [], estado: "provisional", publica: true, modulo: "4. Convocatorias",
    incluira: ["Catálogo público de convocatorias", "Detalle de requisitos y documentos públicos"] },
]

export function normalizarRuta(pathname: string): string {
  const limpia = pathname.split("?")[0].split("#")[0]
  return limpia.length > 1 && limpia.endsWith("/") ? limpia.slice(0, -1) : limpia
}

export function buscarRuta(pathname: string): DefinicionRuta | undefined {
  const ruta = normalizarRuta(pathname)
  return RUTAS.find((r) => r.ruta === ruta)
}

export function esRutaPublica(pathname: string): boolean {
  const ruta = normalizarRuta(pathname)
  return ruta === "/salir" || RUTAS.some((r) => r.publica && r.ruta === ruta)
}

/** Títulos para las migas de pan: el último segmento de cada ruta registrada. */
export const titulosPorSegmento: Record<string, string> = {
  ...Object.fromEntries(RUTAS.map((r) => [r.ruta.split("/").filter(Boolean).pop() as string, r.titulo])),
  tutor: "Mis estudiantes",
  estudiante: "Mi curso",
  postulante: "Postulante",
}
