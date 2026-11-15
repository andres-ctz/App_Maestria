# Decisiones pendientes

> [!warning] No resolver por suposición
> Mientras no exista una decisión formal, el sistema debe evitar asumir valores definitivos (v0.3 §23). Cada decisión cerrada se pasa a [[Registro de decisiones]].

## A. Pendientes declarados en el v0.3 (§23)
| Tema | Pendiente | Estado |
|---|---|---|
| Escala de calificaciones | Confirmar la escala institucional definitiva | Pendiente |
| Nota mínima de aprobación | Confirmar el valor y si varía por programa o asignatura | Pendiente |
| Redistribución de ponderaciones | Detalle matemático de la distribución dinámica dentro de cada categoría | Pendiente |
| Tamaño máximo de archivos | Límite técnico institucional | Pendiente |
| Riesgo académico | Umbrales, criterios y frecuencia de cálculo | Pendiente |
| Retención de información | Políticas legales e institucionales de conservación y eliminación | Pendiente |
| Rendimiento | Objetivos cuantitativos de respuesta y capacidad | Pendiente |
| Despliegue | Infraestructura y proveedor, tras validar el sistema local | Pendiente |
| Integraciones externas | Si se requieren conexiones con plataformas existentes | Pendiente |

## B. Discrepancias entre v0.2 y v0.3 por confirmar
Detectadas al comparar ambos documentos. "No lo menciona" significa que el v0.3 no dice nada, no que lo descarte.

| Tema | v0.2 | v0.3 | Acción |
|---|---|---|---|
| Correo electrónico | §10 y §15: sin correos en la primera etapa; notificaciones solo dentro de la plataforma | §14.1: notificaciones internas y por correo, este último simulado en local | Confirmar cuál rige |
| Escala y nota mínima | §8.4: escala 0–100 y nota mínima predeterminada de 70 | §23: ambas quedan pendientes | Confirmar; no asumir ninguna |
| Estados de postulación | §5.3: Recibida, En revisión, Con observaciones, En nivelación, Aprobada, Rechazada, Retirada | §6.3: Borrador, Recibida, En revisión, Pendiente de corrección, Validada, Admitida, No admitida, En lista de espera | Fijar la lista oficial |
| Retiro de la postulación | §5.5: el postulante puede retirarla mientras está en Recibida | §6.4: en borrador puede cancelarla; ya enviada no puede retirarla | Confirmar |
| Nivelaciones | §5.6: proceso de nivelación con evidencia y resultado | No lo menciona | ¿Se mantiene? |
| Formularios configurables | §5.1 y §14.4: plantillas de formulario y campos personalizados | No lo menciona (sí documentos y requisitos por convocatoria) | ¿Se mantiene? |
| Vacantes y ofertas | §6: control de vacantes y ofertas con plazo y estados (Pendiente, Aceptada, Rechazada, Vencida) | §7: asignación transaccional de cupos y lista de espera; sin ofertas con plazo | Confirmar |
| Comprobante y retiros de matrícula | §7: comprobante PDF con código único; retiros y reincorporaciones | §8: no menciona comprobante ni retiros | Confirmar |
| Plantillas y duplicación | §4.3 y §8.1–8.2: duplicar convocatorias y cursos; plantillas de curso | No lo menciona (sí plantillas de calificación) | ¿Se mantiene? |
| Suspensión y cancelación | §4.2: suspensión total o parcial, con motivo y estado anterior | §5.2: lista los estados sin detallar reglas | Confirmar reglas |
| Recuperaciones y cierre de curso | §8.5 y §13 | No los menciona (sí reapertura y cierre de calificaciones) | ¿Se mantienen? |
| Catálogos configurables | §14.3: catálogos de tipos de documento, modalidades, etc. | No lo menciona (sí catálogo de facultades) | ¿Se mantiene? |
| Prioridad y lectura de notificaciones | §10.3: prioridades y marcado automático como leída | No lo menciona | ¿Se mantiene? |
| Configuración técnica | §14.6: seguridad, sesión, zona horaria y formato fuera del panel | §2.8 y §3.4: contraseña de 8 caracteres, Argon2id, sesión de 30 min, fechas DD/MM/AAAA | Compatible; falta definir la zona horaria |

## C. Vacíos detectados en el v0.3
- **Asignación de tutores:** §2.3 da al coordinador la "asignación y seguimiento de tutores" y §2.5 deja las reasignaciones al administrador. Falta delimitar quién asigna y quién reasigna.
- **Programas:** §4.2 no dice quién los crea ni quién los activa o desactiva.
- **Cierre de convocatoria (§6.6):** el período adicional de revisión es "configurable", sin valor por defecto.
- **Recordatorios:** §14 no define anticipación ni frecuencia.
- **Nivel de riesgo para el estudiante:** el v0.3 no dice si lo ve.
- **Horario de envío de recordatorios:** sin definir. La zona horaria quedó definida el 14/11/2026 (America/Guayaquil, GMT-5, hora de Quito); ver [[Registro de decisiones]].
- **Cierre y publicación de calificaciones:** §12 solo menciona al administrador; falta definir el papel del coordinador.

## D. Detectadas durante la Fase 1 (frontend)
Surgieron al construir la navegación y las pantallas. No se resolvieron: el frontend las dejó pendientes o marcadas como ejemplo.

| Tema | Qué se encontró | Qué hizo el frontend | Acción |
|---|---|---|---|
| Calificaciones del coordinador | La matriz de permisos dice «Por definir» para plantillas, planes, cierre y publicación | La ruta `/calificaciones` solo se habilita al administrador | Definir su papel |
| Grupos | La matriz dice «Por definir» para administrador y coordinador | `/tutor/grupos` solo para el tutor | Definir |
| Reasignaciones | Quién reasigna programas, cursos y asignaturas: «Por definir» para el coordinador | No hay pantalla | Definir |
| Indicadores del panel ejecutivo | El v0.3 no los define | El panel muestra datos de demostración | Definir indicadores y fórmulas |
| Recordatorios | No hay anticipación definida | Se quitó del código la secuencia 15·10·5·3·1 | Definir |
| Reglas de riesgo, tamaño y tipos de archivo | Siguen pendientes (§23) | Se muestran marcados como «Ejemplo · pendiente de definición institucional» | Definir |
| Cupos | El tipo del boceto guarda `vacantes` en el programa; el v0.3 asigna cupos por convocatoria | Se dejó sin cambios | Revisar al modelar convocatorias |
| Estados de la convocatoria | Los datos de ejemplo usan 3; el v0.3 define 8 | Sin cambios | Alinear al construir convocatorias |
| Nivel de riesgo visible para el estudiante | El v0.3 no lo dice | «Mi curso» no lo muestra | Decidir |
| Alcance del coordinador por programa | La demostración no filtra por programas asignados | El coordinador ve todos los estudiantes | Definir el modelo de asignación |
