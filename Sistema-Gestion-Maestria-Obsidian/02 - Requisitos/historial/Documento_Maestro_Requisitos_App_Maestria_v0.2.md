---
title: Documento Maestro de Requisitos - App Maestría
project: App Maestría
version: "0.2"
status: En definición
type: requisitos
created: 2026-11-12
tags:
  - app-maestria
  - requisitos
  - documento-maestro
---

# Documento Maestro de Requisitos — App Maestría

> [!info] Propósito
> Este documento consolida las decisiones funcionales aprobadas para el sistema de gestión de cursos preparatorios para programas de maestría. Es la referencia principal del alcance funcional. Los puntos aún no validados se identifican explícitamente como pendientes y no deben implementarse como reglas definitivas.

## 1. Información general

**Nombre del proyecto:** Sistema de gestión de cursos preparatorios para programas de maestría (App Maestría).

**Objetivo:** construir una plataforma web que centralice la gestión de programas, convocatorias, postulaciones, admisiones, matrículas, cursos preparatorios, actividades, calificaciones, seguimiento académico, notificaciones, auditoría y reportes.

**Enfoque de trabajo:** primero consolidar y validar requisitos; después completar el modelo de datos, permisos y arquitectura; finalmente implementar y probar los módulos.

### 1.1 Principios de diseño

- La información debe persistir en la base de datos; una interfaz visual por sí sola no constituye un módulo terminado.
- Los permisos deben validarse en el backend, además de ocultar opciones en la interfaz.
- Las operaciones sensibles deben dejar trazabilidad.
- Los cambios en plantillas no deben modificar instancias históricas ya creadas.
- Las decisiones de admisión y matrícula son humanas; no se automatiza la selección de postulantes.
- Los procesos deben conservar sus historiales y evidencias.
- Las reglas institucionales que aún no han sido confirmadas deben permanecer configurables o pendientes, no asumirse.

## 2. Roles y permisos

La plataforma contempla cuatro roles principales:

### 2.1 Administrador

- Gestiona usuarios, cuentas y asignación de roles.
- Crea, edita, activa y desactiva programas.
- Asigna coordinadores a programas.
- Gestiona convocatorias y configuración global.
- Administra plantillas, formularios, catálogos y períodos académicos.
- Consulta reportes y auditoría de toda la plataforma.
- Puede participar en decisiones de admisión y matrícula.
- Gestiona la configuración global de tipos de notificaciones.

### 2.2 Coordinador

- Gestiona exclusivamente los programas que tiene asignados.
- Administra convocatorias, postulaciones, admisiones, correcciones y nivelaciones.
- Gestiona vacantes, listas de espera y matrículas.
- Gestiona cursos, asignaturas, actividades y configuraciones académicas de sus programas.
- Consulta reportes y auditoría dentro del alcance de sus programas.
- Puede tomar decisiones de admisión junto con el administrador.
- No puede activar ni desactivar programas.
- Los coordinadores principales y adicionales tienen los mismos permisos; la distinción de principal es informativa.

### 2.3 Tutor

> [!important] Decisión aprobada
> **Tutor y docente son el mismo rol.** No debe crearse un rol separado de docente.

- Consulta los cursos, asignaturas y estudiantes que tiene asignados.
- Revisa entregas y evidencias.
- Comenta actividades y solicita correcciones.
- Registra calificaciones según los permisos y períodos habilitados.
- Consulta el progreso y los indicadores académicos de sus estudiantes asignados.
- No puede acceder a estudiantes o programas que no estén dentro de sus asignaciones.

### 2.4 Postulante / Estudiante

Una misma persona puede participar inicialmente como postulante y posteriormente como estudiante, conservando la continuidad de su cuenta y expediente.

**Como postulante:**
- Consulta convocatorias disponibles.
- Completa formularios y adjunta documentos.
- Consulta el estado de su postulación.
- Atiende observaciones y solicitudes de corrección.
- Entrega evidencias de nivelación cuando corresponda.
- Responde ofertas de vacantes.

