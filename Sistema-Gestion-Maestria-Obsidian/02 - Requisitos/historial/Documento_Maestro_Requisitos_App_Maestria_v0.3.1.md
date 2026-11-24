# Documento Maestro de Requisitos — App Maestría

**Versión:** 0.3.1  
**Estado:** Versión consolidada para revisión y aprobación  
**Última actualización:** 15/11/2026 (decisiones confirmadas por el equipo D-013 a D-019; la copia de la v0.3 original está en `historial/`)  
**Proyecto:** Sistema de gestión de cursos preparatorios para programas de maestría  
**Documento:** Requisitos funcionales, reglas de negocio y restricciones del sistema

---

# 1. Introducción

## 1.1. Propósito

El presente documento establece los requisitos funcionales, reglas de negocio, restricciones y criterios generales que deberá cumplir App Maestría.

El sistema tiene como propósito centralizar y facilitar la gestión de los procesos institucionales, administrativos y académicos relacionados con los programas de maestría y sus respectivos cursos preparatorios.

Este documento constituye la referencia funcional principal para el equipo de desarrollo y para las futuras instrucciones entregadas a herramientas de asistencia de programación, como Claude.

## 1.2. Objetivo general

Desarrollar una plataforma web que permita administrar programas de maestría, convocatorias, postulaciones, admisiones, matrículas, cursos preparatorios, actividades, evaluaciones, calificaciones y seguimiento académico, manteniendo la información organizada, segura, trazable y accesible según los permisos de cada usuario.

## 1.3. Objetivos específicos

- Administrar la estructura institucional y académica.
    
- Gestionar convocatorias y procesos de postulación.
    
- Facilitar la revisión documental y los procesos de admisión.
    
- Administrar matrículas y cursos preparatorios.
    
- Gestionar tutores, coordinadores, asignaturas y estudiantes.
    
- Facilitar la creación, entrega, revisión y calificación de actividades.
    
- Implementar evaluaciones en línea con tiempo controlado.
    
- Administrar ponderaciones y calificaciones.
    
- Realizar seguimiento académico e identificar estudiantes en riesgo.
    
- Gestionar notificaciones institucionales.
    
- Generar reportes y documentos descargables.
    
- Mantener auditoría e historial de las operaciones importantes.
    

## 1.4. Alcance

El sistema contempla los siguientes módulos:

1. Usuarios, autenticación y permisos.
    
2. Gestión institucional.
    
3. Facultades, programas y períodos académicos.
    
4. Convocatorias.
    
5. Postulaciones y documentos.
    
6. Admisiones y listas de espera.
    
7. Matrículas.
    
8. Cursos, módulos y asignaturas.
    
9. Tutores, coordinadores y grupos.
    
10. Actividades y entregas.
    
11. Evaluaciones en línea.
    
12. Calificaciones y ponderaciones.
    
13. Seguimiento académico y riesgos.
    
14. Notificaciones.
    
15. Archivos y almacenamiento.
    
16. Auditoría.
    
17. Reportes y exportaciones.
    
18. Configuración institucional.
    

## 1.5. Fuera del alcance inicial

No se considera parte de la primera implementación:

- Integración con sistemas externos de admisión o gestión universitaria, salvo que posteriormente se apruebe.
    
- Envío de correos mediante un proveedor real durante el desarrollo local. Las notificaciones internas y los correos simulados sí se utilizan en el desarrollo local; en esta etapa no se envían correos reales *(decisión D-013)*.
    
- Aplicaciones móviles nativas.
    
- Videoconferencias integradas.
    
- Chat general entre usuarios.
    
- Modificación individual de permisos por usuario.
    
- Automatización de decisiones institucionales que requieran aprobación humana.
    
- Proceso académico de nivelación. Podrá evaluarse en una versión futura *(decisión D-018)*.
    
- Constructor de formularios dinámicos *(decisión D-017)*.
    
- Despliegue definitivo en producción antes de la validación del cliente.
    

---

# 2. Roles, usuarios y permisos

## 2.1. Roles del sistema

El sistema tendrá cuatro roles fijos:

|Rol|Descripción|
|---|---|
|Administrador|Acceso global y gestión institucional del sistema.|
|Coordinador|Gestión de los programas académicos que tenga asignados.|
|Tutor|Gestión académica de los cursos, asignaturas y estudiantes que tenga asignados.|
|Postulante/Estudiante|Usuario externo que puede postular y posteriormente participar en cursos preparatorios.|

El rol Tutor representa también la función docente dentro del sistema. No se crearán roles separados para docente y tutor.

Postulante y Estudiante no serán roles independientes. Una misma cuenta podrá participar en un proceso de postulación y posteriormente convertirse en estudiante.

## 2.2. Asignación de roles

- Un usuario podrá tener varios roles simultáneamente.
    
- El administrador gestionará las asignaciones.
    
- Los permisos estarán definidos por rol y no podrán modificarse individualmente.
    
- La combinación de roles determinará las capacidades generales de la cuenta.
    
- Las asignaciones académicas delimitarán el alcance de acceso.
    
- El sistema deberá validar permisos tanto en la interfaz como en el servidor.
    

## 2.3. Alcance de cada rol

### Administrador

Tendrá acceso global a:

- Usuarios y roles.
    
- Facultades y programas.
    
- Períodos académicos.
    
- Convocatorias y postulaciones.
    
- Admisiones y matrículas.
    
- Cursos, módulos y asignaturas.
    
- Coordinadores y tutores.
    
- Actividades y evaluaciones.
    
- Calificaciones.
    
- Seguimiento académico.
    
- Notificaciones.
    
- Configuración institucional.
    
- Auditoría y reportes.
    

### Coordinador

Tendrá acceso únicamente a los programas que tenga asignados.

Podrá gestionar y consultar los procesos académicos y administrativos permitidos dentro de dichos programas, incluyendo:

- Convocatorias.
    
- Postulaciones y revisiones.
    
- Admisiones.
    
- Matrículas.
    
- Cursos.
    
- Asignación y seguimiento de tutores.
    
- Información académica de los estudiantes.
    
- Reportes correspondientes a sus programas.
    
- Auditoría dentro de su ámbito de responsabilidad.
    

No podrá acceder a programas que no tenga asignados.

### Tutor

Tendrá acceso únicamente a los cursos, asignaturas, grupos y estudiantes que tenga asignados.

Podrá:

- Consultar sus cursos y asignaturas.
    
- Gestionar actividades.
    
- Revisar entregas.
    
- Calificar actividades y evaluaciones.
    
- Registrar retroalimentación.
    
- Gestionar grupos de estudiantes.
    
- Realizar seguimiento académico.
    
- Consultar estadísticas de sus asignaturas.
    

No podrá consultar comparaciones de rendimiento entre otros tutores, asignaturas o grupos que no estén bajo su responsabilidad.

### Postulante/Estudiante

Podrá:

- Consultar convocatorias públicas.
    
- Crear una cuenta.
    
- Gestionar sus datos personales.
    
- Presentar postulaciones.
    
- Cargar documentos requeridos.
    
- Consultar el estado de sus postulaciones.
    
- Consultar su matrícula.
    
- Acceder a los cursos en los que tenga una matrícula activa.
    
