# Registro de decisiones

> [!info] Regla de control (v0.3 §25)
> Cualquier cambio funcional posterior debe documentarse, justificarse y reflejarse en los documentos complementarios. Las herramientas de asistencia no pueden modificar decisiones funcionales por cuenta propia.

Las decisiones D-001 a D-008 ya figuran en el [[Documento_Maestro_Requisitos_App_Maestria]] v0.3, que está **pendiente de aprobación**; completar fecha y responsable al aprobarlas. Las decisiones D-009 a D-012 las definió el equipo el 14/11/2026. Las decisiones D-013 a D-019 las confirmó el equipo el 15/11/2026 y ya están incorporadas en el Documento Maestro (v0.3.1).

| ID | Fecha | Decisión | Fuente | Aprobada por | Estado |
|---|---|---|---|---|---|
| D-001 | Por definir | Tutor y docente son el mismo rol; no hay rol de docente aparte | v0.3 §2.1 | Por definir | En v0.3, pendiente de aprobación |
| D-002 | Por definir | Postulante y Estudiante no son roles independientes: una misma cuenta pasa de uno a otro | v0.3 §2.1 | Por definir | En v0.3, pendiente de aprobación |
| D-003 | Por definir | Cuatro roles fijos; un usuario puede tener varios; sin permisos individuales | v0.3 §1.5, §2.1–2.2 | Por definir | En v0.3, pendiente de aprobación |
| D-004 | Por definir | Las decisiones institucionales que requieran aprobación humana no se automatizan | v0.3 §1.5 | Por definir | En v0.3, pendiente de aprobación |
| D-005 | Por definir | Contraseñas con Argon2id, mínimo 8 caracteres, sesión de 30 minutos de inactividad | v0.3 §2.8 | Por definir | En v0.3, pendiente de aprobación |
| D-006 | Por definir | Las calificaciones publicadas son definitivas e inmutables | v0.3 §12.6 | Por definir | En v0.3, pendiente de aprobación |
| D-007 | Por definir | Los archivos físicos no se guardan en PostgreSQL; hay una entidad central de archivos | v0.3 §15.1 | Por definir | En v0.3, pendiente de aprobación |
| D-008 | Por definir | Primera etapa en entorno local, con datos de prueba y correo simulado | v0.3 §21.4 | Por definir | En v0.3, pendiente de aprobación |
| D-009 | 14/11/2026 | Zona horaria del sistema: hora de Ecuador (America/Guayaquil, GMT-5, hora de Quito) | Indicada por el equipo | Equipo | Definida |
| D-010 | 14/11/2026 | En la Fase 1 el inicio de sesión es de demostración: sin backend, solo en desarrollo, sin contraseñas ni secretos | Instrucción de la Fase 1 | Equipo | Definida para la Fase 1 |
| D-011 | 14/11/2026 | El frontend vive en `apps/frontend` | Instrucción de la Fase 1 | Equipo | Definida |
| D-012 | 14/11/2026 | Tipos y rutas del frontend en español; la correspondencia con los nombres de la API se resuelve en la capa de acceso a datos | Instrucción de la Fase 1 | Equipo | Definida |
| D-013 | 15/11/2026 | Correo electrónico: durante el desarrollo local se usan notificaciones internas y correos simulados; en esta etapa no se envían correos reales | Nota «Correcciones posteriores a la Fase 1»; coincide con v0.3 §14.1 y §21.4 | Equipo | Confirmada por el equipo |
| D-014 | 15/11/2026 | Escala institucional de calificaciones: de 0 a 100. No se confunde con la distribución interna de ponderaciones de actividades y evaluaciones | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |
| D-015 | 15/11/2026 | Nota mínima de aprobación: 70 puntos | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |
| D-016 | 15/11/2026 | Estados de postulación: exactamente los ocho del v0.3 §6.3 (Borrador, Recibida, En revisión, Pendiente de corrección, Validada, Admitida, No admitida, En lista de espera). No se incorporan «En nivelación» ni «Retirada» | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |
| D-017 | 15/11/2026 | Formularios de postulación de estructura fija; requisitos y documentos solicitados configurables por convocatoria; sin constructor de formularios dinámicos | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |
| D-018 | 15/11/2026 | El proceso académico de nivelación queda fuera del alcance de la primera versión; podrá evaluarse en una versión futura | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |
| D-019 | 15/11/2026 | Ofertas de vacantes: se conserva el mecanismo con plazo de respuesta. El coordinador gestiona la oferta y fija el plazo; el postulante puede aceptar o rechazar; si no responde antes del vencimiento la oferta vence y el coordinador puede continuar con la siguiente persona de la lista de espera, conservando el orden de la lista | Nota «Correcciones posteriores a la Fase 1» | Equipo | Confirmada por el equipo |

**Sin decisión:** los comprobantes de matrícula y los retiros no tienen una decisión definitiva y no se consideran funcionalidad aprobada.

Las discrepancias con el v0.2 que siguen abiertas están en [[Decisiones pendientes]].
