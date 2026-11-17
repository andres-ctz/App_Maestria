# Decisiones pendientes

> [!warning] No resolver por suposición
> Mientras no exista una decisión formal, el sistema debe evitar asumir valores definitivos (v0.3 §23). Cada decisión cerrada se pasa a [[Registro de decisiones]]. Que el v0.3 no mencione algo no significa que se excluya.

> [!info] Ya confirmadas (15/11/2026) y retiradas de esta lista
> Correo simulado en el desarrollo local (D-013), escala de 0 a 100 (D-014), nota mínima de 70 puntos (D-015), los ocho estados de postulación (D-016), formularios de estructura fija (D-017), nivelación fuera de la primera versión (D-018) y ofertas de vacantes con plazo (D-019). El detalle está en [[Registro de decisiones]].

Ninguno de los pendientes de abajo bloquea el desarrollo actual: se resuelven cuando se implementa el módulo que indica la última columna.

## A. Pendientes declarados en el v0.3 (§23)
| Tema | Pendiente | Se resuelve en |
|---|---|---|
| Nota mínima de aprobación | El valor de 70 puntos está confirmado (D-015). Falta saber si puede variar por programa o asignatura | Módulo 12, Calificaciones |
| Redistribución de ponderaciones | Detalle matemático de la distribución dinámica dentro de cada categoría | Módulo 12, Calificaciones |
| Tamaño máximo de archivos | Límite técnico institucional | Módulo 15, Archivos |
| Riesgo académico | Umbrales, criterios y frecuencia de cálculo | Módulo 13, Seguimiento y riesgos |
| Retención de información | Políticas legales e institucionales de conservación y eliminación | Antes del despliegue |
| Rendimiento | Objetivos cuantitativos de respuesta y capacidad | Antes del despliegue |
| Despliegue | Infraestructura y proveedor, tras validar el sistema local | Después de validar el sistema local |
| Integraciones externas | Si se requieren conexiones con plataformas existentes | Con el cliente |

## B. Discrepancias entre v0.2 y v0.3 por confirmar
Detectadas al comparar ambos documentos. «No lo menciona» significa que el v0.3 no dice nada, no que lo descarte.

| Tema | v0.2 | v0.3 | Acción | Se resuelve en |
|---|---|---|---|---|
| Retiro de la postulación | §5.5: el postulante puede retirarla mientras está en Recibida | §6.4: en borrador puede cancelarla; ya enviada no puede retirarla | D-016 excluye el estado «Retirada», pero no decide si existe el retiro ni cómo se registra | Módulo 5, Postulaciones |
| Comprobante y retiros de matrícula | §7: comprobante PDF con código único; retiros y reincorporaciones | §8: no menciona comprobante ni retiros | Sin decisión definitiva; no se consideran funcionalidad aprobada | Módulo 7, Matrículas |
| Plantillas y duplicación | §4.3 y §8.1–8.2: duplicar convocatorias y cursos; plantillas de curso | No lo menciona (sí plantillas de calificación) | ¿Se mantiene? | Módulos 4 y 8 |
| Suspensión y cancelación | §4.2: suspensión total o parcial, con motivo y estado anterior | §5.2: lista los estados sin detallar reglas | Confirmar reglas | Módulo 4, Convocatorias |
| Recuperaciones y cierre de curso | §8.5 y §13 | No los menciona (sí reapertura y cierre de calificaciones) | ¿Se mantienen? | Módulos 10 a 12 |
| Catálogos configurables | §14.3: catálogos de tipos de documento, modalidades, etc. | No lo menciona (sí catálogo de facultades) | ¿Se mantiene? | Módulos 2 y 3 |
| Prioridad y lectura de notificaciones | §10.3: prioridades y marcado automático como leída | No lo menciona | ¿Se mantiene? | Módulo 14, Notificaciones |

## C. Vacíos detectados en el v0.3
- **Asignación de tutores:** §2.3 da al coordinador la «asignación y seguimiento de tutores» y §2.5 deja las reasignaciones al administrador. Falta delimitar quién asigna y quién reasigna. *(Módulo 9)*
- **Programas:** §4.2 no dice quién los crea ni quién los activa o desactiva. *(Módulo 3)*
- **Cierre de convocatoria (§6.6):** el período adicional de revisión es «configurable», sin valor por defecto. *(Módulo 4)*
- **Recordatorios:** §14 no define anticipación ni frecuencia. *(Módulo 14)*
- **Horario de envío de recordatorios:** sin definir. La zona horaria ya está definida (D-009). *(Módulo 14)*
- **Nivel de riesgo para el estudiante:** el v0.3 no dice si lo ve. *(Módulo 13)*
- **Cierre y publicación de calificaciones:** §12 solo menciona al administrador; falta definir el papel del coordinador. *(Módulo 12)*
- **Oferta de vacante:** D-019 conserva el mecanismo, pero faltan sus campos, sus estados y su relación con la asignación de cupos. Antecedente v0.2 §6.2: estados Pendiente, Aceptada, Rechazada y Vencida, y aceptar la oferta no ocupaba el cupo hasta aprobar la matrícula. *(Módulo 6)*
- **Cupos de la convocatoria:** §5.1 los define por convocatoria, pero no dice si se guardan los cupos ocupados y disponibles o se calculan a partir de las asignaciones (§7.2). *(Módulo 6)*

## D. Detectadas durante la Fase 1 (frontend)
Surgieron al construir la navegación y las pantallas. No se resolvieron: el frontend las dejó pendientes o marcadas como ejemplo.

| Tema | Qué se encontró | Qué hizo el frontend | Acción | Se resuelve en |
|---|---|---|---|---|
| Calificaciones del coordinador | La matriz de permisos dice «Por definir» para plantillas, planes, cierre y publicación | La ruta `/calificaciones` solo se habilita al administrador | Definir su papel | Módulo 12 |
| Grupos | La matriz dice «Por definir» para administrador y coordinador | `/tutor/grupos` solo para el tutor | Definir | Módulo 9 |
| Reasignaciones | Quién reasigna programas, cursos y asignaturas: «Por definir» para el coordinador | No hay pantalla | Definir | Módulo 9 |
| Indicadores del panel ejecutivo | El v0.3 no los define | El panel muestra datos de demostración | Definir indicadores y fórmulas | Módulo 13 |
| Recordatorios | No hay anticipación definida | Se quitó del código la secuencia 15·10·5·3·1 | Definir | Módulo 14 |
| Reglas de riesgo, tamaño y tipos de archivo | Siguen pendientes (§23) | Se muestran marcados como «Ejemplo · pendiente de definición institucional» | Definir | Módulos 13 y 15 |
| Estados de la convocatoria | Los datos de ejemplo usan 3; el v0.3 define 8 | Sin cambios | Alinear al construir convocatorias | Módulo 4 |
| Nivel de riesgo visible para el estudiante | El v0.3 no lo dice | «Mi curso» no lo muestra | Decidir | Módulo 13 |
| Alcance del coordinador por programa | La demostración no filtra por programas asignados | El coordinador ve todos los estudiantes | Definir el modelo de asignación | Módulos 1 y 9 |
| Centro de notificaciones | Pertenece a una fase posterior | El botón de notificaciones indica «Próximamente» y no muestra avisos | Conectarlo con los tipos y preferencias del v0.3 | Módulo 14 |