- Consultar actividades, evaluaciones y calificaciones disponibles.
    
- Entregar actividades.
    
- Realizar evaluaciones.
    
- Consultar su seguimiento y notificaciones.
    
- Descargar los documentos finales que le correspondan.
    

No podrá acceder a información de otros estudiantes.

## 2.4. Asignaciones académicas

Las asignaciones académicas serán independientes de las asignaciones de roles.

Se contemplan:

- Coordinador asignado a programa.
    
- Tutor asignado a curso.
    
- Tutor asignado a asignatura.
    

Reglas:

- Un coordinador podrá tener varios programas asignados.
    
- Un programa podrá tener varios coordinadores.
    
- Un tutor podrá tener varios cursos y asignaturas.
    
- Una asignatura podrá tener varios tutores.
    
- Las asignaciones tendrán estados: Activa, Suspendida y Finalizada.
    
- Se conservarán fechas de inicio y finalización, responsable del cambio y motivo.
    
- Revocar una asignación retirará el acceso actual, pero no eliminará el historial.
    

## 2.5. Reasignación de responsables

El administrador podrá reasignar programas, cursos o asignaturas.

Cuando se realice una reasignación:

- El nuevo responsable podrá continuar las tareas pendientes.
    
- Se conservarán las calificaciones y actividades realizadas por el responsable anterior.
    
- El historial identificará quién realizó cada operación originalmente.
    
- Se registrará el responsable anterior, el nuevo responsable, el administrador que ejecutó el cambio, fecha, hora y motivo.
    
- El responsable anterior perderá el acceso correspondiente cuando su asignación deje de estar activa.
    

La desactivación de un tutor o coordinador no quedará bloqueada por tener tareas pendientes. El sistema mostrará una advertencia y permitirá al administrador realizar la operación.

## 2.6. Creación de usuarios

Existirán dos mecanismos:

**Registro público:**

- Permitido únicamente para postulantes.
    
- Requiere verificación del correo electrónico.
    
- No permitirá seleccionar roles institucionales.
    

**Creación institucional:**

- Los usuarios institucionales serán creados por el administrador.
    
- El administrador asignará los roles correspondientes.
    
- Las asignaciones académicas se gestionarán de forma independiente.
    

## 2.7. Datos de usuario

Campos requeridos:

- Identificación única.
    
- Nombres.
    
- Apellidos.
    
- Correo electrónico único.
    
- Número de teléfono.
    

Campos opcionales:

- Fecha de nacimiento.
    
- Dirección.
    
- Fotografía de perfil.
    
- Contactos de emergencia.
    

Los contactos de emergencia se administrarán como información independiente del perfil principal.

El correo electrónico será el identificador de acceso.

## 2.8. Seguridad de cuentas

- Contraseñas de mínimo ocho caracteres.
    
- Deben incluir mayúsculas, minúsculas y números.
    
- Las contraseñas se almacenarán mediante Argon2id.
    
- Los usuarios podrán recuperar su contraseña mediante el procedimiento de recuperación establecido.
    
- El administrador no podrá consultar ni establecer directamente la contraseña de un usuario.
    
- La sesión finalizará después de treinta minutos de inactividad.
    
- La desactivación de una cuenta bloqueará el acceso y revocará sus sesiones activas.
    
- La desactivación conservará los registros históricos.
    

## 2.9. Cuentas administrativas protegidas

Existirán dos cuentas administrativas protegidas.

Estas cuentas:

- Se crearán automáticamente durante la instalación inicial.
    
- No tendrán credenciales predeterminadas.
    
- Requerirán que el equipo técnico establezca sus correos y contraseñas iniciales.
    
- No podrán eliminarse ni desactivarse desde el sistema.
    
- No permitirán cambiar su correo electrónico.
    
- Únicamente permitirán modificar la contraseña mediante el procedimiento disponible.
    

Si se pierde una contraseña protegida, el equipo técnico deberá restablecerla directamente mediante el procedimiento técnico correspondiente. No se utilizará el mecanismo ordinario de recuperación por correo ni se generará un registro interno de esa intervención técnica.

## 2.10. Desactivación y reactivación

Cuando un usuario sea desactivado:

- No podrá iniciar sesión.
    
- Se revocarán sus sesiones activas.
    
- Se conservarán sus registros.
    
- Perderá acceso a los recursos institucionales.
    

La reactivación no restaurará automáticamente asignaciones suspendidas o finalizadas. Solo recuperará los permisos correspondientes a asignaciones y matrículas que continúen vigentes.

La eliminación legal de información se sujetará a una política institucional futura, con autorización y auditoría. No se permitirá eliminar usuarios con historial desde las operaciones ordinarias del panel.

---

# 3. Gestión institucional

## 3.1. Información de la institución

El administrador podrá gestionar:

- Nombre institucional.
    
- Logotipo.
    
- Información de contacto.
    
- Información general utilizada en documentos y reportes.
    

Los cambios institucionales se aplicarán a los documentos generados posteriormente.

Los PDF históricos no modificarán su contenido cuando cambie el logotipo o la información institucional.

## 3.2. Logotipo

Formatos permitidos:

- PNG.
    
- JPG.
    
- JPEG.
    
- SVG.
    

El sistema deberá:

- Validar el formato.
    
- Redimensionar automáticamente manteniendo proporciones.
    
- Mostrar una vista previa antes de guardar.
    
- Utilizar el nuevo logotipo en documentos futuros.
    

## 3.3. Tema institucional

El administrador podrá establecer:

- Color principal.
    
- Color secundario.
    
- Color de apoyo.
    

Los cambios se aplicarán inmediatamente a todos los usuarios.

El tema deberá ser compatible con los modos claro y oscuro.

Se permitirá restaurar los colores predeterminados mediante confirmación. No será obligatorio mostrar una vista previa antes de guardar los colores.

## 3.4. Idioma y formato

- El sistema estará disponible inicialmente en español.
    
- No existirá selector de idioma.
    
- Las fechas se mostrarán en formato DD/MM/AAAA.
    

---

# 4. Facultades, programas y períodos académicos

## 4.1. Facultades

El sistema permitirá administrar un catálogo independiente de facultades.

Cada facultad tendrá:

- Código único.
    
- Nombre obligatorio.
    
- Descripción opcional.
    
- Estado activo o inactivo.
    

Reglas:

- El administrador podrá crear, editar, activar y desactivar facultades.
    
- No se permitirá eliminar facultades desde el panel.
    
- No se podrá desactivar una facultad que tenga programas activos.
    
- Se conservarán las relaciones históricas.
    
- Los cambios importantes quedarán registrados en auditoría.
    

Si fuera necesaria una eliminación excepcional, deberá realizarla el equipo técnico mediante un procedimiento autorizado.

## 4.2. Programas

Cada programa tendrá:

- Código institucional único.
    
- Nombre oficial.
    
- Facultad.
    
- Modalidad.
    
- Descripción.
    
- Información académica opcional.
    
- Duración estimada opcional.
    
- Estado.
    

Modalidades:

- Presencial.
    
- Virtual.
    
- Híbrida.
    

Reglas:

- El código institucional será editable únicamente por el administrador.
    