**Como estudiante:**
- Consulta su matrícula y comprobante.
- Consulta cursos y asignaturas.
- Revisa actividades, evaluaciones y fechas.
- Entrega tareas y evidencias.
- Consulta calificaciones y progreso.
- Recibe notificaciones.

## 3. Programas académicos

Cada programa contempla, como mínimo:

- Nombre.
- Facultad.
- Modalidad.
- Descripción.
- Información académica.
- Requisitos.
- Coordinadores asignados.
- Estado.

Reglas:

- Solo el administrador puede crear programas y activar o desactivar su estado.
- Los requisitos pertenecen al programa.
- Al crear una convocatoria se conserva una copia de los requisitos vigentes en ese momento.
- Los cambios posteriores en los requisitos del programa no alteran convocatorias existentes.
- Desactivar un programa no elimina su información histórica.

## 4. Convocatorias

Cada convocatoria está vinculada a un programa y a un período académico.

Datos principales:

- Nombre.
- Programa.
- Período académico.
- Número de vacantes.
- Fechas de inscripción.
- Fechas del curso.
- Requisitos aplicables.
- Formulario de postulación.
- Estado.

### 4.1 Estados

Estados normales:

- Borrador.
- Programada.
- Abierta.
- En preparación.
- En curso.
- Cerrada.

Estados extraordinarios:

- Suspendida.
- Cancelada.

### 4.2 Suspensión y cancelación

- La suspensión puede ser total (inscripciones y actividades) o parcial (solo inscripciones).
- Debe registrarse motivo, responsable, fecha y estado anterior.
- Las fechas no se desplazan automáticamente por suspender una convocatoria.
- Una convocatoria cancelada no puede reanudarse. Si el proceso vuelve a realizarse, se crea una nueva convocatoria.

### 4.3 Duplicación

- Administrador y coordinador autorizado pueden duplicar convocatorias.
- Se copia la estructura, configuración, requisitos, formulario y vacantes como valor inicial.
- Antes de guardar, se deben revisar nombre, período, fechas y vacantes.
- La nueva convocatoria inicia en estado Borrador.
- No se copian postulantes, matrículas, calificaciones, evidencias ni historiales.

## 5. Formularios y postulaciones

Los formularios pueden incluir datos personales y académicos, documentos, requisitos y preguntas personalizadas.

### 5.1 Configuración de formularios

- El administrador crea plantillas de formularios.
- El coordinador utiliza o adapta las plantillas para sus convocatorias.
- Los campos pueden ser obligatorios u opcionales.
- Un campo opcional puede quedar vacío sin bloquear el envío.
- Cada convocatoria conserva la versión del formulario utilizada; las modificaciones posteriores no cambian postulaciones anteriores.

Tipos de campo aprobados:

- Texto.
- Número.
- Fecha.
- Sí / No.
- Selección única.
- Selección múltiple.
- Archivo.

### 5.2 Flujo de postulación

1. El postulante completa el formulario.
2. Adjunta los documentos requeridos.
3. Envía la postulación.
4. El sistema registra la postulación como Recibida.
5. El administrador o coordinador revisa la información.
6. Puede solicitar correcciones o una nivelación.
7. La decisión final la toma una persona autorizada.
8. Si se aprueba, continúa el proceso de matrícula.

### 5.3 Estados de postulación

- Recibida.
- En revisión.
- Con observaciones.
- En nivelación.
- Aprobada.
- Rechazada.
- Retirada.

No habrá examen de admisión ni selección automática por puntaje.

### 5.4 Decisiones y conflictos

- Administrador y coordinador asignado tienen potestad para tomar decisiones de admisión.
- Las decisiones deben conservar responsable, fecha, motivo y resultado.
- Si existen decisiones contradictorias, el sistema debe detectarlas y exigir resolución; no debe sobrescribir una decisión silenciosamente.

### 5.5 Correcciones

Cada solicitud de corrección registra:

- Motivo.
- Responsable.
- Fecha de solicitud.
- Fecha límite.
- Historial de cambios y entregas.

El vencimiento de una corrección no rechaza automáticamente la postulación. El responsable decide si amplía el plazo, cancela el proceso o rechaza la postulación.

