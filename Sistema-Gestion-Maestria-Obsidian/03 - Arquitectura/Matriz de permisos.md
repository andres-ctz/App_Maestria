# Matriz de permisos

> [!warning] Borrador derivado del v0.3
> Resume lo que el [[Documento_Maestro_Requisitos_App_Maestria]] dice por rol. **—** = sin acceso previsto en el v0.3. **Por definir** = el v0.3 no lo especifica (ver [[Decisiones pendientes]]). No sustituye la aprobación del cliente.

El alcance lo delimitan las asignaciones: el coordinador ve **sus programas**; el tutor, **sus cursos y asignaturas**; el estudiante, **lo propio**.

| Módulo / acción | Administrador | Coordinador | Tutor | Postulante / Estudiante | Fuente |
|---|---|---|---|---|---|
| Cuentas, roles y asignaciones | Gestiona (global) | — | — | Gestiona sus datos personales | §2.2, §2.6, §2.7 |
| Reasignar programas, cursos y asignaturas | Sí | Por definir | — | — | §2.5 |
| Asignar y seguir tutores | Global | Sus programas (alcance por confirmar) | — | — | §2.3 |
| Datos institucionales, logotipo y tema | Gestiona | — | — | — | §3 |
| Facultades y períodos | Gestiona | Consulta períodos activos de sus programas | — | — | §4.1, §4.3–4.4 |
| Programas | Gestiona; único que edita el código | Sus programas (crear/activar: por definir) | — | Los ve en el catálogo público | §4.2 |
| Convocatorias | Gestiona | Sus programas | — | Catálogo público | §2.3, §5 |
| Postulación: enviar y corregir | — | — | — | Las propias; corrige solo lo habilitado | §6.1, §6.4 |
| Postulación: revisar documentos y pedir correcciones | Global | Sus programas | — | — | §6.5 |
| Decisiones de admisión y cupos | Global | Sus programas | — | — | §2.3, §7 |
| Ofertas de vacante | Por definir | Gestiona y fija el plazo (sus programas) | — | Acepta o rechaza las propias | §7.4, D-019 |
| Matrículas | Global | Sus programas | — | Consulta la propia | §2.3, §8 |
| Cursos, módulos y asignaturas | Global | Sus programas | Consulta los asignados | Consulta los matriculados | §2.3, §9 |
| Grupos de estudiantes | Por definir | Por definir | Gestiona; único que mueve estudiantes | Se incorpora si el tutor lo permite | §9.4 |
| Actividades y entregas | Global | Sus programas; puede reabrir | Crea, revisa y califica las de sus asignaturas | Entrega las propias | §10 |
| Evaluaciones en línea | Global | Sus programas | Crea y califica las de sus asignaturas | Realiza las disponibles | §11 |
| Plantillas de calificación | Gestiona | Por definir | — | — | §12.1 |
| Plan de calificación del curso | Global | Por definir | Ajusta actividades dentro de la plantilla | — | §12.2 |
| Cerrar, reabrir y publicar calificaciones | Gestiona (único mencionado) | Por definir | Consulta el historial de sus asignaturas | Consulta las publicadas | §12.5–12.7 |
| Seguimiento académico y riesgo | Institucional | Sus programas | Sus estudiantes asignados | Su propio seguimiento (nivel de riesgo: por definir) | §2.3, §13 |
| Notificaciones | Activa o desactiva los tipos | Sus preferencias | Sus preferencias | Sus preferencias | §14.3–14.4 |
| Auditoría | Global | Su ámbito | — | — | §2.3, §16 |
| Reportes y exportaciones | Institucional | Sus programas | Sus cursos y asignaturas | Su información autorizada | §17.2 |
| Descarga de archivos | Permiso validado en el servidor según módulo y asignación | Ídem | Ídem | Ídem | §15.6 |

## Reglas transversales
- Los permisos se validan en el servidor, además de la interfaz (§2.2).
- El tutor no ve comparaciones con otros tutores, asignaturas o grupos fuera de su responsabilidad (§2.3).
- El estudiante no accede a información de otros estudiantes (§2.3).
- Revocar una asignación quita el acceso actual y conserva el historial (§2.4).
- Hay dos cuentas administrativas protegidas, que no se pueden eliminar ni desactivar (§2.9).
- El administrador no puede ver ni fijar la contraseña de otro usuario (§2.8).