- Los cambios del código quedarán auditados.
    
- El nombre oficial y la facultad serán obligatorios.
    
- La duración podrá expresarse en meses o períodos.
    
- Los programas podrán activarse o desactivarse.
    
- No se eliminarán programas con información histórica.
    

## 4.3. Períodos académicos

Cada período tendrá:

- Código único.
    
- Nombre.
    
- Fecha de inicio.
    
- Fecha de finalización.
    
- Estado.
    

Reglas:

- El administrador gestionará los períodos.
    
- Los períodos no se eliminarán desde el panel.
    
- Los períodos vencidos podrán desactivarse.
    
- Se conservará la información histórica.
    
- Las fechas deberán ser coherentes.
    
- Los cambios que puedan afectar convocatorias o cursos deberán validarse y registrarse.
    

## 4.4. Relación programa-período

Un programa podrá estar asociado a varios períodos y un período podrá contener varios programas.

La relación será administrada por el administrador.

El coordinador solo podrá seleccionar períodos activos que estén asociados a sus programas.

Una convocatoria pertenecerá a un programa y a un período académico.

Un período podrá tener varias convocatorias para un mismo programa.

Las fechas de convocatorias y cursos deberán mantenerse dentro del período correspondiente.

El cambio de período de una convocatoria solo podrá realizarse antes de que esta se abra.

---

# 5. Convocatorias

## 5.1. Información de convocatoria

Cada convocatoria estará asociada a un programa y período académico.

Deberá permitir gestionar:

- Nombre.
    
- Descripción.
    
- Programa.
    
- Período.
    
- Fechas de inicio y finalización.
    
- Cupos.
    
- Requisitos.
    
- Documentos.
    
- Estado.
    
- Información pública.
    

## 5.2. Estados

Los estados contemplados son:

- Borrador.
    
- Programada.
    
- Abierta.
    
- Preparación.
    
- En curso.
    
- Cerrada.
    
- Suspendida.
    
- Cancelada.
    

El sistema deberá aplicar reglas de visibilidad según el estado.

Las convocatorias suspendidas y canceladas no aparecerán en el catálogo público.

Las convocatorias cerradas, programadas y en curso podrán mostrarse según las reglas de publicación correspondientes.

## 5.3. Documentos de convocatoria

Los documentos podrán clasificarse como públicos o privados.

Reglas:

- Los documentos públicos podrán consultarse desde el catálogo público.
    
- Los documentos privados requerirán permisos.
    
- Los reemplazos conservarán versiones anteriores.
    
- La eliminación lógica archivará el documento, sin destruir su historial.
    
- Se registrará quién realizó cada reemplazo o archivo.
    

## 5.4. Catálogo público

El catálogo podrá consultarse sin iniciar sesión.

Permitirá:

- Buscar por nombre.
    
- Buscar por código.
    
- Filtrar por facultad.
    
- Filtrar por modalidad.
    
- Filtrar por estado.
    

---

# 6. Postulaciones y documentos

## 6.1. Registro y postulación

Una persona podrá postular a varias convocatorias utilizando la misma cuenta.

Se permitirá una sola postulación por persona y convocatoria.

La postulación estará vinculada al usuario, convocatoria y documentos requeridos.

## 6.2. Requisitos de postulación

Cada convocatoria tendrá sus propios requisitos.

Los requisitos podrán incluir documentos obligatorios y opcionales.

El sistema deberá distinguir entre:

- Requisito solicitado.
    
- Documento presentado.
    
- Archivo físico asociado.
    
- Versiones del documento.
    
- Resultado de revisión.
    

Un requisito podrá admitir varios archivos cuando corresponda.

La estructura de datos no deberá impedir que un postulante adjunte varios archivos para cumplir un mismo requisito.

La estructura del formulario de postulación es fija. Los requisitos y los documentos solicitados son configurables por convocatoria. No se desarrollará un constructor de formularios dinámicos *(decisión D-017, confirmada por el equipo el 15/11/2026)*.

## 6.3. Estados de postulación

La postulación contará con los siguientes estados, que permiten identificar su progreso. Son exactamente estos ocho estados *(decisión D-016, confirmada por el equipo el 15/11/2026)*:

- Borrador.
    
- Recibida.
    
- En revisión.
    
- Pendiente de corrección.
    
- Validada.
    
- Admitida.
    
- No admitida.
    
- En lista de espera.
    

No se incorporan los estados «En nivelación» ni «Retirada».

Los cambios de estado deberán conservar su historial.

## 6.4. Envío de postulación

Mientras la postulación esté en borrador, el postulante podrá modificarla y cancelarla.

Una vez enviada definitivamente:

- No podrá retirarla voluntariamente desde su cuenta.
    
- No podrá modificar libremente los datos enviados.
    
- Podrá recibir una solicitud de corrección por parte del coordinador o administrador.
    
- Solo podrá modificar los campos y documentos habilitados para esa corrección.
    
- Las correcciones conservarán su historial.
    

## 6.5. Revisión

El coordinador o administrador autorizado podrá:

- Revisar información.
    
- Revisar documentos.
    
- Aprobar documentos.
    
- Rechazar documentos.
    
- Solicitar correcciones.
    
- Registrar observaciones.
    
- Validar requisitos.
    

Se conservará quién realizó cada revisión, cuándo la realizó y cuál fue el resultado.

## 6.6. Cierre de convocatoria

Cuando una convocatoria cierre:

- Se notificará a los postulantes que tengan procesos pendientes.
    
- Las revisiones podrán continuar durante un período adicional configurable.
    
- Al finalizar ese período, las postulaciones pendientes serán rechazadas automáticamente.
    
- El sistema registrará la operación y notificará a los afectados.
    
- Los documentos y registros permanecerán conservados.
    

Las postulaciones de convocatorias cerradas no aparecerán en la vista ordinaria del postulante, pero permanecerán disponibles para consultas históricas autorizadas.

---

# 7. Admisiones y listas de espera

## 7.1. Decisión de admisión

Los responsables autorizados podrán registrar decisiones de admisión.

El sistema conservará:

- Postulación relacionada.
    
- Resultado.
    
- Responsable.
    
- Fecha y hora.
    
- Observaciones.
    
- Historial de cambios.
    

## 7.2. Asignación de cupos

La asignación de cupos deberá evitar que dos procesos simultáneos asignen la misma vacante.

La operación deberá ejecutarse de forma transaccional.

El sistema deberá validar la disponibilidad antes de confirmar la asignación.

## 7.3. Lista de espera

La lista de espera respetará el orden de llegada.

La referencia para determinar el orden será la fecha y hora en que se validaron los requisitos obligatorios de la postulación.

El sistema deberá conservar ese momento de validación y no modificarlo por cambios posteriores que no alteren la condición de elegibilidad.

La promoción desde la lista de espera deberá respetar la disponibilidad real de cupos y registrar la operación.

## 7.4. Ofertas de vacantes

Se conserva el mecanismo de ofertas de vacantes con plazo de respuesta *(decisión D-019, confirmada por el equipo el 15/11/2026)*.

- El coordinador gestiona la oferta y establece el plazo de respuesta.
    
- El postulante puede aceptar o rechazar la oferta.
    