El postulante solo puede retirar su postulación mientras está en estado Recibida. Después, la finalización debe gestionarla el administrador o coordinador.

### 5.6 Nivelaciones

Se utilizan cuando un requisito subsanable no se cumple inicialmente; por ejemplo, conocimientos de Python.

Se registra:

- Requisito que debe nivelarse.
- Motivo.
- Responsable.
- Plazo.
- Evidencia presentada.
- Resultado de la revisión.

La decisión final continúa siendo humana.

## 6. Vacantes y lista de espera

Cada convocatoria controla:

- Vacantes totales.
- Vacantes ocupadas.
- Vacantes disponibles.

Una vacante se considera ocupada únicamente cuando la matrícula ha sido formalmente aprobada.

### 6.1 Reglas de lista de espera

- Solo ingresan postulantes que tengan verificados y aprobados todos los requisitos obligatorios.
- No pueden ingresar quienes tengan requisitos obligatorios pendientes o incumplidos.
- Los requisitos opcionales no bloquean el ingreso.
- El orden es estrictamente por llegada, no por calificaciones ni por criterio subjetivo.

> [!important] Regla de orden
> La posición se determina por la fecha y hora en que se completaron y validaron todos los requisitos obligatorios. Quien todavía tenga documentos pendientes no ocupa posición. Cuando completa y valida los requisitos, ingresa con la fecha y hora de esa habilitación.

### 6.2 Ofertas de vacantes

El coordinador realiza las ofertas. Cada oferta registra:

- Postulante.
- Responsable que realiza la oferta.
- Fecha y hora.
- Plazo para responder.
- Estado y respuesta.

Estados:

- Pendiente.
- Aceptada.
- Rechazada.
- Vencida.

Aceptar una oferta no ocupa la vacante. La vacante se ocupa únicamente al aprobar formalmente la matrícula. Los plazos serán configurables; los valores predeterminados están pendientes de validación institucional.

## 7. Matrículas

Al aprobar una postulación se genera un expediente de matrícula que hereda sus datos y documentos.

- Administrador y coordinador pueden editar el expediente.
- El postulante no modifica directamente el expediente de matrícula.
- La postulación original se conserva separada y con su historial.
- Se puede solicitar documentación adicional, indicando documento, motivo, responsable y fecha límite.
- El postulante puede adjuntar los documentos solicitados.

### 7.1 Aprobación de matrícula

Al aprobar una matrícula, el sistema debe:

1. Inscribir al estudiante en el curso correspondiente.
2. Actualizar el control de vacantes.
3. Registrar fecha, hora y responsable.
4. Generar la notificación correspondiente.
5. Generar un comprobante PDF.

El comprobante incluye:

- Datos del estudiante.
- Programa.
- Convocatoria.
- Curso.
- Fecha y hora.
- Código único.
- Estado de matrícula.

### 7.2 Cambios, retiros y reincorporaciones

- Los cambios posteriores a la aprobación requieren motivo y auditoría.
- Los comprobantes deben versionarse; las versiones anteriores se conservan.
- El retiro lo gestiona administrador o coordinador con motivo.
- El retiro no libera automáticamente una vacante sin verificación.
- Una reincorporación crea una nueva inscripción a otro curso; no reabre la matrícula anterior.
- El reconocimiento de trabajos anteriores es manual y justificado.

## 8. Gestión académica

Estructura general:

**Curso preparatorio → Módulos (opcionales) → Asignaturas → Actividades.**

Una asignatura puede pertenecer directamente al curso sin estar dentro de un módulo.

### 8.1 Plantillas de curso

Pueden incluir:

- Módulos.
- Asignaturas.
- Actividades.
- Ponderaciones.
- Configuraciones académicas.
- Nota mínima.

Permisos:

- Administrador: gestiona cualquier plantilla.
- Coordinador: gestiona plantillas dentro de sus programas asignados.
- Tutor y estudiante: no gestionan plantillas.

Al utilizar una plantilla se copia su estructura. Los cambios posteriores en el curso no modifican la plantilla original.

