# API y endpoints

Borrador, no contrato aprobado. Recursos derivados de los módulos del [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.

| Recurso | Operaciones previstas |
|---|---|
| `/auth` | login, logout, sesión, registro público, verificación de correo, recuperación de contraseña |
| `/users`, `/roles`, `/assignments` | usuarios, roles y asignaciones académicas |
| `/institution` | datos institucionales, logotipo y tema |
| `/faculties`, `/programs`, `/periods` | estructura institucional |
| `/calls` | convocatorias y catálogo público |
| `/applications` | postulaciones, documentos, revisiones y correcciones |
| `/admissions`, `/waitlist`, `/seat-offers` | decisiones de admisión, cupos, lista de espera y ofertas de vacante |
| `/enrollments` | matrículas |
| `/courses`, `/modules`, `/subjects`, `/groups` | estructura académica y grupos |
| `/activities`, `/submissions` | actividades, entregas, intentos y calificación |
| `/assessments`, `/question-bank`, `/attempts` | evaluaciones en línea |
| `/grading` | plantillas, planes, cierre y publicación |
| `/follow-up`, `/risk` | contactos, compromisos y evaluaciones de riesgo |
| `/notifications` | notificaciones, tipos y preferencias |
| `/files` | carga, versiones y descarga autorizada |
| `/reports` | PDF y Excel |
| `/audit` | auditoría |

Definir DTOs, filtros, paginación, errores y autorización antes de desarrollar en paralelo.