- Si no responde antes del vencimiento, la oferta vence y el coordinador puede continuar con la siguiente persona de la lista de espera.
    
- Debe conservarse el orden de la lista de espera (§7.3).
    

Los campos y estados de la oferta, y su relación con la asignación de cupos (§7.2), se definirán en el modelo de datos. Antecedente: Documento Maestro v0.2, §6.2.

---

# 8. Matrículas

## 8.1. Registro de matrícula

La matrícula relacionará al estudiante con el curso correspondiente y con el proceso de admisión que le dio origen.

Deberá conservar:

- Estudiante.
    
- Postulación de origen.
    
- Curso.
    
- Fecha de matrícula.
    
- Estado.
    
- Responsable.
    
- Información histórica.
    

## 8.2. Reglas

- Una persona no podrá tener más de una matrícula válida para el mismo proceso de admisión.
    
- La matrícula deberá estar respaldada por una decisión de admisión válida.
    
- El sistema conservará el vínculo con la postulación original.
    
- Las matrículas mantendrán su historial.
    
- Los cambios de estado deberán quedar registrados.
    

## 8.3. Acceso del estudiante

El estudiante tendrá acceso a la información académica de sus cursos con matrícula vigente.

Al finalizar un curso o dejar de tener una matrícula activa:

- No podrá seguir consultando el historial académico ordinario de períodos anteriores.
    
- Podrá descargar el PDF final publicado correspondiente a ese curso.
    
- No podrá descargar reportes finales de cursos anteriores distintos del permitido por la regla anterior.
    
- Si su cuenta está desactivada, perderá todo acceso al sistema.
    

---

# 9. Cursos, módulos y asignaturas

## 9.1. Cursos

Cada curso podrá incluir:

- Nombre.
    
- Descripción.
    
- Programa.
    
- Período.
    
- Fecha de inicio.
    
- Fecha de finalización.
    
- Estado.
    
- Coordinadores.
    
- Tutores.
    
- Estudiantes matriculados.
    

Las fechas deberán estar dentro del período académico correspondiente.

## 9.2. Estructura académica

La estructura será:

**Curso → Módulos opcionales → Asignaturas → Actividades y evaluaciones.**

También se permitirá que una asignatura pertenezca directamente al curso sin estar dentro de un módulo.

Reglas:

- Cada asignatura pertenecerá obligatoriamente a un curso.
    
- Una asignatura podrá pertenecer directamente al curso o a un módulo de ese mismo curso.
    
- No podrá estar asociada simultáneamente de ambas formas.
    
- Un módulo pertenecerá a un único curso.
    
- Los módulos y asignaturas heredarán las fechas del curso.
    
- No tendrán fechas independientes.
    

## 9.3. Tutores

Los tutores podrán asignarse a cursos y asignaturas.

El sistema deberá respetar el alcance de cada asignación.

Una asignatura podrá tener varios tutores y un tutor podrá participar en varias asignaturas.

## 9.4. Grupos de estudiantes

Los grupos podrán utilizarse para organizar estudiantes dentro de las actividades.

El tutor podrá:

- Establecer la cantidad de grupos y asignar estudiantes manualmente.
    
- Crear grupos a los que los estudiantes puedan incorporarse.
    

Podrá definir:

- Capacidad máxima.
    
- Capacidad mínima opcional.
    

Reglas:

- Un grupo lleno no permitirá nuevas incorporaciones.
    
- Solo el tutor podrá mover estudiantes entre grupos.
    
- Los cambios quedarán auditados.
    
- Las entregas anteriores conservarán la composición del grupo existente al momento de entregar.
    

---

# 10. Actividades y entregas

## 10.1. Creación de actividades

El tutor podrá crear actividades asociadas a una asignatura.

Cada actividad podrá incluir:

- Título.
    
- Descripción.
    
- Instrucciones.
    
- Fecha y hora de publicación.
    
- Fecha y hora de vencimiento.
    
- Número máximo de intentos.
    
- Modalidad individual o grupal.
    
- Archivos adjuntos.
    
- Configuración de entrega.
    
- Ponderación correspondiente.
    

## 10.2. Publicación y vencimiento

Las actividades tendrán fechas independientes de publicación y vencimiento.

El sistema deberá:

- Impedir entregas antes de la publicación.
    
- Abrir la actividad en la fecha configurada.
    
- Cerrar automáticamente la actividad al llegar al vencimiento.
    
- Registrar los cambios de disponibilidad.
    

## 10.3. Intentos de entrega

El tutor establecerá el número permitido de intentos.

El sistema conservará:

- Cada intento.
    
- Fecha y hora.
    
- Archivos.
    
- Observaciones.
    
- Estado.
    
- Historial de modificaciones.
    

Los intentos adicionales deberán realizarse mediante una reapertura autorizada.

El sistema no seleccionará automáticamente cuál intento será calificado. Los responsables autorizados decidirán qué intento cuenta.

## 10.4. Extensiones

Las extensiones individuales podrán concederse únicamente cuando exista autorización o acuerdo correspondiente.

El tutor no podrá concederlas unilateralmente sin autorización.

Cada extensión conservará:

- Estudiante.
    
- Actividad.
    
- Nueva fecha.
    
- Motivo.
    
- Persona que autoriza.
    
- Persona que registra.
    
- Fecha y hora del registro.
    

## 10.5. Reapertura

El coordinador o tutor autorizado podrá reabrir una actividad cuando exista el acuerdo correspondiente.

Se permitirá reabrirla:

- Para todos los estudiantes.
    
- Para estudiantes seleccionados.
    

Se conservará:

- Responsable.
    
- Autorización.
    
- Fecha y hora.
    
- Motivo.
    
- Nueva fecha de vencimiento, cuando corresponda.
    

Se permitirán múltiples ciclos de apertura y cierre. Cada cambio conservará su historial.

## 10.6. Penalizaciones por retraso

Las penalizaciones no serán automáticas.

El responsable aplicará la penalización de acuerdo con el convenio o decisión correspondiente.

El sistema conservará:

- Calificación original.
    
- Penalización aplicada.
    
- Calificación resultante.
    
- Responsable.
    
- Motivo.
    
- Fecha y hora.
    

## 10.7. Calificación y retroalimentación

El tutor podrá calificar las entregas y modificar una calificación posteriormente.

Toda modificación requerirá un motivo y conservará el historial.

La calificación será visible para el estudiante inmediatamente después de ser publicada en la actividad.

La retroalimentación y los comentarios estarán vinculados a la actividad o entrega. No existirá un chat general ni comentarios independientes de una calificación o actividad.

## 10.8. Actividades grupales

Las entregas grupales tendrán las siguientes reglas:

- Un integrante podrá cargar la entrega del grupo.
    
- Todos los integrantes del grupo podrán consultarla.
    
- La calificación grupal se aplicará inicialmente a todos los integrantes.
    
- El tutor podrá realizar ajustes individuales con justificación.
    
- El sistema identificará quién realizó la carga.
    
- Se conservará una fotografía de los integrantes al momento de entregar.
    
- Si un estudiante cambia de grupo después de una entrega, conservará la entrega y calificación del grupo anterior.
    

---