### 8.2 Duplicación de cursos

Se copia la estructura y configuración, pero no:

- Estudiantes.
- Matrículas.
- Calificaciones.
- Entregas.
- Evidencias.
- Comentarios.

Se deben revisar fechas y asignaciones de tutores antes de utilizar el curso duplicado.

### 8.3 Actividades

Tipos:

- Tareas: talleres, proyectos, exposiciones y trabajos.
- Evaluaciones: lecciones, exámenes y evaluaciones.

Datos principales:

- Título.
- Descripción.
- Fecha de publicación.
- Fecha límite.
- Instrucciones.
- Archivos o enlaces.
- Puntuación máxima.

### 8.4 Calificaciones

- Escala de 0 a 100.
- Las ponderaciones de las actividades de una asignatura deben sumar exactamente 100%.
- Nota mínima predeterminada: 70/100.
- La nota mínima puede configurarse por administrador o coordinador conforme a las reglas del programa.
- El sistema no debe cerrar una configuración con ponderaciones distintas de 100%.

### 8.5 Recuperaciones

Administrador o coordinador configura:

- Si se habilitan recuperaciones.
- Número permitido.
- Actividades aplicables.
- Plazos.
- Condiciones.

El sistema no asigna recuperaciones automáticamente.

### 8.6 Cierre de calificaciones

- Administrador o coordinador establece el cierre.
- Después del cierre, el tutor no puede modificar calificaciones.
- Una reapertura excepcional requiere autorización, motivo y auditoría.

### 8.7 Comentarios y correcciones

Los comentarios están asociados a actividades y permiten:

- Comentarios del tutor.
- Respuestas del estudiante.
- Solicitudes de corrección.
- Nuevas versiones de entregas.
- Archivos adjuntos.
- Historial de cambios.

No se implementará mensajería general ni chat interno.

## 9. Seguimiento académico y riesgo

El sistema muestra:

- Actividades completadas, pendientes y vencidas.
- Calificaciones.
- Asignaturas aprobadas y no aprobadas.
- Porcentaje de progreso.
- Recuperaciones.
- Nivel e historial de riesgo.

### 9.1 Indicadores aprobados

1. **Actividades vencidas:** tareas no entregadas a tiempo.
2. **Calificaciones inferiores a la nota mínima.**
3. **Progreso académico:** porcentaje de actividades completadas.
4. **Asignaturas no aprobadas.**
5. **Plazos pendientes:** acumulación de entregas pendientes o próximas a vencer.

### 9.2 Niveles de riesgo

- Alto.
- Medio.
- Bajo.

Reglas aprobadas:

- El riesgo se calcula automáticamente.
- Ningún usuario puede modificar manualmente el nivel.
- El sistema conserva el historial de evolución.
- El historial registra nivel, fecha y hora del cambio, indicadores causantes, valores de indicadores y nivel anterior.
- El historial no es editable.
- Administrador, coordinador autorizado y tutor asignado pueden consultar el historial.
- El estudiante consulta su situación académica actual; no ve necesariamente la clasificación interna de riesgo, salvo decisión institucional.
- El sistema puede generar alertas cuando aumenta el riesgo y notificar al tutor y coordinador correspondientes.

> [!warning] Pendiente institucional
> Los umbrales de riesgo, la fórmula o ponderación de los indicadores y la frecuencia de recálculo aún deben definirse y validarse con la universidad. No deben inventarse ni fijarse como definitivos durante la implementación.

## 10. Notificaciones

Se utilizará el apartado de notificaciones que ya existe en el frontend. No se creará un segundo centro de notificaciones.

En la primera etapa no se enviarán correos electrónicos; las notificaciones se gestionarán dentro de la plataforma.

### 10.1 Tipos de notificaciones

- Nuevas postulaciones.
- Documentos pendientes.
- Solicitudes de corrección.
- Vencimientos.
- Nuevas actividades y evaluaciones.
- Cambios de fechas.
- Calificaciones.
- Matrículas.
- Alertas de seguimiento académico.

### 10.2 Configuración y preferencias

