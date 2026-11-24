# API y endpoints

Borrador, no contrato aprobado. Recursos derivados de los módulos del [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.

| Recurso | Operaciones previstas |
|---|---|
| `/auth` | login, logout, sesión, registro público, verificación de correo, recuperación de contraseña |
| `/users`, `/roles`, `/assignments` | usuarios, roles y asignaciones académicas |
| `/institution` | datos institucionales, logotipo y tema |
| `/faculties`, `/programs`, `/periods` | estructura institucional; activar y desactivar programas solo administrador (D-024, D-029) |
| `/document-types` | catálogo de tipos de documento: lo edita solo el administrador; lo consultan quienes configuran convocatorias (D-023) |
| `/calls` | convocatorias y catálogo público (D-025). Acciones: transiciones manuales de estado, suspender (con motivo), reanudar, cancelar (con motivo) (D-026); cambiar el período adicional de revisión (D-028); duplicar (D-027) |
| `/applications` | postulaciones, documentos, revisiones y correcciones |
| `/admissions`, `/waitlist`, `/seat-offers` | decisiones de admisión, cupos (disponibles calculados, D-031), lista de espera y ofertas de vacante; anular oferta con motivo (D-032) |
| `/enrollments` | matrículas; retiro con motivo y fecha; comprobante PDF con código único y verificación (D-033) |
| `/courses`, `/modules`, `/subjects`, `/groups` | estructura académica y grupos; duplicar cursos (D-027) |
| `/activities`, `/submissions` | actividades, entregas, intentos y calificación |
| `/assessments`, `/question-bank`, `/attempts` | evaluaciones en línea |
| `/grading` | plantillas, planes, cierre y publicación |
| `/follow-up`, `/risk` | contactos, compromisos y evaluaciones de riesgo |
| `/notifications` | notificaciones, tipos y preferencias |
| `/files` | carga, versiones y descarga autorizada |
| `/reports` | PDF y Excel |
| `/audit` | auditoría |

Definir DTOs, filtros, paginación, errores y autorización antes de desarrollar en paralelo.