# 11. Evaluaciones en línea

## 11.1. Creación

El tutor podrá crear evaluaciones en línea asociadas a una asignatura.

Cada evaluación podrá incluir:

- Título.
    
- Instrucciones.
    
- Fecha y hora de apertura.
    
- Fecha y hora de cierre.
    
- Duración individual.
    
- Número de intentos.
    
- Configuración de navegación.
    
- Preguntas.
    
- Puntuación por pregunta.
    
- Configuración de revisión.
    
- Archivos permitidos.
    

## 11.2. Tipos de preguntas

Se contemplan:

- Selección única.
    
- Selección múltiple.
    
- Verdadero o falso.
    
- Respuesta corta.
    
- Respuesta larga o de desarrollo.
    

Las preguntas cerradas podrán calificarse automáticamente.

Las preguntas abiertas requerirán revisión manual.

## 11.3. Banco de preguntas

El sistema tendrá un banco reutilizable de preguntas.

Las preguntas podrán organizarse por asignatura y tema.

El tutor podrá reutilizar preguntas en distintas evaluaciones.

Las modificaciones del banco no alterarán evaluaciones ya realizadas.

Se conservará la versión exacta de cada pregunta y sus opciones utilizada en cada intento.

## 11.4. Orden de preguntas

El tutor podrá:

- Definir el orden manualmente.
    
- Configurar selección aleatoria por estudiante.
    
- Configurar el orden aleatorio de las opciones.
    

El sistema conservará para cada intento:

- Preguntas seleccionadas.
    
- Versión de cada pregunta.
    
- Orden mostrado.
    
- Orden de las opciones.
    
- Respuestas correctas correspondientes a la versión presentada.
    

## 11.5. Tiempo de evaluación

La evaluación tendrá una apertura y un cierre general.

El estudiante no podrá iniciar antes de la apertura.

La duración individual comenzará cuando inicie el intento.

El tiempo efectivo será el menor entre:

- La duración configurada para el estudiante.
    
- El tiempo restante hasta el cierre general de la evaluación.
    

Al agotarse el tiempo o llegar el cierre general:

- Se guardarán las respuestas registradas.
    
- Se cerrará el intento.
    
- No se permitirán modificaciones posteriores.
    

## 11.6. Guardado y desconexiones

Las respuestas se guardarán periódicamente y al cambiar de pregunta.

El tiempo continuará transcurriendo aunque el estudiante cierre el navegador o pierda conexión.

Cuando vuelva a ingresar, podrá continuar si todavía dispone de tiempo.

Si el tiempo termina durante la desconexión, el intento se cerrará con las respuestas que hayan quedado registradas.

No se rastrearán cambios de pestaña o ventana ni se aplicarán penalizaciones por ellos.

## 11.7. Navegación

El tutor podrá configurar:

- Navegación libre entre preguntas.
    
- Navegación secuencial sin posibilidad de regresar.
    

## 11.8. Envío

El estudiante podrá finalizar manualmente mediante un botón de envío.

Antes de confirmar, el sistema mostrará:

- Cantidad de preguntas respondidas.
    
- Cantidad de preguntas sin responder.
    
- Confirmación de envío.
    

El sistema podrá cerrar automáticamente el intento por tiempo o cierre de evaluación.

Después del envío no se permitirán modificaciones.

Las preguntas obligatorias deberán responderse para permitir el envío manual. El cierre automático finalizará el intento incluso si quedan preguntas obligatorias sin responder.

Las preguntas no respondidas tendrán puntuación cero y quedarán identificadas como no respondidas.

## 11.9. Intentos

El tutor establecerá el número permitido de intentos.

El sistema conservará todos los intentos y sus respuestas.

Los intentos adicionales requerirán reapertura autorizada.

Los responsables decidirán qué intento será válido cuando existan varios intentos.

## 11.10. Archivos adjuntos

El tutor podrá definir si una pregunta permite archivos adjuntos.

Podrá establecer formatos y tamaño máximo permitido para cada configuración.

Los archivos quedarán asociados al intento y a la respuesta correspondiente.

## 11.11. Calificación

El tutor asignará puntos a cada pregunta.

El sistema calculará la puntuación obtenida y la escalará a una calificación sobre cien cuando corresponda a la configuración de evaluación.

Las preguntas cerradas se calificarán automáticamente y las abiertas permanecerán pendientes de revisión.

Los resultados parciales automáticos podrán mostrarse inmediatamente.

La calificación final se actualizará una vez completada la revisión manual.

## 11.12. Revisión del estudiante

El tutor podrá configurar cuándo el estudiante puede consultar:

- Sus respuestas.
    
- Si fueron correctas o incorrectas.
    
- Las respuestas correctas.
    

## 11.13. Preguntas aleatorias

El tutor podrá seleccionar una cantidad de preguntas del banco.

El sistema seleccionará aleatoriamente las preguntas para cada estudiante y conservará las seleccionadas en cada intento.

No será obligatorio clasificar las preguntas por dificultad.

## 11.14. Estadísticas

El tutor podrá consultar estadísticas de sus evaluaciones:

- Promedio.
    
- Calificación más alta.
    
- Calificación más baja.
    
- Estudiantes aprobados.
    
- Estudiantes no aprobados.
    
- Resultados individuales.
    
- Preguntas con mayor cantidad de errores.
    
- Preguntas con mayor cantidad de respuestas correctas.
    
- Historial de intentos.
    

No podrá consultar comparaciones fuera de su ámbito asignado.

## 11.15. Invalidación de evaluaciones

El tutor podrá invalidar una evaluación cuando exista un problema o error.

Será obligatorio registrar el motivo.

Al invalidarla:

- Se conservarán intentos, respuestas y calificaciones.
    
- La evaluación dejará de contar para el promedio.
    
- Se notificará a los estudiantes afectados.
    
- Se registrará la operación en auditoría.
    
- Los puntos liberados quedarán disponibles dentro de la misma categoría de calificación.
    

Si una evaluación ya fue completada y se invalida por un problema técnico o institucional, su calificación no contará. Podrá crearse otra evaluación para obtener la calificación pendiente.

La evaluación anterior permanecerá en el historial.

## 11.16. Modificación y reapertura

El tutor podrá modificar, reprogramar, cerrar o crear una nueva evaluación de acuerdo con los permisos y reglas correspondientes.

Se permitirán reaperturas y cierres para todos los estudiantes o para estudiantes seleccionados, con autorización e historial.

---

# 12. Calificaciones y ponderaciones

## 12.1. Plantillas institucionales

El administrador gestionará plantillas institucionales de calificación.

Las plantillas podrán:

- Crearse.
    
- Editarse.
    
- Organizarse por categorías.
    
- Definir la distribución de puntos.
    
- Utilizarse en diferentes cursos y asignaturas.
    

Ejemplo de distribución:

|Categoría|Ponderación|
|---|---|
|Proyectos|40 puntos|
|Exámenes|40 puntos|
|Tareas|20 puntos|
|**Total**|**100 puntos**|

El ejemplo es ilustrativo y no constituye una distribución obligatoria.

## 12.2. Plan de calificación del curso

Cada curso y asignatura tendrá su propio plan de calificación.

El plan utilizará una plantilla institucional.