- El administrador activa o desactiva globalmente cada tipo.
- Cada usuario puede personalizar cuáles recibe dentro de los tipos habilitados.
- El usuario no puede activar un tipo que el administrador deshabilitó globalmente.

### 10.3 Lectura, prioridad e historial

- Al abrir una notificación, pasa automáticamente a leída.
- No existe botón manual para marcar como leída.
- Las no abiertas permanecen como no leídas.
- El contador se actualiza según el estado.
- Se conserva un historial de notificaciones.
- Prioridades: Informativa, Importante y Urgente.
- El sistema asigna la prioridad según el evento y su contexto.

Se contemplan recordatorios antes de vencimientos y alertas cuando un plazo vence. La anticipación y frecuencia exactas están pendientes.

El administrador puede consultar el historial (tipo, destinatario, fecha y hora, prioridad, estado leído/no leído y evento de origen). La consulta no permite modificar ni eliminar registros.

## 11. Auditoría

Se registran operaciones importantes, entre ellas:

- Creación y edición de programas.
- Cambios en convocatorias.
- Decisiones de admisión.
- Cambios de matrícula.
- Calificaciones.
- Recuperaciones.
- Cierres y reaperturas.
- Asignaciones.
- Cambios de configuración.

Cada registro incluye:

- Usuario que realizó la acción.
- Acción.
- Fecha y hora.
- Entidad afectada.
- Valores anteriores y nuevos cuando corresponda.
- Motivo cuando sea necesario.

Los registros no pueden editarse ni eliminarse desde la interfaz.

Alcance:

- Administrador: auditoría global.
- Coordinador: auditoría de sus programas asignados.

## 12. Reportes

Se contemplan exportaciones a PDF y Excel para:

- Matrículas por programa y convocatoria.
- Progreso académico.
- Calificaciones.
- Actividades pendientes y vencidas.
- Requisitos pendientes.
- Recuperaciones.
- Historial académico.
- Evolución del riesgo.

Permisos:

- Administrador: información global.
- Coordinador: programas asignados.
- Tutor: asignaturas y estudiantes autorizados.

Los indicadores definitivos de los paneles y los formatos institucionales de reportes están pendientes de validación.

## 13. Cierre de cursos

Administrador o coordinador puede cerrar formalmente un curso.

El cierre:

- Consolida resultados.
- Conserva calificaciones, actividades, evidencias, comentarios, historial académico e historial de riesgo.
- Bloquea cambios normales.

Una reapertura excepcional requiere autorización y motivo, y debe quedar auditada.

La plataforma no genera certificados; esa gestión corresponde a la universidad.

## 14. Configuración general

### 14.1 Datos institucionales

El administrador gestiona:

- Nombre institucional.
- Logotipo.
- Dirección.
- Teléfonos.
- Correo.
- Información adicional.

Estos datos se utilizan en comprobantes y reportes. Los documentos históricos ya emitidos no se alteran cuando cambian los datos institucionales.

### 14.2 Períodos académicos

El administrador puede crear, editar, activar y cerrar períodos (por ejemplo, 2027-A y 2027-B).

Convocatorias y cursos se vinculan a períodos. Cerrar un período no elimina su información histórica.

### 14.3 Catálogos

El administrador puede crear, editar, activar y desactivar catálogos, por ejemplo:

- Tipos de documentos.
- Modalidades.
- Categorías de requisitos.
- Otros valores institucionales.

Los campos pueden ser obligatorios u opcionales. Un campo opcional vacío no bloquea el proceso. La obligatoriedad configurada en un catálogo no sustituye la obligatoriedad específica de un requisito de programa o convocatoria.

### 14.4 Campos personalizados y plantillas

- Se pueden configurar campos personalizados para formularios usando los tipos de campo aprobados.
- Las respuestas quedan vinculadas a la postulación y se conservan históricamente.
- El administrador gestiona plantillas globales.
- El coordinador gestiona plantillas dentro de sus programas asignados.
- Los cambios en plantillas no alteran formularios o cursos que ya fueron creados a partir de ellas.

### 14.5 Gestión de usuarios

El administrador puede:

- Crear cuentas.
- Editar datos.
- Asignar roles.
- Activar y desactivar cuentas.
- Consultar estados.
- Gestionar asignaciones de coordinadores y asignaciones académicas autorizadas.

Desactivar una cuenta impide el inicio de sesión, pero conserva su historial.

Cada usuario recupera su contraseña mediante la opción «Olvidé mi contraseña». El administrador no puede consultar ni establecer la contraseña de otro usuario.

### 14.6 Configuración técnica fuera del panel

Estas configuraciones serán responsabilidad del equipo de desarrollo y no se expondrán como opciones del administrador:

- Políticas de seguridad.
- Requisitos mínimos de contraseña.
- Expiración de sesión.
- Zona horaria.
- Formato de fecha.
- Respaldos y restauración.

## 15. Funcionalidades fuera del alcance

No forman parte de la primera versión:

- Examen de admisión automatizado.
- Selección automática por puntaje.
- Mensajería general o chat.
- Control de asistencia.
- Generación de certificados.
- Configuración técnica de seguridad desde el panel.
- Configuración de zona horaria y formato de fechas desde el panel.
- Respaldo o restauración manual desde el panel.
- Notificaciones por correo electrónico.
- Modificación manual del nivel de riesgo.

## 16. Decisiones pendientes de validación

Los siguientes puntos no deben considerarse reglas cerradas:

1. Umbrales para riesgo alto, medio y bajo.
2. Fórmula y ponderación de los cinco indicadores de riesgo.
3. Frecuencia de recálculo del riesgo.
4. Anticipación y frecuencia de recordatorios.
5. Tipos de archivo permitidos y tamaños máximos.
6. Política de conservación de documentos.
7. Indicadores definitivos de los dashboards.
8. Formatos institucionales de reportes.
9. Reglas para cambiar fechas de una convocatoria abierta.
10. Capacidad y reglas de asignación de tutores.
11. Plazos predeterminados para matrículas y ofertas de vacantes.
12. Reglas institucionales definitivas para aceptación y aprobación.

Cada decisión debe documentarse con responsable, fecha, justificación y estado de validación.

## 17. Criterios generales de aceptación

Un módulo no se considera terminado únicamente porque su interfaz esté construida.

Debe cumplir, según corresponda:

- Datos persistidos correctamente.
- Reglas de negocio implementadas.
- Permisos verificados en backend.
- Validaciones de estados y transiciones.
- Auditoría de operaciones relevantes.
- Manejo de errores y situaciones límite.
- Protección de documentos y archivos.
- Pruebas funcionales.
- Pruebas de integración con módulos relacionados.
- Evidencia de que los criterios de aceptación se cumplen.

## 18. Orden recomendado de implementación

1. **Fundamentos:** autenticación, usuarios, roles, permisos backend, base de datos y auditoría inicial.
2. **Configuración institucional:** datos institucionales, períodos, catálogos y plantillas.
3. **Programas y convocatorias.**
4. **Postulaciones y admisión.**
5. **Vacantes y matrículas.**
6. **Gestión académica:** cursos, módulos, asignaturas, actividades, entregas y calificaciones.
7. **Seguimiento académico y riesgo.**
8. **Notificaciones, auditoría completa y reportes.**
9. **Pruebas integrales, correcciones y despliegue.**

El orden es una propuesta de dependencias; puede ajustarse después de validar el modelo de datos y la planificación del equipo.

## 19. Documentos relacionados

- [[Mapa de módulos y dependencias]]
- [[Modelo de datos]]
- [[Matriz de permisos]]
- [[Decisiones pendientes]]
- [[Registro de decisiones]]
- [[Plan de pruebas]]

> [!note] Estado de los enlaces
> Los enlaces anteriores son referencias previstas. Si esas notas aún no existen en el Vault, Obsidian permitirá crearlas cuando se necesiten.

---

**Control de versión**

| Versión | Fecha | Descripción |
|---|---|---|
| 0.2 | 2026-11-12 | Consolidación de decisiones funcionales aprobadas, alcance, exclusiones y pendientes de validación. |