El tutor podrá ajustar la cantidad de actividades y evaluaciones dentro de cada categoría, respetando los puntos asignados.

Reglas:

- La distribución total deberá sumar exactamente cien puntos.
    
- Ninguna categoría podrá superar sus puntos disponibles.
    
- No podrán quedar puntos obligatorios sin distribuir al cerrar el plan.
    
- No se podrán agregar actividades cuando la categoría haya agotado sus puntos.
    
- La invalidación de un elemento liberará sus puntos dentro de su categoría.
    
- La ponderación deberá apuntar a una actividad o evaluación, nunca a ambas simultáneamente.
    

## 12.3. Elementos válidos para el promedio

Las actividades y evaluaciones válidas contribuirán al resultado final.

Los elementos invalidados quedarán excluidos.

La distribución dinámica deberá considerar los elementos válidos y mantener las ponderaciones de sus categorías.

Los detalles matemáticos que no estén definidos institucionalmente deberán resolverse antes de implementar el cálculo definitivo, sin inventar reglas de calificación.

## 12.4. Revisión pendiente

No se permitirá cerrar las calificaciones mientras existan actividades o evaluaciones con revisiones pendientes.

## 12.5. Cierre de calificaciones

El administrador podrá abrir y cerrar períodos de calificación sin límites automáticos impuestos por el sistema.

Cuando se cierre una calificación:

- Se generará una versión.
    
- Se conservará la fecha y hora.
    
- Se identificará al responsable.
    
- La versión anterior permanecerá disponible en modo de solo lectura.
    

El administrador podrá reabrir un cierre que todavía no haya sido publicado cuando exista una corrección autorizada.

La reapertura requerirá motivo e historial de auditoría.

No se enviará una notificación automática al tutor por esta reapertura; la comunicación será directa.

## 12.6. Publicación

El cierre no publicará automáticamente las calificaciones.

El administrador decidirá cuándo publicarlas.

Una vez publicada una calificación:

- Será definitiva.
    
- No podrá reabrirse ni modificarse.
    
- Se conservará quién la publicó y cuándo.
    
- Se identificará la versión publicada.
    

## 12.7. Historial y acceso

El administrador podrá consultar todas las versiones.

El tutor podrá consultar el historial de las asignaturas que tenga asignadas.

Las versiones anteriores serán de solo lectura.

El estudiante consultará las calificaciones publicadas que correspondan a su matrícula y permisos.

## 12.8. Reporte final en PDF

El estudiante podrá descargar el reporte final después de la publicación.

El documento incluirá:

- Información institucional.
    
- Logotipo.
    
- Facultad.
    
- Programa.
    
- Período.
    
- Información del curso.
    
- Información del estudiante.
    
- Calificación de la asignatura.
    
- Detalle de actividades.
    
- Detalle de evaluaciones.
    
- Puntuaciones.
    
- Promedio final.
    

No se incluirá código QR ni mecanismo adicional de verificación en esta primera versión.

## 12.9. Escala de calificaciones y nota mínima

La escala institucional de calificaciones es de 0 a 100 *(decisión D-014, confirmada por el equipo el 15/11/2026)*.

La nota mínima de aprobación es de 70 puntos *(decisión D-015, confirmada por el equipo el 15/11/2026)*.

La escala institucional es independiente de la distribución interna de ponderaciones de las actividades y evaluaciones (§12.2). Sigue pendiente confirmar si la nota mínima puede variar por programa o asignatura (§23).

---

# 13. Seguimiento académico y riesgos

## 13.1. Seguimiento

El sistema permitirá registrar:

- Contactos de tutoría.
    
- Compromisos.
    
- Seguimientos.
    
- Observaciones.
    
- Historial de compromisos.
    
- Vencimientos.
    
- Eventos de notificación.
    

Los tutores solo podrán gestionar el seguimiento de estudiantes dentro de sus asignaciones.

Los coordinadores tendrán acceso al seguimiento de sus programas.

El administrador tendrá acceso institucional.

## 13.2. Indicadores de riesgo

El sistema calculará automáticamente el nivel de riesgo del estudiante.

Se contemplan indicadores relacionados con:

- Actividades vencidas.
    
- Calificaciones inferiores al mínimo establecido.
    
- Progreso académico.
    
- Asignaturas no aprobadas.
    
- Fechas límite pendientes.
    

Los indicadores definitivos y sus umbrales dependerán de los criterios institucionales.

## 13.3. Niveles

Los niveles serán:

- Bajo.
    
- Medio.
    
- Alto.
    

El nivel será calculado por el sistema y no podrá editarse manualmente.

## 13.4. Historial de riesgo

Cada evaluación de riesgo conservará:

- Estudiante.
    
- Nivel calculado.
    
- Indicadores utilizados.
    
- Explicación del resultado.
    
- Versión de los criterios aplicados.
    
- Fecha de cálculo.
    

Los resultados anteriores no se sobrescribirán.

No se incluirá un módulo para que el administrador modifique libremente fórmulas o umbrales de riesgo. Los criterios serán definidos por la institución.

---

# 14. Notificaciones

## 14.1. Canales

El sistema contará con:

- Notificaciones internas.
    
- Notificaciones por correo electrónico.
    

Durante el desarrollo local, el correo electrónico será simulado mediante una herramienta de captura de correos. No se enviarán correos reales en esta etapa.

## 14.2. Eventos

Se contemplan notificaciones relacionadas con:

- Nuevas postulaciones.
    
- Documentos pendientes.
    
- Solicitudes de corrección.
    
- Cambios de estado de postulaciones.
    
- Admisiones.
    
- Matrículas.
    
- Vencimientos.
    
- Nuevas actividades.
    
- Entregas pendientes.
    
- Calificaciones.
    
- Publicación de resultados.
    
- Seguimiento académico.
    
- Compromisos.
    
- Eventos relevantes del curso.
    

## 14.3. Configuración institucional

El administrador podrá activar o desactivar los tipos de notificación generados por el sistema.

## 14.4. Preferencias individuales

Cada usuario podrá gestionar sus preferencias personales.

Una preferencia individual no podrá habilitar una notificación que esté desactivada institucionalmente.

Las notificaciones existentes se conservarán aunque el administrador desactive posteriormente su tipo.

## 14.5. Historial de entrega

El sistema conservará:

- Destinatario.
    
- Tipo de notificación.
    
- Evento relacionado.
    
- Canal.
    
- Fecha de generación.
    
- Intentos de entrega.
    
- Resultado.
    
- Errores.
    

No se deberán generar notificaciones duplicadas para el mismo evento, destinatario y tipo.

Las notificaciones deberán respetar los permisos y el alcance de cada rol.

---

# 15. Archivos y almacenamiento

## 15.1. Gestión centralizada

El sistema utilizará una entidad central de archivos para almacenar metadatos y referencias a los archivos físicos.

Los archivos físicos no se almacenarán directamente en PostgreSQL.

## 15.2. Formatos permitidos

- PDF.
    
- DOC.
    
- DOCX.
    
- XLS.
    
- XLSX.
    
- JPG.
    
- JPEG.
    
- PNG.
    
- ZIP.
    

El tamaño máximo será establecido por una política técnica del sistema y no será configurable desde el panel administrativo.

## 15.3. Validación

El sistema deberá validar:

- Extensión.
    
- Tipo MIME.
    
- Firma real del archivo.
    
- Tamaño.
    
- Condiciones de seguridad.
    
- Posible presencia de contenido malicioso.
    

Los archivos sospechosos podrán quedar en cuarentena.

## 15.4. Metadatos

Se conservarán:

- Identificador único.
    
- Clave de almacenamiento.
    
- Nombre original.
    
- Tamaño.
    
- Formato.
    
- Checksum.
    
- Usuario que realizó la carga.
    
- Fecha de carga.
    
- Estado.
    

Estados contemplados:

- Activo.
    
- Archivado.
    
- En cuarentena.
    

## 15.5. Versiones

Los archivos históricos no se sobrescribirán.

Los reemplazos crearán nuevas versiones mediante las relaciones correspondientes al módulo que utiliza el archivo.

## 15.6. Retención y permisos

- No se eliminarán archivos automáticamente.
    
- Las descargas requerirán validación de permisos en el servidor.
    
- Las operaciones importantes de carga, reemplazo, archivo y descarga quedarán registradas cuando corresponda.
    
- Los archivos conservarán sus relaciones históricas.
    

## 15.7. Ubicación física

El almacenamiento podrá comenzar de forma local y migrar posteriormente a un servicio externo u objeto de almacenamiento sin cambiar las reglas funcionales del sistema.

---

# 16. Auditoría

## 16.1. Objetivo

La auditoría permitirá identificar las operaciones importantes realizadas dentro del sistema.

## 16.2. Eventos auditables

Se deberán registrar, según corresponda:

- Cambios de roles.
    
- Asignaciones y reasignaciones.
    
- Activación y desactivación de cuentas.
    
- Cambios de facultades y programas.
    
- Cambios de períodos.
    
- Modificaciones de convocatorias.
    
- Decisiones de admisión.
    
- Asignación de cupos.
    
- Matrículas.
    
- Cambios de responsables.
    
- Reaperturas de actividades.
    
- Extensiones.
    
- Modificaciones de calificaciones.
    
- Invalidaciones de evaluaciones.
    
- Cierres y publicaciones.
    
- Cambios de configuración.
    
- Operaciones importantes sobre archivos.
    

## 16.3. Información registrada

Cuando corresponda, cada evento conservará:

- Usuario responsable.
    
- Acción.
    
- Recurso afectado.
    
- Fecha y hora.
    
- Valores anteriores y nuevos.
    
- Motivo.
    
- Información contextual necesaria.
    

Los registros históricos no podrán modificarse mediante operaciones ordinarias del sistema.

---

# 17. Reportes y exportaciones

## 17.1. Reportes

El sistema permitirá generar reportes según el rol y alcance del usuario.

Se contemplan reportes de:

- Programas.
    
- Convocatorias.
    
- Postulaciones.
    
- Documentos pendientes.
    
- Admisiones.
    
- Listas de espera.
    
- Matrículas.
    
- Cursos.
    
- Estudiantes.
    
- Actividades.
    
- Evaluaciones.
    
- Calificaciones.
    
- Seguimiento académico.
    
- Riesgos.
    
- Tutores y asignaciones.
    

## 17.2. Alcance

- El administrador podrá consultar información institucional.
    
- El coordinador podrá consultar información de sus programas.
    
- El tutor podrá consultar información de sus cursos y asignaturas.
    
- El estudiante solo podrá consultar su propia información autorizada.
    

## 17.3. Exportaciones

Los reportes podrán exportarse a formatos PDF y Excel cuando corresponda.

Las exportaciones deberán respetar los permisos del usuario y conservar la información necesaria para identificar el reporte generado.

---

# 18. Configuración inicial del sistema

Después de la creación de las dos cuentas administrativas protegidas, el sistema deberá ofrecer un asistente de configuración inicial.

Permitirá registrar:

1. Información institucional.
    
2. Facultades.
    
3. Programas.
    
4. Períodos académicos.
    
5. Plantillas de calificación.
    

El sistema deberá validar que la configuración mínima necesaria esté completa antes de habilitar los procesos institucionales que dependan de ella.

---

# 19. Reglas generales de integridad de datos

Las siguientes reglas deberán respetarse en todas las operaciones:

1. Los registros históricos no deberán desaparecer por cambios de estado.
    
2. Las relaciones entre usuarios y recursos deberán validar permisos y asignaciones vigentes.
    
3. Una persona no podrá tener más de una postulación por convocatoria.
    
4. Una matrícula válida no podrá duplicarse para el mismo proceso de admisión.
    
5. La asignación de cupos deberá ser transaccional.
    
6. Una asignatura pertenecerá a un único curso y, opcionalmente, a un módulo de ese curso.
    
7. Una ponderación apuntará a una actividad o a una evaluación, nunca a ambas.
    
8. Los intentos de entrega pertenecerán a una entrega concreta.
    
9. Los intentos de evaluación conservarán las versiones exactas de las preguntas presentadas.
    
10. Las entregas grupales conservarán la composición del grupo al momento de entregar.
    
11. Las calificaciones cerradas conservarán versiones históricas.
    
12. Las calificaciones publicadas serán inmutables.
    
13. Los archivos históricos no se sobrescribirán.
    
14. Las notificaciones deberán evitar duplicados por evento, destinatario y tipo.
    
15. Las evaluaciones de riesgo conservarán los indicadores y criterios utilizados.
    
16. Los cambios de responsables no alterarán la autoría histórica.
    
17. Las operaciones sensibles deberán ejecutarse de forma consistente y auditable.
    
18. Las validaciones importantes deberán realizarse en el servidor y no depender exclusivamente de la interfaz.
    

---

# 20. Requisitos no funcionales

## 20.1. Seguridad

- Autenticación segura.
    
- Contraseñas protegidas mediante Argon2id.
    
- Control de acceso basado en roles y asignaciones.
    
- Validación de permisos en el servidor.
    
- Protección de archivos.
    
- Gestión segura de sesiones.
    
- Validación de entradas.
    
- Protección de operaciones sensibles.
    
- Registro de eventos importantes.
    

## 20.2. Integridad

- Relaciones consistentes.
    
- Restricciones de unicidad.
    
- Operaciones transaccionales cuando sean necesarias.
    
- Conservación de historial.
    
- Prevención de duplicados.
    
- Validaciones de negocio centralizadas.
    

## 20.3. Usabilidad

- Interfaz clara y consistente.
    
- Navegación comprensible.
    
- Formularios con validaciones y mensajes de error.
    
- Indicadores de estado.
    
- Diseño adaptable a diferentes tamaños de pantalla.
    
- Compatibilidad con tema claro y oscuro.
    

## 20.4. Mantenibilidad

- Organización modular.
    
- Separación de responsabilidades.
    
- Reutilización de componentes.
    
- Código comprensible y documentado.
    
- Pruebas para reglas de negocio importantes.
    
- Migraciones controladas de base de datos.
    

## 20.5. Rendimiento

El sistema deberá evitar consultas innecesarias y manejar adecuadamente las operaciones que involucren grandes cantidades de postulaciones, estudiantes, archivos o intentos de evaluación.

Los objetivos cuantitativos de rendimiento deberán definirse durante la planificación técnica y las pruebas.

## 20.6. Compatibilidad

La plataforma será web y deberá funcionar en navegadores modernos de escritorio y dispositivos móviles.

---

# 21. Consideraciones técnicas para la implementación

Esta sección establece restricciones de implementación, pero no sustituye la inspección técnica del repositorio.

## 21.1. Inspección inicial obligatoria

Antes de modificar el proyecto, el equipo de desarrollo deberá inspeccionar:

- Estructura del repositorio.
    
- Frameworks y versiones.
    
- Dependencias instaladas.
    
- Organización del frontend.
    
- Organización del backend.
    
- Base de datos y estado de migraciones.
    
- Autenticación existente.
    
- Componentes visuales existentes.
    
- Variables de entorno.
    
- Pruebas existentes.
    
- Estado de Git.
    

No se deberá asumir que una tecnología propuesta en documentos anteriores ya está implementada o aprobada.

## 21.2. Arquitectura

La arquitectura definitiva se documentará después de inspeccionar el repositorio y evaluar sus necesidades.

La solución deberá permitir separar responsabilidades de interfaz, lógica de negocio, persistencia y almacenamiento de archivos.

## 21.3. Modelo de datos

El modelo de datos deberá respetar las relaciones y restricciones descritas en este documento y en la documentación complementaria del modelo de datos.

No se deberán crear entidades duplicadas para representar la misma responsabilidad.

Las relaciones históricas deberán conservarse.

## 21.4. Desarrollo local

La primera etapa estará orientada a tener una versión funcional en entorno local.

Se utilizarán datos de prueba.

El envío de correos será simulado.

La implementación deberá permitir ejecutar y probar los módulos sin depender inicialmente de servicios externos de producción.

## 21.5. Pruebas

Se deberán contemplar pruebas para:

- Autenticación.
    
- Permisos.
    
- Asignaciones.
    
- Postulaciones.
    
- Admisiones.
    
- Matrículas.
    
- Entregas.
    
- Evaluaciones.
    
- Calificaciones.
    
- Notificaciones.
    
- Archivos.
    
- Auditoría.
    

Las reglas críticas deberán contar con pruebas automatizadas.

---

# 22. Criterios generales de aceptación

El sistema podrá considerarse funcionalmente aceptable cuando:

1. Los usuarios puedan iniciar sesión según sus permisos.
    
2. Los roles y asignaciones delimiten correctamente el acceso.
    
3. El administrador pueda gestionar la estructura institucional.
    
4. Los coordinadores puedan administrar únicamente sus programas.
    
5. Las convocatorias puedan publicarse y consultarse según su estado.
    
6. Los postulantes puedan completar y enviar postulaciones.
    
7. Los documentos puedan revisarse y conservar sus versiones.
    
8. Las admisiones y listas de espera respeten las reglas de cupos y orden.
    
9. Las matrículas relacionen correctamente estudiantes y cursos.
    
10. Los tutores puedan gestionar sus asignaturas y estudiantes asignados.
    
11. Las actividades puedan publicarse, entregarse, revisarse y calificarse.
    
12. Las entregas grupales conserven sus integrantes históricos.
    
13. Las evaluaciones puedan realizarse con control de tiempo e intentos.
    
14. Las preguntas y opciones utilizadas en intentos anteriores permanezcan intactas.
    
15. Las ponderaciones respeten las categorías institucionales.
    
16. Las calificaciones puedan cerrarse y publicarse de forma diferenciada.
    
17. Las calificaciones publicadas sean inmutables.
    
18. El seguimiento académico conserve su historial.
    
19. Las notificaciones respeten preferencias y configuración institucional.
    
20. Los archivos sean validados y protegidos.
    
21. Los reportes respeten el alcance de permisos.
    
22. Las operaciones importantes queden auditadas.
    

---

# 23. Decisiones pendientes de definición institucional

Los siguientes puntos no deben resolverse mediante suposiciones del equipo de desarrollo.

|Tema|Pendiente|
|---|---|
|Nota mínima de aprobación|La nota mínima institucional es de 70 puntos (D-015). Confirmar si puede variar por programa o asignatura.|
|Redistribución de ponderaciones|Definir el detalle matemático de la distribución dinámica dentro de cada categoría.|
|Tamaño máximo de archivos|Establecer el límite técnico institucional.|
|Riesgo académico|Definir umbrales, criterios y frecuencia de cálculo.|
|Retención de información|Establecer políticas legales e institucionales de conservación y eliminación.|
|Rendimiento|Definir objetivos cuantitativos de respuesta y capacidad.|
|Despliegue|Definir infraestructura y proveedor después de validar el sistema local.|
|Integraciones externas|Determinar si se requieren conexiones con plataformas institucionales existentes.|
|Comprobante de matrícula y retiros|No hay decisión definitiva sobre su inclusión; no se consideran funcionalidad aprobada.|
|Ofertas de vacantes|Definir los campos y estados de la oferta y su relación con la asignación de cupos (§7.4).|

Mientras no exista una decisión formal, el sistema deberá evitar asumir valores definitivos para estos puntos.

---

# 24. Documentación complementaria

El Documento Maestro establece los requisitos funcionales y reglas de negocio.

Se complementará con los siguientes documentos:

1. **Modelo de datos:** entidades, atributos, relaciones, cardinalidades y restricciones.
    
2. **Matriz de permisos:** acciones permitidas por rol y alcance.
    
3. **Arquitectura técnica:** tecnologías, componentes, infraestructura y comunicación.
    
4. **API y reglas de negocio:** operaciones, validaciones y contratos de comunicación.
    
5. **Plan de implementación:** orden de desarrollo, dependencias y criterios de aceptación por módulo.
    
6. **Plan de pruebas:** pruebas funcionales, de integración y seguridad.
    

Estos documentos deberán mantenerse coherentes con esta versión del Documento Maestro.

---

# 25. Control de versiones

|Versión|Descripción|
|---|---|
|0.1|Primera definición del alcance y funcionalidades del sistema.|
|0.2|Ampliación de requisitos funcionales y módulos del sistema.|
|0.3|Consolidación de decisiones funcionales, reglas de negocio, permisos, restricciones y coherencia con el modelo de datos.|
|0.3.1|Incorporación de las decisiones confirmadas por el equipo el 15/11/2026 (D-013 a D-019): correo simulado en desarrollo local, escala de 0 a 100, nota mínima de 70 puntos, ocho estados de postulación, formularios de estructura fija, nivelación fuera de alcance y ofertas de vacantes.|

**Estado de la versión 0.3:** documento consolidado para revisión y aprobación antes de iniciar la implementación.

**Estado de la versión 0.3.1:** es la v0.3 con las decisiones confirmadas del 15/11/2026. No cambia el estado de aprobación de las decisiones D-001 a D-012 del Registro de decisiones.

**Regla de control:** cualquier cambio funcional posterior deberá documentarse, justificarse y reflejarse en los documentos complementarios que correspondan. Las herramientas de asistencia de programación no podrán modificar decisiones funcionales por cuenta propia.